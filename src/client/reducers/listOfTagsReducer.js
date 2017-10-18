import initialState from './initialState';
import * as types from '../constants/actionTypes';

export default function listOfTagsReducer(state=initialState.listOfTags, action) {
    switch (action.type) {

        //TODO: case of choosing a room
        case types.LIST_OF_TAGS_FETCH_SUCCEED:
            return action.listOfTags;

        //TODO: default case, return current state
        default:
            return state;
    }
}