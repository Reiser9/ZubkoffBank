import React from 'react';
import { useSelector } from 'react-redux';

import './index.css';

import EmptyBlock from '../../components/EmptyBlock';
import SubscribeItem from './SubscribeItem';
import useSubscribes from '../../hooks/useSubscribes';
import Preloader from '../../components/Preloader';
import Button from '../../components/Button';
import useUser from '../../hooks/useUser';

const SubscribesTab = () => {
    const [currentSubscribes, setCurrentSubscribes] = React.useState([]);
    const [allSubscribes, setAllSubscribes] = React.useState([]);

    const {isLoading, error, getSubscribes} = useSubscribes();
    const {subscribes} = useSelector(state => state.subscribes);
    const {isLoading: isLoadingUser, getUserSubscribes, subscribe, unsubscribe} = useUser();
    const {userIsLoading, subscribes: userSubscribes} = useSelector(state => state.user);

    React.useEffect(() => {
        getSubscribes();
        getUserSubscribes();
    }, []);

    React.useEffect(() => {
        setAllSubscribes(subscribes.map(data => {
            const elementSuscribe = userSubscribes.find(elem => elem.subscribe.id === data.id && elem.status);
            
            if(elementSuscribe){
                return {
                    subscribe: {
                        ...data
                    },
                    status: true
                }
            }

            return {
                subscribe: {
                    ...data
                },
                status: false
            }
        }));
    }, [subscribes, userSubscribes]);

    React.useEffect(() => {
        setCurrentSubscribes(userSubscribes.filter(a => a.status));
    }, [userSubscribes]);

    if(isLoading || userIsLoading){
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
                
                <div className="subscribes__content">
                    {currentSubscribes.length
                    ? currentSubscribes.map(data => <SubscribeItem
                                                        key={data.subscribe.id}
                                                        data={data.subscribe}
                                                        buttonText="Отключить"
                                                        action={() => unsubscribe(data.subscribe.id)}
                                                        isLoading={isLoadingUser}
                                                    />)
                    : <EmptyBlock title="У вас нет активных подписок" />}
                </div>
            </div>

            <div className="setting__block">
                <h4 className="setting__title">Все подписки</h4>

                <div className="subscribes__content">
                    {allSubscribes.map(data => <SubscribeItem
                                                    key={data.subscribe.id}
                                                    data={data.subscribe}
                                                    action={() => subscribe(data.subscribe.id)}
                                                    active={data.status}
                                                    isLoading={isLoadingUser}
                                                />)}
                </div>
            </div>
        </>
    )
}

export default SubscribesTab;