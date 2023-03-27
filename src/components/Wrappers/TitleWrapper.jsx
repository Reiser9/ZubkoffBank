import React from 'react';

const TitleWrapper = ({pageTitle, children}) => {
    React.useEffect(() => {
        document.title = `${process.env.REACT_APP_BANK_NAME} Bank - ${pageTitle}`;
        window.scrollTo(0, 0);
    }, [pageTitle]);

    return children;
}

export default TitleWrapper;