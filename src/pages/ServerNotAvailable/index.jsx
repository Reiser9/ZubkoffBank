import React from 'react';

import useAuth from '../../hooks/useAuth';

import Button from '../../components/Button';
import TitleWrapper from '../../components/Wrappers/TitleWrapper';
import StatusPageInner from '../../components/StatusPageInner';

const ServerNotAvailable = () => {
    const {reload} = useAuth();

    return (
        <TitleWrapper pageTitle="Сервер недоступен">
            <StatusPageInner img="server-not-available" title="Сервер временно недоступен"
            text="Повторите попытку позже">
                <Button onClick={reload} className="statuspage__link">
                    Перезагрузить
                </Button>
            </StatusPageInner>
        </TitleWrapper>
    )
}

export default ServerNotAvailable;