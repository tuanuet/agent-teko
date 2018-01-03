import initialState from './initialState'
import * as types from '../constants/actionTypes'

export default (state=initialState.isLoadingMessage, action) => {
    switch (action.type) {
        case types.FETCH_MORE_MESSAGES_REQUEST:
            return true
        case types.FETCH_MORE_MESSAGES_SUCCEED:
            return false
        default:
            return state
    }
}
