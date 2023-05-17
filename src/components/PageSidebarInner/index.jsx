import React from 'react';

import './index.css';

import AuthWrapper from '../../components/Wrappers/AuthWrapper';
import TitleWrapper from '../../components/Wrappers/TitleWrapper';

const PageSidebarInner = ({pageTitle, children}) => {
    return (
        <TitleWrapper pageTitle={pageTitle}>
            <AuthWrapper>
                <section className="profile">
                    <div className="container">
                        <div className="profile__inner">
                            {children}
                        </div>
                    </div>
                </section>
            </AuthWrapper>
        </TitleWrapper>
    )
}

export default PageSidebarInner;