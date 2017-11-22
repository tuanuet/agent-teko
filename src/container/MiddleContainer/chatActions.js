import * as types from '../../constants/actionTypes';

let firstCallOf_messagesFetchRequested = []

export { firstCallOf_messagesFetchRequested }

export function messagesFetchRequested(room) {
    if (firstCallOf_messagesFetchRequested[room.roomId] == undefined) {
        firstCallOf_messagesFetchRequested[room.roomId] = true;
        return {type: types.MESSAGES_FETCH_REQUESTED, room}
    } else {
        return {type: "NOTHING_TO_DO"};
    }
}

export function sendRequestUserRating(roomId) {
    return {type: types.SEND_REQUEST_USER_RATING, roomId}
}

export function messagesFetchSucceed(roomId, messages, nextFetchingRoom) {
    return {type: types.MESSAGES_FETCH_SUCCEED, roomId, messages, nextFetchingRoom}
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

export function emitSelectListAgent(agentIds, roomId) {
    return {
        type : types.EMIT_SELECT_LIST_AGENT, agentIds, roomId
    }
}

export function saveSelectAgent(roomId, agents, closeModal) {
    return {type :types.SAVE_LIST_AGENT_JOIN_ROOM, roomId, agents, closeModal}
}

export function onSaveSelectAgentSucceed() {
    return {type :types.SAVE_LIST_AGENT_JOIN_ROOM_SUCCEED}
}

export function unFollowRoom(roomId, status) {
    return {type: types.SET_STATUS_OF_ROOM_REQUESTED, roomId, status}
}

export function setStatusOfRoomSucceed(roomId, status) {
    return {type: types.SET_STATUS_OF_ROOM_SUCCEED, roomId, status}
}

export function broadcastCloseRoomToOtherAgents(roomId) {
    return {type: types.BROADCAST_CLOSE_ROOM_TO_OTHER_AGENT, roomId}
}

export function saveTagOfCustomerRequested(customerId, tag) {
    return {type: types.SAVE_TAG_OF_CUSTOMER_REQUESTED, customerId, tag};
}

export function saveTagOfCustomerSucceed(customerId, tag) {
    return {type: types.SAVE_TAG_OF_CUSTOMER_SUCCEED, customerId, tag};
}

export function deleteTagOfCustomerRequested(customerId, tagId) {
    return {type: types.DELETE_TAG_OF_CUSTOMER_REQUESTED, customerId, tagId};
}

export function deleteTagOfCustomerSucceed(customerId, tagId) {
    return {type: types.DELETE_TAG_OF_CUSTOMER_SUCCEED, customerId, tagId};
}
