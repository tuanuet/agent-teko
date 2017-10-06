import {combineReducers} from 'redux';

import rooms from './roomReducer';
import agent from './agentReducer';
import currentRoomId from './currentRoomIdReducer';

let reducer = combineReducers({
    rooms,
    agent,
    currentRoomId
});

export default reducer;