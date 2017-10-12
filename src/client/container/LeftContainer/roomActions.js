import * as types from '../../constants/actionTypes';

export function roomsFetchRequested() {
    return {type: types.ROOMS_FETCH_REQUESTED}
}

export function fetchRoomsSucceed(rooms) {
    return {type: types.ROOMS_FETCH_SUCCEED, rooms};
}

export function adminChooseRoom(roomId) {
    return {type: types.ADMIN_CHOOSE_ROOM, roomId};
}

export function reJoinAllAvailableRoomsToSocketRequested(rooms) {
    console.log("RE JOIN ALL ROOMS");
    return {type: types.RE_JOIN_ALL_AVAILABLE_ROOM_TO_SOCKET_REQUESTED, rooms}
}

export function reJoinRoomToSocketSucceed(room) {
    return {type: types.RE_JOIN_ROOM_TO_SOCKET_SUCCEED, room}
}

export function reJoinRoomToSocketFailed(room) {
    return {type: types.RE_JOIN_ROOM_TO_SOCKET_SUCCEED, room}
}

export function sendRequestJoinRoomToPHPServer(room) {
    return {type: types.JOIN_ROOM_TO_PHP_SERVER_REQUESTED, room}
}

export function resetNumOfUnReadMessages(room) {
    return {type: types.RESET_NUM_OF_UNREAD_MESSAGE, room}
}

export function updateNumberOfUnreadMessages(roomId) {
    return {type: types.UPDATE_NUM_OF_UNREAD_MESSAGE, roomId}
}
