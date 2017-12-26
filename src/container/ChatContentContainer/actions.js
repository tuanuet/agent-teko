import axios from 'axios'
import {
    FETCH_MORE_MESSAGES_REQUEST,
    FETCH_MORE_MESSAGES_SUCCEED,
    FETCH_MORE_MESSAGES_FAILED
} from '../../constants/actionTypes'
import { FETCH_MORE_MESSAGES } from '../../constants/apiTypes'
import { firstCallOf_messagesFetchRequested } from '../MiddleContainer/chatActions'

export const fetchMoreMessages = (roomId, currentRoomId, callback = null) => {
    return dispatch => {
        firstCallOf_messagesFetchRequested[currentRoomId] = true
        dispatch({
            type: FETCH_MORE_MESSAGES_REQUEST,
            payload: {
                roomId,
                currentRoomId,
                callback
            }
        })
        return axios.get(`${FETCH_MORE_MESSAGES}?roomId=${roomId}`)
            .then(res => res.data).then(async res => {
                const { messages, nextFetchingRoom } = res
                await dispatch({
                    type: FETCH_MORE_MESSAGES_SUCCEED,
                    currentRoomId,
                    messages,
                    nextFetchingRoom
                })
                if (typeof (callback) === 'function') callback()
                return Promise.resolve(res)
            }).catch(err => {
                dispatch({ type: FETCH_MORE_MESSAGES_FAILED, message: err.message })
                return Promise.reject(err)
            })
    }
}
