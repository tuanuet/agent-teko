import {call, put, takeEvery} from 'redux-saga/effects';
import chatApi from '../../api/chatApi';
import * as types from '../../constants/actionTypes';
import * as chatActions from './chatActions';


function* fetchMessages(action) {
    try {
        const messages = yield call(chatApi.messagesFetchRequested, action.roomId);
        console.log("messages fetched", messages);
        yield put(chatActions.messagesFetchSucceed(action.roomId, messages));
    } catch (e) {
        console.log("fetch message failed", e);
        yield put({type: types.MESSAGES_FETCH_FAILED, message: e.message});
    }
}

function* fetchMessagesSaga() {
    yield takeEvery(types.MESSAGES_FETCH_REQUESTED, fetchMessages);
}

export default fetchMessagesSaga;