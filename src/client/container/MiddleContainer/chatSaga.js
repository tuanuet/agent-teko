import {call, put, takeEvery} from 'redux-saga/effects';
import chatApi from '../../api/chatApi';
import * as types from '../../constants/actionTypes';
import * as chatActions from './chatActions';
import * as customerActions from '../RightContainer/action/customerActions';
import * as noteActions from '../RightContainer/action/noteActions';

function* fetchMessages(action) {
    try {
        const messages = yield call(chatApi.messagesFetchRequested, action.roomId);
        console.log("messages fetched", messages);
        yield put(chatActions.messagesFetchSucceed(action.roomId, messages));
        yield put(customerActions.historyChatFetchRequested(action.roomId));
        yield put(noteActions.notesFetchRequested(action.roomId));
    } catch (e) {
        console.log("fetch message failed", e);
        yield put({type: types.MESSAGES_FETCH_FAILED, message: e.message});
    }
}

function* fetchMessagesSaga() {
    yield takeEvery(types.MESSAGES_FETCH_REQUESTED, fetchMessages);
}

export default fetchMessagesSaga;