import {combineReducers} from 'redux';

import rooms from './roomReducer';

let reducer = combineReducers({
    rooms
});

export default reducer;