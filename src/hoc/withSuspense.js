import React from 'react';

import PreloaderPage from '../components/Preloader/PreloaderPage';

export const withSuspense = (Component) => {
    return(
        <React.Suspense fallback={<PreloaderPage />}>
            <Component />
        </React.Suspense>
    );
}