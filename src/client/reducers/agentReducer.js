import initialState from './initialState';
import * as types from '../constants/actionTypes';

export default function agentReducer(state=initialState.agent, action) {
    switch (action.type) {

        //case of choosing a agent
        case types.AGENT_INFO_FETCH_SUCCEED:
            return action.agent;

        // default case, return current state
        default:
            return state;
    }
}