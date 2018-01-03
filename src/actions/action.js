import * as Types from '../constants/actionTypes';

export function f5(status) {
    return {
        type: Types.F5,
        isF5: status
    };
}

export function addMessage({typeSender, sender, message, time}) {
    return {
        type: Types.ADD_MESSAGE,
        message: {typeSender, sender, message, time}
    };
}

export function updateMessageMetadata(content, title, description, image) {
    return {
        type: Types.UPDATE_MESSAGE_METADATA,
        metadata: {content, title, description, image}
    };
}



/**
 * Init state for agent
 * @returns {{type}}
 */
export function agentRequested() {
    return {
        type: Types.AGENT_INFO_FETCH_REQUESTED
    };
}
export function agentSucceed(agent, subscriptions) {
    return {
        type: Types.AGENT_INFO_FETCH_SUCCEED,
        agent, subscriptions
    };
}
export function agentFailure() {
    return {
        type: Types.AGENT_INFO_FETCH_FAILED,
    };
}

export function sendRating({ratingValue, feedback = ''}) {
    return {
        type: Types.SEND_RATING,
        rating: {
            ratingValue,
            feedback
        }
    };
}

export function addAvailableRoom(room) {
    return {
        type : Types.ADD_ROOM_AVAILABLE,
        room
    };
}
export function addEnableRoom(room) {
    return {
        type : Types.ADD_ROOM_ENABLE,
        room
    };
}

export function addMessageForRoom(roomId, message) {
    return {
        type : Types.ADD_MESSAGE_FOR_ROOM,
        message,
        roomId
    };
}

export function clientSendMessage(message) {
    return {
        type : Types.CLIENT_SEND_MESSAGE,
        message
    };
}

//function about replies
export function addQuickReply(replyContent) {

    return {
        type: Types.ADD_QUICK_REPLY_REQUESTED,
        replyContent
    }
}

export function deleteQuickReply(replyId) {
    return {
        type: Types.DELETE_QUICK_REPLY_REQUESTED,
        replyId
    }
}

export function updateQuickReply(replyId, replyContent) {
    return {
        type: Types.UPDATE_QUICK_REPLY_REQUESTED,
        replyId,
        replyContent
    }
}