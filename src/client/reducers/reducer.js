import {combineReducers} from 'redux';

import rooms from './roomReducer';
import currentRoomId from './currentRoomIdReducer';

let reducer = combineReducers({
    rooms,
    currentRoomId
});

export default reducer;