import React from 'react';
import { Lock } from '../../components/Icons';

import './index.css';

const Api = () => {
    return (
        <div class="api">
            <div class="container">
                <div class="api__inner">
                    <h1 class="api__title">API</h1>

                    <div class="api__columns">
                        <div class="api__column">
                            <h4 class="api__label">AUTH</h4>

                            <div className="api__items">
                                <div class="item-api">
                                    <div class="item-api__header">
                                        <p class="item-api__method item-api__method_post">POST</p>
                                        <p class="item-api__link">/auth/login</p>
                                    </div>
                                    <div class="item-api__content">
                                        <div class="item-api__column">
                                            <p class="item-api__label">request</p>
                                            <ul class="item-api__list">
                                                <li class="item-api__item">phoneNum</li>
                                                <li class="item-api__item">password</li>
                                            </ul>
                                        </div>
                                        <div class="item-api__column">
                                            <p class="item-api__label">response</p>
                                            <ul class="item-api__list">
                                                <li class="item-api__item">token_type</li>
                                                <li class="item-api__item">access_token</li>
                                                <li class="item-api__item">refresh_token</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div class="item-api">
                                    <div class="item-api__header">
                                        <p class="item-api__method item-api__method_post">POST</p>
                                        <p class="item-api__link">/auth/register</p>
                                    </div>
                                    <div class="item-api__content">
                                        <div class="item-api__column">
                                            <p class="item-api__label">request</p>
                                            <ul class="item-api__list">
                                                <li class="item-api__item">phoneNum</li>
                                                <li class="item-api__item">password</li>
                                                <li class="item-api__item">fullName</li>
                                            </ul>
                                        </div>
                                        <div class="item-api__column">
                                            <p class="item-api__label">response</p>
                                            <ul class="item-api__list">
                                                <li class="item-api__item">token_type</li>
                                                <li class="item-api__item">access_token</li>
                                                <li class="item-api__item">refresh_token</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="api__column">
                            <h4 class="api__label">USER</h4>

                            <div className="api__items">
                                <div class="item-api">
                                    <div class="item-api__header">
                                        <Lock class="item-api__icon"/>
                                        <p class="item-api__method item-api__method_get">GET</p>
                                        <p class="item-api__link">/user/cards</p>
                                    </div>
                                    <div class="item-api__content">
                                        <div class="item-api__column">
                                            <p class="item-api__label">request</p>
                                        </div>
                                        <div class="item-api__column">
                                            <p class="item-api__label">response</p>
                                            <ul class="item-api__list">
                                                <li class="item-api__item">id</li>
                                                <li class="item-api__item">cardNum</li>
                                                <li class="item-api__item">cvc</li>
                                                <li class="item-api__item">expDate</li>
                                                <li class="item-api__item">balance</li>
                                                <li class="item-api__item">firstName</li>
                                                <li class="item-api__item">secondName</li>
                                                <li class="item-api__item">userId</li>
                                                <li class="item-api__item">lock</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="item-api">
                                    <div class="item-api__header">
                                        <Lock class="item-api__icon"/>
                                        <p class="item-api__method item-api__method_get">GET</p>
                                        <p class="item-api__link">/user/short_info</p>
                                    </div>
                                    <div class="item-api__content">
                                        <div class="item-api__column">
                                            <p class="item-api__label">request</p>
                                        </div>
                                        <div class="item-api__column">
                                            <p class="item-api__label">response</p>
                                            <ul class="item-api__list">
                                                <li class="item-api__item">id</li>
                                                <li class="item-api__item">phoneNum</li>
                                                <li class="item-api__item">verified</li>
                                                <li class="item-api__item">roles</li>
                                                <li class="item-api__item">firstName</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="item-api">
                                    <div class="item-api__header">
                                        <Lock class="item-api__icon"/>
                                        <p class="item-api__method item-api__method_post">POST</p>
                                        <p class="item-api__link">/user/create_card</p>
                                    </div>
                                    <div class="item-api__content">
                                        <div class="item-api__column">
                                            <p class="item-api__label">request</p>
                                            <ul class="item-api__list">
                                                <li class="item-api__item">firstName</li>
                                                <li class="item-api__item">secondName</li>
                                                <li class="item-api__item">type</li>
                                            </ul>
                                        </div>
                                        <div class="item-api__column">
                                            <p class="item-api__label">response</p>
                                            <ul class="item-api__list">
                                                <li class="item-api__item">id</li>
                                                <li class="item-api__item">cardNum</li>
                                                <li class="item-api__item">cvc</li>
                                                <li class="item-api__item">expDate</li>
                                                <li class="item-api__item">balance</li>
                                                <li class="item-api__item">firstName</li>
                                                <li class="item-api__item">secondName</li>
                                                <li class="item-api__item">type</li>
                                                <li class="item-api__item">lock</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="api__column">
                            <h4 class="api__label">ADMIN</h4>

                            <div class="item-api">
                                <div class="item-api__header">
                                    <Lock class="item-api__icon"/>

                                    <p class="item-api__method item-api__method_get">GET</p>

                                    <p class="item-api__link">/admin/full_info?offset=0&limit=5</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Api; 