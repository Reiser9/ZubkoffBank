import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './index.css';

import useRequest from '../../hooks/useRequest';
import useTransfer from '../../hooks/useTransfer';
import HistoryItem from '../../components/HistoryItem';
import HistorySkeleton from '../../components/HistoryItem/HistorySkeleton';
import EmptyBlock from '../../components/EmptyBlock';
import { HTTP_METHODS, REQUEST_TYPE } from '../../consts/HTTP';
import { concatTransfersHistory } from '../../redux/slices/user';
import ReloadButton from '../../components/ReloadButton';

const HistoryScreen = ({cardId}) => {
    const [page, setPage] = React.useState(1);
    const [load, setLoad] = React.useState(false);
    const [currentTransfers, setCurrentTransfers] = React.useState("");

    const {error, isLoading, getTransfersHistory} = useTransfer();
    const {cards} = useSelector(state => state.user);

    const {request} = useRequest();
    const dispatch = useDispatch();

    const reloadHistory = () => {
        getTransfersHistory(cardId, true);
        setPage(1);
    }

    React.useEffect(() => {
        getTransfersHistory(cardId);
    }, [cardId]);

    React.useEffect(() => {
        const indexCard = cards.findIndex(item => item.id === cardId);
        setCurrentTransfers(cards[indexCard].transfers);
    }, [cards]);

    // Динамическая пагинация
    React.useEffect(() => {
        const scrollHandler = (e) => {
            const scrollHeight = document.querySelector(".history__inner").scrollHeight;
            const scrollTop = e.target.scrollTop;
            const innerHeight = window.innerHeight;
            
            if(scrollHeight - (scrollTop + innerHeight) < -180 && currentTransfers.content.length < currentTransfers.totalElements){
                setLoad(true);
            }
        }
        
        const historyContainer = document.querySelector(".profile__content");
        historyContainer.addEventListener("scroll", scrollHandler);

        return () => historyContainer.removeEventListener("scroll", scrollHandler);
    }, [currentTransfers]);

    React.useEffect(() => {
        if(load){
            request(REQUEST_TYPE.USER, `/transfers?id=${cardId}&offset=${page}&limit=10`, HTTP_METHODS.GET, true).then(data => {
                dispatch(concatTransfersHistory({id: cardId, data}));
                setPage(prev => prev + 1);
            }).finally(() => {
                setLoad(false);
            });
        }
    }, [load]);

    return (
        <div className="history__inner">
            <div className="history__title--inner">
                <p className="history__title">
                    История платежей
                </p>

                <ReloadButton active={isLoading} action={reloadHistory} />
            </div>

            <div className="history__content">
                {isLoading
                    ? [...Array(5)].map((_, id) => <HistorySkeleton key={id} />)
                    : !error
                    ? currentTransfers?.content?.length ? currentTransfers.content.map((data, id) => <HistoryItem key={id} data={data} />)
                    : <EmptyBlock title="Операций по карте не найдено" />
                    : <EmptyBlock title="Возникла ошибка" />}

                {load && [...Array(5)].map((_, id) => <HistorySkeleton key={id} />)}
            </div>
        </div>
    )
}

export default HistoryScreen;