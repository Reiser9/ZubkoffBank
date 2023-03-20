import React from 'react';
import { Lock } from '../../components/Icons';

import './index.css';

import apiConfig from '../../apiConfig.json';
import ApiBlock from '../../components/ApiBlock';

const Api = () => {
    return (
        <div className="api">
            <div className="container">
                <div className="api__inner">
                    <h1 className="api__title">API</h1>
                    <div className="api__columns">
                        {apiConfig.map((data, id) =>
                            <div key={id} className="api__column">
                                <h4 className="api__label">{data.title}</h4>

                                <div className="api__items">
                                    {data.data.map((data, id) =>
                                        <ApiBlock key={id} data={data} />
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Api; 