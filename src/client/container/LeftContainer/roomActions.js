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
    console.log("request join room");
    return {type: types.JOIN_ROOM_TO_PHP_SERVER_REQUESTED, room}
}
