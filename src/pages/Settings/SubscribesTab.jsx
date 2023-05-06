import React from 'react';

import './index.css';

import EmptyBlock from '../../components/EmptyBlock';
import SubscribeItem from './SubscribeItem';
import useSubscribes from '../../hooks/useSubscribes';
import Preloader from '../../components/Preloader';
import Button from '../../components/Button';
import { useSelector } from 'react-redux';

const SubscribesTab = () => {
    const {isLoading, error, getSubscribes} = useSubscribes();
    const {subscribes} = useSelector(state => state.subscribes);

    React.useEffect(() => {
        getSubscribes();
    }, []);

    if(isLoading){
        return <Preloader />
    }

    if(error){
        return <EmptyBlock center title="Ошибка при загрузке данных">
            <Button className="subscribes__reload" onClick={getSubscribes}>Перезагрузить</Button>
        </EmptyBlock>
    }

    return (
        <>
            <div className="setting__block">
                <h4 className="setting__title">Активные подписки</h4>

                <EmptyBlock title="У вас нет активных подписок" />
            </div>

            <div className="setting__block">
                <h4 className="setting__title">Список подписок</h4>

                <div className="subscribes__content">
                    {subscribes.map(data => <SubscribeItem data={data} />)}
                </div>
            </div>
        </>
    )
}

export default SubscribesTab;