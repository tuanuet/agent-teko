import {call, put, takeEvery} from 'redux-saga/effects';
import chatApi from '../../api/chatApi';
import * as types from '../../constants/actionTypes';

function* handleFetchMoreMessages(action) {
    try {
        const response = yield call(chatApi.fetchMoreMessages, action.payload.roomId);
        if (response) {
            yield put({
                type: types.FETCH_MORE_MESSAGES_SUCCEED,
                currentRoomId: action.payload.currentRoomId,
                messages: response.messages,
                nextFetchingRoom: response.nextFetchingRoom
            });
        } else {
            console.log('Error while fetching more messages');
            put({type: types.FETCH_MORE_MESSAGES_FAILED});
        }
    } catch (e) {
        console.log('Error while fetching more messages');
        yield put({type: types.FETCH_MORE_MESSAGES_FAILED, message: e.message});
    }
}

export function* fetchMoreMessages() {
    yield takeEvery(types.FETCH_MORE_MESSAGES_REQUEST, handleFetchMoreMessages);
}
