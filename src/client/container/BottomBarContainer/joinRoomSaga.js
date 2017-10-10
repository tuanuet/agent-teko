import {call, put, takeEvery} from 'redux-saga/effects';
import roomApi from '../../api/roomApi';
import * as types from '../../constants/actionTypes';


function* handleAdminSendRequestJoinRoom(action) {
    try {
        const result = yield call(roomApi.adminSendRequestJoinRoom, action.room);
        if (result) {
            yield put({type: types.ADMIN_SEND_REQUEST_JOIN_ROOM_SUCCEED, room: action.room});
        } else {
            put({type: types.ADMIN_SEND_REQUEST_JOIN_ROOM_FAILED});
        }
    } catch (e) {
        yield put({type: types.ADMIN_SEND_REQUEST_JOIN_ROOM_FAILED, message: e.message});
    }
}

function* handleAdminSendRequestJoinRoomToSocketSucceed(action) {
    try {
        const result = yield call(roomApi.adminJoinRoomToSocketSucceed, action.room);
        if (result) {
            yield put({type: types.ADMIN_JOIN_ROOM_SUCCEED, room: action.room});
        } else {
            put({type: types.ADMIN_JOIN_ROOM_FAILED});
        }
    } catch (e) {
        yield put({type: types.ADMIN_JOIN_ROOM_FAILED, message: e.message});
    }
}

export function* adminSendRequestJoinRoom() {
    yield takeEvery(types.ADMIN_SEND_REQUEST_JOIN_ROOM, handleAdminSendRequestJoinRoom);
}

export function* adminSendRequestJoinRoomToSocketSucceed() {
    yield takeEvery(types.ADMIN_SEND_REQUEST_JOIN_ROOM_TO_SOCKET_SUCCEED, handleAdminSendRequestJoinRoom);
}