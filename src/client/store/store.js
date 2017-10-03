import reducer from '../reducers/reducer';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import thunk from 'redux-thunk';
import rootSaga from '../sagas';
import {socketMiddleware} from '../middleware/socketMiddleware';

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();
const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunk, sagaMiddleware, socketMiddleware),
);
// then run the saga
sagaMiddleware.run(rootSaga);

export default store;