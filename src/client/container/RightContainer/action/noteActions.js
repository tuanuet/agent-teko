import * as types from '../../../constants/actionTypes';
import * as noteApi from '../../../api/noteApi';

export function notesFetchRequested(roomId) {
    return {type: types.NOTES_FETCH_REQUESTED, roomId}
}

export function notesFetchSucceed(roomId, notes) {
    return {type: types.NOTES_FETCH_SUCCEED, roomId, notes}
}

export function notesFetchFailed(roomId) {
    return {type: types.NOTES_FETCH_FAILED, roomId}
}

export function saveNote(note) {
    return dispatch => {
        return
    }
}