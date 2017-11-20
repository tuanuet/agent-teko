import {combineReducers} from 'redux';

import rooms from './roomReducer';
import agent from './agentReducer';
import agents from './agentsReducer';
import currentRoomId from './currentRoomIdReducer';
import tags from './tagsReducer';
import isLoadingMessages from './loadingMessagesReducer'

let reducer = combineReducers({
    rooms,
    agent,
    agents,
    tags,
    currentRoomId,
    isLoadingMessages
});

export default reducer;
