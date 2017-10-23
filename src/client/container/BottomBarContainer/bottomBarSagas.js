import {call, put, takeEvery} from 'redux-saga/effects';
import { uploadImageFailure,uploadImageSuccess} from './actions';
import chatApi from '../../api/chatApi';
import * as actionTypes from './constants'
import * as actions from '../../actions/action';
// state{
//     id : null,
//         senderId: message.senderId,
//     messageType: message.type,
//     messageFrom: message.messageFrom,
//     checkedMetaLink: false,
//     senderName: message.name,
//     content: message.message.content,
//     name: message.fileName,
//     createdAt : message.createdAt
// };

//server
// {
//     message: {content},
//     roomId,
//         senderId,
//         name,
//         customers,
//         type: roomType,
//     messageType : 100,
//     messageFrom: 0,
//     createdAt:new Date().toLocaleString()
// };
function* handleUploadImage(action) {
    try {
        const result = yield call(chatApi.postImage,action.form);
        yield put(uploadImageSuccess(result));
        //todo : show upload success

        console.log('result:',result);
        //add to state
        let msgToState =
            {
                ...action.msgToState,
                ...{
                    messageType : result.type,
                    name : result.name,
                    content : result.content
                }
            };
        yield put(actions.addMessageForRoom(action.msgToServer.roomId,msgToState));
        //send socket
        let msgToServer =
            {
                ...action.msgToServer,
                ...{
                    messageType : result.type,
                    name : result.name,
                    message : {content : result.content}
                }
            };

        console.log('msgToServer',msgToServer);
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