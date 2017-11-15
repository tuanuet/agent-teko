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

export function updateNoteSucceed(noteId, content) {
    return {type: types.UPDATE_NOTE_SUCCEED, noteId, content}
}

export function createNoteSucceed(note) {
    return {type: types.CREATE_NOTE_SUCCEED, note, customerId: note.customerId}
}

export function saveNote(note) {
    return dispatch => {
        return noteApi.saveNote(note)
            .then(response => {
                const newNote = response.data.note;
                dispatch(createNoteSucceed(newNote));
            }).catch(e => {
                console.log(e);
                throw(e);
            });
    };
}

export const updateNote = (noteId, content) => {
    return dispatch => {
        return noteApi.updateNote(noteId, content).then(res => {
            if (res.data.result) {
                dispatch(updateNoteSucceed(noteId, content))
            } else {
                alert(`Có lỗi xảy ra khi cập nhật ghi chú. Vui lòng thử lại sau`)
            }
        }).catch(e => {
            console.log(e);
            alert(`Có lỗi xảy ra khi cập nhật ghi chú. Vui lòng thử lại sau`)
        })
    }
}

export function deleteNoteSucceed(noteId) {
    return {
        type: types.DELETE_NOTE_SUCCEED,
        noteId
    }
}

export function deleteNote(noteId) {
    return dispatch => {
        return noteApi.deleteNote(noteId).then(res => res.data).then(res => {
            if (res.result) {
                dispatch(deleteNoteSucceed(noteId))
            } else {
                alert(`Có lỗi xảy ra khi xóa Note. Vui lòng thử lại sau`)
            }
        }).catch(e => {
            console.log(e)
        })
    }
}
