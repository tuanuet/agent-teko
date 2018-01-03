import {call, put, takeEvery} from 'redux-saga/effects';
import chatApi from '../../api/chatApi';
import * as types from '../../constants/actionTypes';

function* handleAddQuickReplyRequested(action) {

    try {
        const response = yield call(chatApi.addQuickReplyRequested, action.replyContent);

        if (response.result) {
            yield put({type: types.ADD_QUICK_REPLY_SUCCEED, reply: response.reply});
        } else {
            console.log("error while add new quick reply");
        }
    } catch (e) {
        console.log("error while add new quick reply", e);
    }
}

export function* addQuickReplySaga() {

    yield takeEvery(types.ADD_QUICK_REPLY_REQUESTED, handleAddQuickReplyRequested);
}

function* handleDeleteQuickReplyRequested(action) {

    try {
        const response = yield call(chatApi.deleteQuickReplyRequested, action.replyId);

        if (response.result) {
            yield put({type: types.DELETE_QUICK_REPLY_SUCCEED, replyId: action.replyId});
        } else {
            console.log("error while delete quick reply");
        }
    } catch (e) {
        console.log("error while delete quick reply", e);
    }
}

export function* deleteQuickReplySaga() {

    yield takeEvery(types.DELETE_QUICK_REPLY_REQUESTED, handleDeleteQuickReplyRequested);
}


function* handleUpdateQuickReplyRequested(action) {

    try {
        const response = yield call(chatApi.updateQuickReplyRequested, action.replyId, action.replyContent);
        if (response.result) {
            yield put({type: types.UPDATE_QUICK_REPLY_SUCCEED, reply: response.reply});
        } else {
            console.log("error while update quick reply");
        }
    } catch (e) {
        console.log("error while update quick reply", e);
    }
}

export function* updateReplySaga() {

    yield takeEvery(types.UPDATE_QUICK_REPLY_REQUESTED, handleUpdateQuickReplyRequested);
}


