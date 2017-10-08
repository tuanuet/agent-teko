import {call, put, takeEvery} from 'redux-saga/effects';
import noteApi from '../../../api/noteApi';
import * as types from '../../../constants/actionTypes';
import * as noteActions from '../action/noteActions'

function* fetchNotes(action) {
    try {
        const notes = yield call(noteApi.notesFetchRequested, action.roomId);
        yield put(noteActions.notesFetchSucceed(action.roomId, notes));
    } catch (e) {
        console.log("fetch note failed", e);
        yield put({type: types.HISTORY_CHAT_FETCH_FAILED, message: e.message});
    }
}

function* fetchNotesSaga() {
    yield takeEvery(types.NOTES_FETCH_REQUESTED, fetchNotes);
}

export default fetchNotesSaga;