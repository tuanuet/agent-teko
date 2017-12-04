import initialState from './initialState'
import * as types from '../constants/actionTypes'

export default (state = initialState.subscriptions, action) => {
    switch (action.type) {
        case types.AGENT_INFO_FETCH_SUCCEED:
            return action.subscriptions
        case types.ADD_NEW_SUBSCRIPTION:
            return [action.newSub, ...state]
        case types.MARK_SUBSCRIPTIONS_AS_READ:
            return state.map(sub => ({...sub, markAsRead: true}))
        default:
            return state
    }
}
