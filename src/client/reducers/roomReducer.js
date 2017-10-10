import initialState from './initialState';
import * as types from '../constants/actionTypes';

export default function roomReducer(state=initialState.rooms, action) {
    switch (action.type) {

        //fetch rooms
        case types.ROOMS_FETCH_SUCCEED:
            return [
                ...state,
                ...action.rooms
            ];


        //fetch messages of room
        case types.MESSAGES_FETCH_SUCCEED:
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

        //fetch history chat of customer
        case types.HISTORY_CHAT_FETCH_SUCCEED:
            return state.map(room => {
                if (room.id !== action.roomId) {
                    // This isn't the item we care about - keep it as-is
                    return room;
                }

                return {
                    ...room,
                    customers: action.customers
                };
            });

        //fetch history chat of customer
        case types.NOTES_FETCH_SUCCEED:
            return state.map(room => {
                if (room.id !== action.roomId) {
                    // This isn't the item we care about - keep it as-is
                    return room;
                }

                return {
                    ...room,
                    notes: action.notes
                };
            });

        //create a new note
        case types.CREATE_NOTE_SUCCEED:
            return state.map(room => {
                if (room.id !== action.roomId) {
                    // This isn't the item we care about - keep it as-is
                    return room;
                }

                return {
                    ...room,
                    notes: [...room.notes, action.note]
                };
            });

        //admin join room succeed
        case types.ADMIN_JOIN_ROOM_SUCCEED:
            console.log("state", state);
            return state.map(room => {
                if (room.id !== action.room.id) {
                    // This isn't the item we care about - keep it as-is
                    return room;
                }

                return {
                    ...{},
                    ...room,
                    status: 2
                };
            });

        //TODO: default case, return current state
        default:
            return state;
    }
}