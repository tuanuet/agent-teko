import {combineReducers} from 'redux';

import rooms from './roomReducer';
import agent from './agentReducer';
import agents from './agentsReducer';
import currentRoomId from './currentRoomIdReducer';

let reducer = combineReducers({
    rooms,
    agent,
    agents,
    currentRoomId
});

export default reducer;