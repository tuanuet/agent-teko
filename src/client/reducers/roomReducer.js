import initialState from './initialState';
import * as types from '../constants/actionTypes';

export default function roomReducer(state=initialState.rooms, action) {
    switch (action.type) {

        //TODO: fetch rooms
        case types.ROOMS_FETCH_SUCCEED:
            return [
                ...state,
                ...action.rooms
            ];

        case types.MESSAGES_FETCH_SUCCEED:
            console.log("reducer", action);
            return state.map(room => {
                if (room.id !== action.roomId) {
                    // This isn't the item we care about - keep it as-is
                    return room;
                }

                return {
                    ...room,
                    messages: action.messages
                };
            });


        //TODO: default case, return current state
        default:
            return state;
    }
}