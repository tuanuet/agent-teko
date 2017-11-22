import {
    FETCH_MORE_MESSAGES_REQUEST
} from '../../constants/actionTypes'
import { firstCallOf_messagesFetchRequested } from '../MiddleContainer/chatActions'

export const fetchMoreMessages = (roomId, currentRoomId) => {
    firstCallOf_messagesFetchRequested[currentRoomId] = true
    return {
        type: FETCH_MORE_MESSAGES_REQUEST,
        payload: {
            roomId,
            currentRoomId
        }
    }
}
