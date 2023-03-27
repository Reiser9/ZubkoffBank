import React from 'react';

import Button from '../../components/Button';
import TitleWrapper from '../../components/Wrappers/TitleWrapper';
import StatusPageInner from '../../components/StatusPageInner';

const NotFound = () => {
    return(
        <TitleWrapper pageTitle="404">
            <StatusPageInner img="404" title="К сожалению, такой страницы на нашем сайте нет"
            text="Но мы сделаем все, что бы она обязательно появилась!">
                <Button isLink to="/" className="notfound__link">
                    На главную
                </Button>
            </StatusPageInner>
        </TitleWrapper>
    )
}

export default NotFound;