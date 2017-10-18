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
                    console.log('rejoin room failed');
                    store.dispatch(roomActions.reJoinRoomToSocketFailed(action.rooms));
                }
                else {
                    console.log('re join room succeed');
                        // store.dispatch(roomActions.reJoinRoomToSocketSucceed(room));
                }
            });
        } else if (socket && action.type === types.CLIENT_SEND_MESSAGE){
            socket.emit('client-send-message',action.message,function (isReceived) {
                console.log(`admin send message and server receive ${isReceived}`);
            });
        } else if (socket && action.type === types.RESET_NUM_OF_UNREAD_MESSAGE) {
            socket.emit('reset-number-of-unread-messages', action.room.id, ack => {
            });
        } else if (socket && action.type === types.EMIT_SELECT_LIST_AGENT){
            let data = {
                agentIds : action.agentIds,
                roomId : action.roomId
            };
            socket.emit('agent-select-other-agents',data,ack => {
                console.log('agent-select-other-agents',ack)
            })
        }
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
        numOfUnReadMessages: 1,
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
            customerPhone : data.customer.customerPhone,
            fbId : data.customer.fbId,
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
        console.log('RoomFromServerEmit:',room);
        store.dispatch(addAvailableRoom(room));

    });

    socket.on('server-send-message', (msg) => {
        let roomId = parseInt(msg.roomId);
        let message = getMessageFromServer(msg);
        store.dispatch(addMessageForRoom(roomId, message));

        //if current room id is different from roomId then update number of unread messages
        console.log('server send message', store.getState().currentRoomId, roomId);
        if (store.getState().currentRoomId !== roomId) {
            store.dispatch(roomActions.updateNumberOfUnreadMessages(roomId));
        }
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
