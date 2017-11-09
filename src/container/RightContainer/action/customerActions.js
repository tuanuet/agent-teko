import * as types from '../../../constants/actionTypes';

export function historyChatFetchRequested(roomId) {
    return {type: types.HISTORY_CHAT_FETCH_REQUESTED, roomId}
}

export function historyChatFetchSucceed(roomId, customers) {
    return {type: types.HISTORY_CHAT_FETCH_SUCCEED, roomId, customers}
}