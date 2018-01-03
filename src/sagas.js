import {
    fetchRoomsSaga,
    fetchListOfTagsSaga,
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
import {
    addQuickReplySaga,
    deleteQuickReplySaga,
    updateReplySaga
} from './container/BottomBarContainer/replySaga';
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
    yield fork(saveTagOfCustomerSaga);
    yield fork(deleteTagOfCustomerSaga);
    yield fork(addQuickReplySaga);
    yield fork(deleteQuickReplySaga);
    yield fork(updateReplySaga);
}
