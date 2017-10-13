import * as types from '../../constants/actionTypes';

var firstCallOf_messagesFetchRequested = [];

export function messagesFetchRequested(room) {
    if (firstCallOf_messagesFetchRequested[room.id] == undefined) {
        firstCallOf_messagesFetchRequested[room.id] = 1;
        return {type: types.MESSAGES_FETCH_REQUESTED, room}
    } else {
        return {type: "NOTHING_TO_DO"};
    }
}

export function messagesFetchSucceed(roomId, messages) {
    return {type: types.MESSAGES_FETCH_SUCCEED, roomId, messages}
}

export function joinRoomToSocketSucceed(room) {
    return {type: types.JOIN_ROOM_TO_SOCKET_SUCCEED, room}
}

export function agentsFetchSucceed(agents) {
    return {type : types.AGENTS_FETCH_SUCCEED,agents}
}