import React from 'react';

import Button from '../../components/Button';
import TitleWrapper from '../../components/Wrappers/TitleWrapper';
import StatusPageInner from '../../components/StatusPageInner';

const ServerNotAvailable = () => {
    return (
        <TitleWrapper pageTitle="Сервер недоступен">
            <StatusPageInner img="server-not-available" title="Сервер временно недоступен"
            text="Повторите попытку позже">
                <Button isLink to="/" className="statuspage__link">
                    Перезагрузить
                </Button>
            </StatusPageInner>
        </TitleWrapper>
    )
}

export default ServerNotAvailable;