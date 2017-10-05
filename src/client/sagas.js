import fetchRoomsSaga from './container/LeftContainer/roomSaga';
import {fetchMetaLinkSaga,uploadImageSaga} from "./container/BottomBarContainer/sagas"
import {fork} from 'redux-saga/effects';

export default function* rootSaga() {
    yield fork(uploadImageSaga);
    yield fork(fetchMetaLinkSaga);
    yield fork(fetchRoomsSaga);
}
