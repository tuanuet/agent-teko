import {combineReducers} from 'redux';

import rooms from './roomsReducer';
import agent from './agentReducer';
import agents from './agentsReducer';
import currentRoomId from './currentRoomIdReducer';
import tags from './tagsReducer';
import isLoadingMessages from './loadingMessagesReducer'
import subscriptions from './subscriptionsReducer'

let reducer = combineReducers({
    rooms,
    agent,
    agents,
    tags,
    currentRoomId,
    isLoadingMessages,
    subscriptions
});

export default reducer;
