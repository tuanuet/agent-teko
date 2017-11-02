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

export function sendRequestUserRating(roomId) {
    return {type: types.SEND_REQUEST_USER_RATING, roomId}
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

export function agentsFetchRequested() {
    return {type: types.AGENTS_FETCH_REQUESTED}
}

export function updateSelectListAgent(roomId, agentIds) {
    return {type : types.UPDATE_SELECT_LIST_AGENT,roomId,agentIds}
}

export function emitSelectListAgent(agentIds,room) {
    return {
        type : types.EMIT_SELECT_LIST_AGENT,agentIds,room
    }
}

export function saveSelectAgent(room,agents,closeModal) {
    return {type :types.SAVE_LIST_AGENT_JOIN_ROOM,room,agents,closeModal}
}

export function onSaveSelectAgentSucceed() {
    return {type :types.SAVE_LIST_AGENT_JOIN_ROOM_SUCCEED}
}

export function setTagOfRoomRequested(roomId, tagId, onSetTagStateOfRoom) {
    return {type: types.SET_TAG_OF_ROOM_REQUESTED, roomId, tagId, onSetTagStateOfRoom}
}

export function setTagOfRoomSucceed(roomId, tagId) {
    return {type: types.SET_TAG_OF_ROOM_SUCCEED, roomId, tagId}
}
