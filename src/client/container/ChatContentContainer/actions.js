import {
    FETCH_MORE_MESSAGES_REQUEST
} from '../../constants/actionTypes'

export function fetchMoreMessages(roomId, currentRoomId) {
    return {
        type: FETCH_MORE_MESSAGES_REQUEST,
        payload: {
            roomId,
            currentRoomId
        }
    }
}
