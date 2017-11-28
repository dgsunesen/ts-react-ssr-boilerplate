import * as React from 'react';
import { store } from 'app/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import 'app/static/favicon.ico';
import 'styles/global.css';

import App from './App';

const Root: React.StatelessComponent = () => (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);

export default Root;
