import {call, put, takeEvery} from 'redux-saga/effects';
import roomApi from '../../api/roomApi';
import * as types from '../../constants/actionTypes';
import * as roomActions from './roomActions';
import _ from 'lodash';

function* fetchRooms() {
    try {
        const rooms = yield call(roomApi.roomsFetchRequested);
        yield put(roomActions.fetchRoomsSucceed(rooms));
        let availableRooms = rooms.filter(room => room.status === 2);
        yield put(roomActions.reJoinAllAvailableRoomsToSocketRequested(availableRooms));
    } catch (e) {
        console.log('Failed', e.message);
        yield put({type: types.ROOMS_FETCH_FAILED, message: e.message});
    }
}

function* fetchListOfTags() {
    try {
        const listOfTags = yield call(roomApi.listOfTagsFetchRequested);
        yield put(roomActions.fetchListOfTagsSucceed(listOfTags));
    } catch (e) {
        console.log('Failed to fetch list of tags', e.message);
        yield put({type: types.LIST_OF_TAGS_FETCH_FAILED, message: e.message});
    }
}

function* fetchRoomsSaga() {
    yield takeEvery(types.ROOMS_FETCH_REQUESTED, fetchRooms);
}

function* fetchListOfTagsSaga() {
    yield takeEvery(types.LIST_OF_TAGS_FETCH_REQUESTED, fetchListOfTags);
}

export {
    fetchRoomsSaga,
    fetchListOfTagsSaga
};