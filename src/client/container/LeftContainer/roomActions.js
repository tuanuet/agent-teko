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