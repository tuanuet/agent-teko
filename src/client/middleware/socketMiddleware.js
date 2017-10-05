import io from 'socket.io-client';

import axios from 'axios';

let socket = null;

let store = null;

export function socketMiddleware() {
    return next => (action) => {
        const result = next(action);

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



export default async function(Store) {
    store = Store;
    socket = io('http://localhost:3000');
    let adminId = await axios.get('http://local.chat.com/api/get-admin-id').then(res => res.data);
    socket.emit('admin-join-default-room',{adminId: adminId}, function (ack) {

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

    // socket.on('server-send-auto-assigned-room', data => {
    //     let room = {
    //         id: data.roomId,
    //         topicName: data.topic,
    //         customerName: data.customerName,
    //         createdAt: data.createdAt,
    //         roomType: data.roomType,
    //         customerId: data.customerId,
    //         status: 2
    //     };
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
