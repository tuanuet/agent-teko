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
} from "./container/BottomBarContainer/joinRoomSaga"
import {fetchMoreMessages} from './container/ChatContentContainer/saga'
import {fork} from 'redux-saga/effects';

export default function* rootSaga() {
    yield fork(fetchRoomsSaga);
    yield fork(saveAgentsSaga);
    yield fork(fetchAgentsSaga);
    yield fork(fetchMessagesSaga);
    yield fork(fetchNotesSaga);
    yield fork(adminSendRequestJoinRoomToSocketSucceed);
    yield fork(fetchListOfTagsSaga);
    yield fork(setStatusOfRoomSaga);
    yield fork(fetchClosedRoomSaga);
    yield fork(saveTagOfCustomerSaga);
    yield fork(deleteTagOfCustomerSaga);
    yield fork(fetchMoreMessages);
}
