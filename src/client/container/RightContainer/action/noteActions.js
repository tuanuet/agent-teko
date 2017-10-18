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
    console.log(note);
    return {type: types.CREATE_NOTE_SUCCEED, note, roomId: note.roomId}
}

export function saveNote(note) {
    return dispatch => {
        return noteApi.saveNote(note)
            .then(response => {
                let savedNote = response.data.savedNote;
                console.log("saved note", savedNote);
                note.id ? dispatch(updateNoteSucceed(savedNote)):
                    dispatch(createNoteSucceed(savedNote));
            }).catch(e => {
                console.log(e);
                throw(e);
            });
    };
}