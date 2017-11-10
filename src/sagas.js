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
    saveTagOfCustomerSaga,
    deleteTagOfCustomerSaga
} from './container/MiddleContainer/chatSaga';
import fetchNotesSaga from './container/RightContainer/saga/noteSaga';
import {
    adminSendRequestJoinRoomToSocketSucceed,
    adminReopenRoom
} from "./container/BottomBarContainer/joinRoomSaga"
import {fetchMetaLinkSaga,uploadImageSaga} from "./container/BottomBarContainer/bottomBarSagas"
import {fetchMoreMessages} from './container/ChatContentContainer/saga'
import {fork} from 'redux-saga/effects';

export default function* rootSaga() {
    yield fork(uploadImageSaga);
    yield fork(fetchRoomsSaga);
    yield fork(saveAgentsSaga);
    yield fork(fetchAgentsSaga);
    yield fork(fetchMessagesSaga);
    yield fork(fetchNotesSaga);
    yield fork(adminSendRequestJoinRoomToSocketSucceed);
    yield fork(adminReopenRoom);
    yield fork(fetchListOfTagsSaga);
    yield fork(setStatusOfRoomSaga);
    yield fork(fetchClosedRoomSaga);
    yield fork(saveTagOfCustomerSaga);
    yield fork(deleteTagOfCustomerSaga);
    yield fork(fetchMoreMessages);
}