import React from 'react';

import Button from '../../components/Button';
import StatusPageInner from '../../components/StatusPageInner';
import TitleWrapper from '../../components/Wrappers/TitleWrapper';

const Ban = () => {
    return (
        <TitleWrapper pageTitle="Заблокирован">
            <StatusPageInner img="ban" title="Ваш аккаунт заблокирован"
            text="Мы усердно пытаемся разобраться, в чем дело">
                <Button isLink to="/" className="statuspage__link">
                    На главную
                </Button>
            </StatusPageInner>
        </TitleWrapper>
    )
}

export default Ban;