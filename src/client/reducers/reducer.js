import {combineReducers} from 'redux';

import rooms from './roomReducer';
import agent from './agentReducer';
import agents from './agentsReducer';
import currentRoomId from './currentRoomIdReducer';
import listOfTags from './listOfTagsReducer';

let reducer = combineReducers({
    rooms,
    agent,
    agents,
    currentRoomId,
    listOfTags
});

export default reducer;