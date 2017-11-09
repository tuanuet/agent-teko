import initialState from './initialState';
import * as types from '../constants/actionTypes';

export default function tagsReducer(state=initialState.tags, action) {
    switch (action.type) {

        //TODO: case of choosing a room
        case types.LIST_OF_TAGS_FETCH_SUCCEED:
            return [...action.tags];

        default:
            return state;
    }
}
