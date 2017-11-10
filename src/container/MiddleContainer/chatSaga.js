import {call, put, takeEvery} from 'redux-saga/effects';
import chatApi from '../../api/chatApi';
import * as types from '../../constants/actionTypes';
import * as chatActions from './chatActions';
import * as customerActions from '../RightContainer/action/customerActions';
import * as noteActions from '../RightContainer/action/noteActions';

function* fetchMessages(action) {
    try {
        const messages = yield call(chatApi.messagesFetchRequested, action.room.roomId);
        yield put(chatActions.messagesFetchSucceed(action.room.roomId, messages));
        yield put(noteActions.notesFetchRequested(action.room.roomId));
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
        console.log('saveAgents:',action);
        const data = yield call(chatApi.saveSelectListAgent,action.room.id,action.agents);
        console.log('saveAgentsData:',data);
        if(data.result) {
            yield put(chatActions.onSaveSelectAgentSucceed());
            yield action.closeModal();
            yield put(chatActions.updateSelectListAgent(action.room.id,action.agents));
            yield put(chatActions.emitSelectListAgent(action.agents,action.room))
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

//================ SET STATUS OF ROOM ==============
function* setStatusOfRoom(action) {
    try {
        const data = yield call(chatApi.setStatusOfRoom,action.roomId,action.status);
        if(data.result) {
            yield put(chatActions.setStatusOfRoomSucceed(action.roomId,action.status));
            yield put(chatActions.broadcastCloseRoomToOtherAgents(action.roomId));
        } else {
            throw new Error(data.error)
        }

    }catch (err){
        console.log("err when un follow room",err.message)
    }
}
function* setStatusOfRoomSaga() {
    yield takeEvery(types.SET_STATUS_OF_ROOM_REQUESTED,setStatusOfRoom)
}

//================ SET TAG OF ROOM ==============
function* saveTagOfCustomer(action) {
    try {
        const data = yield call(chatApi.saveTagOfCustomer,action.customerId, action.tagId)
        if (data.result) {
            yield put(chatActions.saveTagOfCustomerSucceed(action.customerId, action.tagId))
        } else {
            throw new Error()
        }

    }catch (err) {
        console.log("err when save tag of room",err.message)
    }
}
function* saveTagOfCustomerSaga() {
    yield takeEvery(types.SAVE_TAG_OF_CUSTOMER_REQUESTED, saveTagOfCustomer)
}

//================ DELETE TAG OF ROOM ==============
function* deleteTagOfCustomer(action) {
    try {
        const data = yield call(chatApi.deleteTagOfCustomer,action.roomId,action.tagId);
        if(data.result) {
            yield put(chatActions.deleteTagOfCustomerSucceed(action.roomId,action.tagId));
        } else {
            console.log('wolaaa');
            throw new Error(data.error)
        }

    }catch (err){
        console.log("err when delete tag of room",err)
    }
}
function* deleteTagOfCustomerSaga() {
    yield takeEvery(types.DELETE_TAG_OF_CUSTOMER_REQUESTED,deleteTagOfCustomer)
}


export {
    fetchMessagesSaga,
    fetchAgentsSaga,
    saveAgentsSaga,
    setStatusOfRoomSaga,
    saveTagOfCustomerSaga,
    deleteTagOfCustomerSaga
};