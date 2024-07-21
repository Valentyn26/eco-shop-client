import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';

import { Context } from './context/context';
import ProductStore from './store/ProductStore';
import UserStore from './store/UserStore';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Context.Provider value={{ productStore: new ProductStore(), userStore: new UserStore() }}>
        <App />
    </Context.Provider>
);