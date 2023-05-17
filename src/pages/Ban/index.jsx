import React from 'react';

import useAuth from '../../hooks/useAuth';

import Button from '../../components/Button';
import StatusPageInner from '../../components/StatusPageInner';
import TitleWrapper from '../../components/Wrappers/TitleWrapper';
import { useNavigate } from 'react-router-dom';

const Ban = () => {
    const {logout} = useAuth();
    const navigate = useNavigate();

    const logoutHandler = () => {
        logout(() => navigate("/"));
    }

    return (
        <TitleWrapper pageTitle="Заблокирован">
            <StatusPageInner img="ban" title="Ваш аккаунт заблокирован"
            text="Мы усердно пытаемся разобраться, в чем дело">
                <Button onClick={logoutHandler} className="statuspage__link">
                    Выйти
                </Button>
            </StatusPageInner>
        </TitleWrapper>
    )
}

export default Ban;