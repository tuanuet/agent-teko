import * as types from '../../../constants/actionTypes'
import * as apiTypes from '../../../constants/apiTypes'
import axios from 'axios'

export function historyChatFetchRequested(roomId) {
    return {type: types.HISTORY_CHAT_FETCH_REQUESTED, roomId}
}

export function historyChatFetchSucceed(roomId, customers) {
    return {type: types.HISTORY_CHAT_FETCH_SUCCEED, roomId, customers}
}

export const updatePhoneNumber = (customerId, newPhoneNumber) => {
    return dispatch => {
        return axios.post(apiTypes.UPDATE_CUSTOMER_INFO, {
            customerId,
            newPhoneNumber
        }).then(res => res.data)
        .then(res => {
            dispatch({ type: types.UPDATE_CUSTOMER_INFO_SUCCEED, customerId, newPhoneNumber })
        })
    }
}
