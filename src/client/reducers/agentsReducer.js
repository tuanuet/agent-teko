import initialState from './initialState';
import * as types from '../constants/actionTypes';

export default function agentReducer(state=initialState.agents, action) {
    switch (action.type) {

        //set a agents
        case types.AGENTS_FETCH_SUCCEED:
            return action.agents;

        // default case, return current state
        default:
            return state;
    }
}