import fetchRoomsSaga from './container/LeftContainer/roomSaga';
import {fork} from 'redux-saga/effects';

export default function* rootSaga() {
    // yield fork(fetchMetaLinkSaga);
    yield fork(fetchRoomsSaga);
}
