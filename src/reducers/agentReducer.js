import initialState from './initialState';
import * as types from '../constants/actionTypes';

export default function agentReducer(state=initialState.agent, action) {
    switch (action.type) {

        //case of choosing a agent
        case types.AGENT_INFO_FETCH_SUCCEED:
            return action.agent;

        //add new quick reply successfully
        case types.ADD_QUICK_REPLY_SUCCEED:
            return {...state, replies: [...state.replies, action.reply]}

        case types.DELETE_QUICK_REPLY_SUCCEED:
            return {...state, replies: state.replies.filter(reply => parseInt(reply.id) !== parseInt(action.replyId))}

        case types.UPDATE_QUICK_REPLY_SUCCEED:

            return {...state, replies: state.replies.map(reply => {
                console.log(parseInt(reply.id) !== parseInt(action.reply.id));
                if (parseInt(reply.id) !== parseInt(action.reply.id) ) {
                    return reply;
                }
                return action.reply;

            })};

        // default case, return current state
        default:
            return state;


    }

}