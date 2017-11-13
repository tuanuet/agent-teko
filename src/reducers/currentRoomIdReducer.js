import initialState from './initialState';
import * as types from '../constants/actionTypes';

export default function currentRoomIdReducer(state=initialState.currentRoomId, action) {
    switch (action.type) {

        //TODO: case of choosing a room
        case types.ADMIN_CHOOSE_ROOM:
            return action.roomId;
        case types.REOPEN_ROOM_SUCCEED:
            return action.room.roomId;
        //TODO: default case, return current state
        default:
            return state;
    }
}
