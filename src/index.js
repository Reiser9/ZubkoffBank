import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { SkeletonTheme } from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

import App from "./App";

import { store } from './redux/store';

import InitialWrapper from "./components/Wrappers/InitialWrapper";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <Provider store={store}>
        <BrowserRouter>
            <InitialWrapper>
                <SkeletonTheme baseColor="#eaeaea" highlightColor="#d8d8d8">
                    <App />
                </SkeletonTheme>
            </InitialWrapper>
        </BrowserRouter>
    </Provider>
);
