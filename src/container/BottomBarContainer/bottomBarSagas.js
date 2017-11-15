import {call, put, takeEvery} from 'redux-saga/effects';
import { uploadImageFailure,uploadImageSuccess} from './actions';
import chatApi from '../../api/chatApi';
import * as actionTypes from './constants'
import * as actions from '../../actions/action';

function* handleUploadImage(action) {
    try {
        const result = yield call(chatApi.postImage, action.form);
        yield put(uploadImageSuccess(result));


        console.log('result:',result);

        const msgToServer = {
            ...action.msgToServer,
            messageType: result.type,
            fileName: result.name,
            content: result.content
        }

        yield put(actions.addMessageForRoom(action.msgToServer.roomId, msgToServer));
        yield put(actions.clientSendMessage(msgToServer));
    } catch (err) {
        yield put(uploadImageFailure(err.message));
    }
}

function* uploadImageSaga() {
    yield takeEvery(actionTypes.UPLOAD_IMAGE, handleUploadImage);
}

export {
    uploadImageSaga
};
