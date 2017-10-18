import {call, put, takeEvery} from 'redux-saga/effects';
import chatApi from '../../api/chatApi';
import * as types from '../../constants/actionTypes';
import * as chatActions from './chatActions';
import * as customerActions from '../RightContainer/action/customerActions';
import * as noteActions from '../RightContainer/action/noteActions';

function* fetchMessages(action) {
    try {
        const messages = yield call(chatApi.messagesFetchRequested, action.room.id);
        yield put(chatActions.messagesFetchSucceed(action.room.id, messages));
        yield put(customerActions.historyChatFetchRequested(action.room.id));
        yield put(noteActions.notesFetchRequested(action.room.id));
    } catch (e) {
        yield put({type: types.MESSAGES_FETCH_FAILED, message: e.message});
    }
}

function* fetchMessagesSaga() {
    yield takeEvery(types.MESSAGES_FETCH_REQUESTED, fetchMessages);
}

//=================FETCH AGENTS=====================

function* fetchAgents(action) {
    try {
        const agents = yield call(chatApi.agentsFetchRequested);
        yield put(chatActions.agentsFetchSucceed(agents));
    } catch (e) {
        yield put({type: types.AGENTS_FETCH_FAILED, message: e.message});
    }
}

function* fetchAgentsSaga() {
    yield takeEvery(types.AGENTS_FETCH_REQUESTED, fetchAgents);
}
//================POST LIST AGENT JOIN ROOM ==============
function* saveAgents(action) {
    try {
        const data = yield call(chatApi.saveSelectListAgent,action.roomId,action.agents);
        if(data.result) {
            yield put(chatActions.onSaveSelectAgentSucceed());
            action.closeModal();
            yield put(chatActions.updateSelectListAgent(action.roomId,action.agents));
            yield put(chatActions.emitSelectListAgent(action.agents))
        } else {
            throw new Error(data.error)
        }

    }catch (err){
        console.log(err.message)
    }
}
function* saveAgentsSaga() {
    yield takeEvery(types.SAVE_LIST_AGENT_JOIN_ROOM,saveAgents)
}
export {
    fetchMessagesSaga,
    fetchAgentsSaga,
    saveAgentsSaga
};
