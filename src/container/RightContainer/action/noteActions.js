import * as types from '../../../constants/actionTypes';
import noteApi from '../../../api/noteApi';

export function notesFetchRequested(roomId) {
    return {type: types.NOTES_FETCH_REQUESTED, roomId}
}

export function notesFetchSucceed(roomId, notes) {
    return {type: types.NOTES_FETCH_SUCCEED, roomId, notes}
}

export function notesFetchFailed(roomId) {
    return {type: types.NOTES_FETCH_FAILED, roomId}
}

export function updateNoteSucceed(note) {
    return {type: types.UPDATE_NOTE_SUCCEED, note}
}

export function createNoteSucceed(note) {
    return {type: types.CREATE_NOTE_SUCCEED, note, customerId: note.customerId}
}

export function saveNote(note) {
    return dispatch => {
        return noteApi.saveNote(note)
            .then(response => {
                const newNote = response.data.note;

                note.id ? dispatch(updateNoteSucceed(newNote)):
                    dispatch(createNoteSucceed(newNote));
            }).catch(e => {
                console.log(e);
                throw(e);
            });
    };
}
