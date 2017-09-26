import React from 'react';
import ReactDom from 'react-dom';
import {Provider} from 'react-redux';

import store from './store/store';
import App from './container/App';


/**
 * Create DOM with id chat-root
 * for rendering
 * @type {Element}
 */
const root = document.createElement('div');
root.setAttribute('id', 'chat-root');
document.body.appendChild(root);

ReactDom.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('chat-root')
);