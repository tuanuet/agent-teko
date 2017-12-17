import initialState from './initialState'
import * as types from '../constants/actionTypes'

export default (state = initialState.isLoadingRooms, action) => {
    switch (action.type) {
        case types.ROOMS_FETCH_REQUEST:
            return true
        case types.ROOMS_FETCH_SUCCEED:
            return false
        default:
            return state
    }
}
