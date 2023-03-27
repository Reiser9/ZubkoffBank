import React from 'react';

import './index.css';

import TitleWrapper from '../../components/Wrappers/TitleWrapper';
import AuthWrapper from '../../components/Wrappers/AuthWrapper';
import apiConfig from '../../apiConfig.json';
import ApiBlock from './ApiBlock';

const Api = () => {
    return (
        <TitleWrapper pageTitle="API">
            <AuthWrapper>
                <div className="api">
                    <div className="container">
                        <div className="api__inner">
                            <h1 className="api__title">API</h1>
                            
                            <div className="api__columns">
                                {apiConfig.map((data, id) => <ApiBlock key={id} data={data} />)}
                            </div>
                        </div>
                    </div>
                </div>
            </AuthWrapper>
        </TitleWrapper>
    )
}

export default Api; 