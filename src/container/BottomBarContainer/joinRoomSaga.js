import {call, put, takeEvery} from 'redux-saga/effects';
import roomApi from '../../api/roomApi';
import * as types from '../../constants/actionTypes';

function* handleAdminSendRequestJoinRoomToSocketSucceed(action) {
    try {
        const response = yield call(roomApi.adminJoinRoomToSocketSucceed, action.room);
        if (response.result) {
            yield put({type: types.JOIN_ROOM_SUCCEED, room: action.room});
        } else {
            console.log("error while updating assignee");
            put({type: types.JOIN_ROOM_FAILED});
        }
    } catch (e) {
        console.log("error while send request join room", e);
        yield put({type: types.JOIN_ROOM_FAILED, message: e.message});
    }
}

export function* adminSendRequestJoinRoomToSocketSucceed() {
    yield takeEvery(types.JOIN_ROOM_TO_SOCKET_SUCCEED, handleAdminSendRequestJoinRoomToSocketSucceed);
}
