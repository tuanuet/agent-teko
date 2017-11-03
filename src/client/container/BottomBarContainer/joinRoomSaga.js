import {call, put, takeEvery} from 'redux-saga/effects';
import roomApi from '../../api/roomApi';
import * as types from '../../constants/actionTypes';


function* handleAdminSendRequestJoinRoom(action) {
    try {
        const response = yield call(roomApi.sendRequestJoinRoom, action.room);
        if (response.result) {
            yield put({type: types.JOIN_ROOM_TO_PHP_SERVER_SUCCEED, room: action.room});
        } else {
            console.log("error room was assigned");
            put({type: types.JOIN_ROOM_TO_PHP_SERVER_FAILED});
        }
    } catch (e) {
        console.log("error while send request join room", e);
        yield put({type: types.JOIN_ROOM_TO_PHP_SERVER_FAILED, message: e.message});
    }
}

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

function* handleReopenRoom(action)  {
    try {
        const response = yield call(roomApi.adminReopenRoom, action.roomId)
        if (response.result) {
            const { room } = response.result
            yield put({type: types.REOPEN_ROOM_SUCCEED, newRoom: room, oldRoomId: action.roomId})
        } else {
            console.log(`Error while reopen room. Stack trace: ${response}`)
            alert(`Error while reopen room. Please try again later.`)
        }
    } catch (e) {
        console.log(`Error while reopen room. Stack trace: ${e.message}`)
        alert(`Error while reopen room. Please try again later.`)
    }
}

export function* adminSendRequestJoinRoom() {
    yield takeEvery(types.JOIN_ROOM_TO_PHP_SERVER_REQUESTED, handleAdminSendRequestJoinRoom);
}

export function* adminSendRequestJoinRoomToSocketSucceed() {
    yield takeEvery(types.JOIN_ROOM_TO_SOCKET_SUCCEED, handleAdminSendRequestJoinRoomToSocketSucceed);
}

export function* adminReopenRoom() {
    yield takeEvery(types.REOPEN_ROOM, handleReopenRoom)
}
