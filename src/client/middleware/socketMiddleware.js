import io from 'socket.io-client';
import * as types from '../constants/actionTypes';
import axios from 'axios';
import * as chatActions from '../container/MiddleContainer/chatActions';
import * as roomActions from '../container/LeftContainer/roomActions';
import _ from 'lodash';
import {
    addAvailableRoom,
    addEnableRoom,
    agentFailure,
    agentRequested,
    agentSucceed,
    addMessageForRoom,
} from '../actions/action';

let socket = null;

let store = null;

export function socketMiddleware() {
    return next => (action) => {
        const result = next(action);
        if (socket && action.type === types.JOIN_ROOM_TO_PHP_SERVER_SUCCEED) {
            socket.emit('admin-join-room', action.room, function (ackValidation) {
                if (!ackValidation) return;
                store.dispatch(chatActions.joinRoomToSocketSucceed(action.room));
            });
        } else if (socket && action.type === types.RE_JOIN_ALL_AVAILABLE_ROOM_TO_SOCKET_REQUESTED) {
                socket.emit('admin-re-join-room', action.rooms, function (ackValidation) {
                    if (!ackValidation) {
                        console.log(`rejoin room failed`);
                        store.dispatch(roomActions.reJoinRoomToSocketFailed(action.rooms))
                    }
                    else {
                        console.log(`re join room succeed`);
                        // store.dispatch(roomActions.reJoinRoomToSocketSucceed(room));
                    }
            });
        }

        // if (socket && action.type === types.ADMIN_SEND_MESSAGE) {
        //     socket.emit('client-send-message', action.message, function (data) {
        //         let message = {
        //             id: data.messageId,
        //             senderId: data.senderId,
        //             senderName: data.name,
        //             message: {
        //                 content: data.message,
        //                 type: data.type,
        //                 name: data.fileName
        //             },
        //             metaLink: false,
        //             createdAt: data.createdAt
        //         };
        //         addNewMessage(message, action.message.roomId);
        //     });
        // } else if (socket && action.type === types.ADMIN_SEND_REQUEST_SOCKET) {
        //     socket.emit('admin-join-room', action.room,function (ackValidation) {
        //         if (!ackValidation) return;
        //         Store.dispatch(roomActions.adminJoinRoomSuccess(action.room));
        //     });
        // } else if (socket && action.type === types.ADMIN_RE_JOIN_ROOM) {
        //     socket.emit('admin-join-room', action.room, ackValidation => {
        //         if (!ackValidation) return;
        //         Store.dispatch(tabActions.createTab(action.room));
        //         Store.dispatch(tabActions.changeTab(action.room.id));
        //         Store.dispatch(messageActions.loadMessages(action.room.id));
        //     });
        // } else if (socket && action.type === types.ADMIN_SEND_RATING) {
        //     socket.emit('admin-send-action-rating', action.room.id);
        // }

        return result;
    };
}

// no use saga
let initAgent = (Store) => {
    store = Store;
    store.dispatch(agentRequested());
    return axios.get('http://local.chat.com/api/get-admin-info')
        .then(res => res.data)
        .then(agent => {
            store.dispatch(agentSucceed(agent));
            return agent;
        })
        .catch(err => store.dispatch(agentFailure()));
};

function getRoomFromServer(data) {
    return {
        id : data.id,
        topicName : data.topicName,
        roomType : data.roomType,
        status : data.status,
        createdAt : data.createdAt,
        messages : [{
            id: 1,
            senderId: 1,
            messageType: 100,
            messageFrom: 0,
            checkedMetaLink: false,
            senderName: 'room1',
            content: 'hello room 1',
            name: 'Attachment file',
        }],
        notes : [],
        customers : [{
            id : data.customer.id,
            customerName : data.customer.customerName,
            customerEmail : data.customer.customerEmail,
            customerPhone : data.customer.customerPhone
        }]
    };
}

function getMessageFromServer(message) {
    return {
        id : message.id,
        senderId: message.senderId,
        messageType: message.type,
        messageFrom: message.messageFrom,
        checkedMetaLink: false,
        senderName: message.name,
        content: message.message,
        name: message.fileName,
        createdAt : message.createdAt
    };
}
export default function(store) {


    socket = io('http://localhost:3000/chat');

    initAgent(store).then((agent) => {
        // join default room
        socket.emit('admin-join-default-room', {adminId: agent.id}, function (ack) {
            console.log('admin join room default ', ack);
        });
    });

    // socket.on('server-send-join-room', ({success}) => console.log(`join room ${success}`));
    socket.on('server-send-room-enable',data => {
        let room = getRoomFromServer(data);
        store.dispatch(addEnableRoom(room));
    });

    socket.on('server-send-auto-assigned-room', data => {
        let room = getRoomFromServer(data);
        store.dispatch(addAvailableRoom(room));

    });

    socket.on('server-send-message', (msg) => {
        let roomId = msg.roomId;
        let message = getMessageFromServer(msg);
        console.log(message);
        store.dispatch(addMessageForRoom(roomId,message));
    });


    // socket.on('server-send-message', data => {
    //     let message = {
    //         id: data.messageId,
    //         senderId: data.senderId,
    //         senderName: data.name,
    //         message: {
    //             content: data.message,
    //             type: data.type
    //         },
    //         metaLink: false,
    //         createdAt: data.createdAt
    //     };
    //
    //     addNewMessage(message, data.roomId);
    // });

    // socket.on('server-send-inactive-room', function (data) {
    //     console.log("room moi", data);
    //     let room = {
    //         id: data.roomId,
    //         topicName: data.topic,
    //         customerName: data.customerName,
    //         createdAt: data.createdAt,
    //         roomType: data.roomType,
    //         status: 1
    //     };
    //
    //     store.dispatch(roomActions.addNewRoom(room));
    // });


    //
    //     store.dispatch(roomActions.addNewRoom(room));
    //
    //     store.dispatch(tabActions.createTab(room));
    //     if (store.getState().activeTabId == 0) {
    //         store.dispatch(tabActions.changeTab(room.id))
    //     }
    //
    //     store.dispatch(messageActions.loadMessages(room.id));
    // });

    // socket.on('client-close-room', function (roomId) {
    //
    //     let message = {
    //         message: {
    //             content: "Customer has just left the room.\nPlease give the tag of the room.",
    //             type: 900
    //         },
    //         roomType: 'default',
    //         senderId: 0,
    //         name: "Admin",
    //         roomId: roomId,
    //         customerId: 0,
    //         createdAt: new Date().toLocaleString()
    //     };
    //     store.dispatch(tabActions.changeStatusOfTabToClosed(roomId));
    //     store.dispatch(messageActions.adminSendMessage(message));
    // });

}
