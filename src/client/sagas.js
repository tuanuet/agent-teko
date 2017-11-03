import {
    fetchRoomsSaga,
    fetchListOfTagsSaga,
    fetchClosedRoomSaga
} from './container/LeftContainer/roomSaga';
import {
    fetchMessagesSaga,
    fetchAgentsSaga,
    saveAgentsSaga,
    setStatusOfRoomSaga,
    saveTagOfRoomSaga,
    deleteTagOfRoomSaga
} from './container/MiddleContainer/chatSaga';
import fetchHistoryChatSaga from './container/RightContainer/saga/historyChatSaga';
import fetchNotesSaga from './container/RightContainer/saga/noteSaga';
import {
    adminSendRequestJoinRoom,
    adminSendRequestJoinRoomToSocketSucceed,
    handleReopenRoom
} from "./container/BottomBarContainer/joinRoomSaga"
import {fetchMetaLinkSaga,uploadImageSaga} from "./container/BottomBarContainer/bottomBarSagas"
import {fork} from 'redux-saga/effects';

export default function* rootSaga() {
    yield fork(uploadImageSaga);
    yield fork(fetchRoomsSaga);
    yield fork(saveAgentsSaga);
    yield fork(fetchAgentsSaga);
    yield fork(fetchMessagesSaga);
    yield fork(fetchHistoryChatSaga);
    yield fork(fetchNotesSaga);
    yield fork(adminSendRequestJoinRoomToSocketSucceed);
    yield fork(adminSendRequestJoinRoom);
    yield fork(fetchListOfTagsSaga);
    yield fork(setStatusOfRoomSaga);
    yield fork(fetchClosedRoomSaga);
    yield fork(saveTagOfRoomSaga);
    yield fork(deleteTagOfRoomSaga);
}
