import * as types from '../../constants/actionTypes';

export function messagesFetchRequested(roomId) {
    return {type: types.MESSAGES_FETCH_REQUESTED, roomId}
}

export function messagesFetchSucceed(roomId, messages) {
    console.log(roomId, messages);
    return {type: types.MESSAGES_FETCH_SUCCEED, roomId, messages}
}