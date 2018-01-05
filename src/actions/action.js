import * as types from '../constants/actionTypes';

export function f5(status) {
    return {
        type: types.F5,
        isF5: status
    };
}

export function addMessage({typeSender, sender, message, time}) {
    return {
        type: types.ADD_MESSAGE,
        message: {typeSender, sender, message, time}
    };
}

export function updateMessageMetadata(content, title, description, image) {
    return {
        type: types.UPDATE_MESSAGE_METADATA,
        metadata: {content, title, description, image}
    };
}



/**
 * Init state for agent
 * @returns {{type}}
 */
export function agentRequested() {
    return {
        type: types.AGENT_INFO_FETCH_REQUESTED
    };
}
export function agentSucceed(agent, subscriptions) {
    return {
        type: types.AGENT_INFO_FETCH_SUCCEED,
        agent, subscriptions
    };
}
export function agentFailure() {
    return {
        type: types.AGENT_INFO_FETCH_FAILED,
    };
}

export function sendRating({ratingValue, feedback = ''}) {
    return {
        type: types.SEND_RATING,
        rating: {
            ratingValue,
            feedback
        }
    };
}

export function addAvailableRoom(room) {
    return {
        type : types.ADD_ROOM_AVAILABLE,
        room
    };
}
export function addEnableRoom(room) {
    return {
        type : types.ADD_ROOM_ENABLE,
        room
    };
}

export function addMessageForRoom(roomId, message) {
    return {
        type : types.ADD_MESSAGE_FOR_ROOM,
        message,
        roomId
    };
}

export function clientSendMessage(message) {
    return {
        type : types.CLIENT_SEND_MESSAGE,
        message
    };
}

//function about replies
export function addQuickReply(replyContent) {

    return {
        type: types.ADD_QUICK_REPLY_REQUESTED,
        replyContent
    }
}

export function deleteQuickReply(replyId) {
    return {
        type: types.DELETE_QUICK_REPLY_REQUESTED,
        replyId
    }
}

export function updateQuickReply(replyId, replyContent) {
    return {
        type: types.UPDATE_QUICK_REPLY_REQUESTED,
        replyId,
        replyContent
    }
}
