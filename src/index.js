import React from 'react';
import ReactDom from 'react-dom';
import {Provider} from 'react-redux';
import store from './store/store';
import App from './container/App/App';
import startConnection from './middleware/socketMiddleware';
import {roomsFetchRequested, listOfTagsFetchRequested} from './container/LeftContainer/roomActions';
require('babel-core/register');
require('babel-polyfill');

import moment from 'moment'
import vietnamLocation from 'moment/locale/vi'
moment.locale('vi', vietnamLocation)

startConnection();
store.dispatch(roomsFetchRequested());
store.dispatch(listOfTagsFetchRequested());
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
        <App />
    </Provider>,
    document.getElementById('chat-root')
);
