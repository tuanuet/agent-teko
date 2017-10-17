import fetchRoomsSaga from './container/LeftContainer/roomSaga';
import {
    fetchMessagesSaga,
    fetchAgentsSaga,
    saveAgentsSaga
} from './container/MiddleContainer/chatSaga';
import fetchHistoryChatSaga from './container/RightContainer/saga/historyChatSaga';
import fetchNotesSaga from './container/RightContainer/saga/noteSaga';
import {adminSendRequestJoinRoom, adminSendRequestJoinRoomToSocketSucceed} from "./container/BottomBarContainer/joinRoomSaga"
import {fetchMetaLinkSaga,uploadImageSaga} from "./container/BottomBarContainer/sagas"
import {fork} from 'redux-saga/effects';

export default function* rootSaga() {
    yield fork(uploadImageSaga);
    yield fork(fetchMetaLinkSaga);
    yield fork(fetchRoomsSaga);
    yield fork(saveAgentsSaga);
    yield fork(fetchAgentsSaga);
    yield fork(fetchMessagesSaga);
    yield fork(fetchHistoryChatSaga);
    yield fork(fetchNotesSaga);
    yield fork(adminSendRequestJoinRoomToSocketSucceed);
    yield fork(adminSendRequestJoinRoom);
}
