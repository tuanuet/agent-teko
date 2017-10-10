import * as types from '../../constants/actionTypes';

var firstCallOf_messagesFetchRequested = [];

export function messagesFetchRequested(roomId) {
    if (firstCallOf_messagesFetchRequested[roomId] == undefined) {
        firstCallOf_messagesFetchRequested[roomId] = 1;
        return {type: types.MESSAGES_FETCH_REQUESTED, roomId}
    } else {
        return {type: "NOTHING_TO_DO"};
    }
}

export function messagesFetchSucceed(roomId, messages) {
    return {type: types.MESSAGES_FETCH_SUCCEED, roomId, messages}
}

export function adminSendRequestJoinRoomToSocketSucceed(room) {
    return {type: types.ADMIN_SEND_REQUEST_JOIN_ROOM_TO_SOCKET_SUCCEED, room}
}