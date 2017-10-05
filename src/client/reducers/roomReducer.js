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

        //TODO: default case, return current state
        default:
            return state;
    }
}