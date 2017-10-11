import {call, put, takeEvery} from 'redux-saga/effects';
import roomApi from '../../api/roomApi';
import * as types from '../../constants/actionTypes';
import * as roomActions from './roomActions';


function* fetchRooms() {
    try {
        const rooms = yield call(roomApi.roomsFetchRequested);
        yield put(roomActions.fetchRoomsSucceed(rooms));
    } catch (e) {
        console.log('Failed', e.message);
        yield put({type: types.ROOMS_FETCH_FAILED, message: e.message});
    }
}

function* fetchRoomsSaga() {
    yield takeEvery(types.ROOMS_FETCH_REQUESTED, fetchRooms);
}

export default fetchRoomsSaga;