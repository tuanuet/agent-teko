import {call, put, takeEvery} from 'redux-saga/effects';
import customerApi from '../../../api/customerApi';
import * as types from '../../../constants/actionTypes';
import * as customerActions from '../action/customerActions'

function* fetchHistoryChat(action) {
    try {
        console.log("load history chat room ", action.roomId);
        const customers = yield call(customerApi.historyChatFetchRequested, action.roomId);
        yield put(customerActions.historyChatFetchSucceed(action.roomId, customers));
    } catch (e) {
        console.log("fetch history failed", e);
        yield put({type: types.HISTORY_CHAT_FETCH_FAILED, message: e.message});
    }
}

function* fetchHistoryChatSaga() {
    yield takeEvery(types.HISTORY_CHAT_FETCH_REQUESTED, fetchHistoryChat);
}

export default fetchHistoryChatSaga;