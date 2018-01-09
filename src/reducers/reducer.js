import {combineReducers} from 'redux'

import rooms from './roomsReducer'
import agent from './agentReducer'
import agents from './agentsReducer'
import currentRoomId from './currentRoomIdReducer'
import tags from './tagsReducer'
import isLoadingMessages from './loadingMessagesReducer'
import isLoadingRooms from './loadingRoomsReducer'
import subscriptions from './subscriptionsReducer'
import order from './orderReducer'

let reducer = combineReducers({
    rooms,
    agent,
    agents,
    tags,
    currentRoomId,
    isLoadingMessages,
    isLoadingRooms,
    subscriptions,
    order
})

export default reducer
