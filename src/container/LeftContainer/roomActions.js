import * as types from '../../constants/actionTypes';

var firstCallOf_closedRoomsRequested = false;

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
    return {type: types.RE_JOIN_ALL_AVAILABLE_ROOM_TO_SOCKET_REQUESTED, rooms};
}

export function reJoinRoomToSocketSucceed(room) {
    return {type: types.RE_JOIN_ROOM_TO_SOCKET_SUCCEED, room};
}

export function reJoinRoomToSocketFailed(room) {
    return {type: types.RE_JOIN_ROOM_TO_SOCKET_SUCCEED, room};
}

export function sendReopenRoom(roomId) {
    return {
        type: types.REOPEN_ROOM,
        roomId
    }
}

export function resetNumOfUnReadMessages(room) {
    return {type: types.RESET_NUM_OF_UNREAD_MESSAGE, room};
}

export function updateNumberOfUnreadMessages(roomId) {
    return {type: types.UPDATE_NUM_OF_UNREAD_MESSAGE, roomId};
}

export function listOfTagsFetchRequested(){
    return {type: types.LIST_OF_TAGS_FETCH_REQUESTED};
}

export function fetchListOfTagsSucceed(tags) {
    return {type: types.LIST_OF_TAGS_FETCH_SUCCEED, tags};
}

export function loadClosedRoomRequested() {
    if (!firstCallOf_closedRoomsRequested) {
        firstCallOf_closedRoomsRequested = true;
        return {type: types.LOAD_CLOSED_ROOM_REQUESTED};
    } else return {type: "NOTHING_TO_DO"};
}

export function fetchClosedRoomsSucceed(closedRooms) {
    return {type: types.LOAD_CLOSED_ROOM_SUCCEED, closedRooms};
}
