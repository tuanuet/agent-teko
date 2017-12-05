import initialState from './initialState';
import * as types from '../constants/actionTypes';

export default function currentRoomIdReducer(state=initialState.currentRoomId, action) {
    switch (action.type) {
        case types.ADMIN_CHOOSE_ROOM:
            return action.roomId;
        case types.REOPEN_ROOM_SUCCEED:
            return action.room.roomId;
        case types.REMOVE_ROOM:
            return state === action.roomId ? null : state
        case types.SET_STATUS_OF_ROOM_SUCCEED:
            return null
        default:
            return state;
    }
}
