import _ from 'lodash';
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
        //add more room available
    case types.ADD_ROOM_AVAILABLE:
        return [action.room,...state];

        //add more room enable
    case types.ADD_ROOM_ENABLE:
        return [action.room,...state];

    case types.ADD_MESSAGE_FOR_ROOM : {
        let currentRoom = _(state).find({id : action.roomId});
        let message = state.message;

        let messages = [...currentRoom.messages,message];
        let updateRoom = Object.assign(currentRoom,{messages});
        let removeState = _(state).filter(room => room.id !== action.roomId);

        return [updateRoom,...removeState];
    }

        // default case, return current state
    default:
        return state;
    }
}