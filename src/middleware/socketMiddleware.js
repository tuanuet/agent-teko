import io from 'socket.io-client'
import * as types from '../constants/actionTypes'
import { API_URL, NODE_URL } from '../constants/Server'
import axios from 'axios'
import * as chatActions from '../container/MiddleContainer/chatActions'
import * as roomActions from '../container/LeftContainer/roomActions'
import _ from 'lodash'
import {
    addAvailableRoom,
    addEnableRoom,
    agentFailure,
    agentRequested,
    agentSucceed,
    addMessageForRoom,
} from '../actions/action'

let socket = null
import store from '../store/store'

export function socketMiddleware() {
    return next => (action) => {
        const result = next(action)
        if (socket && action.type === types.JOIN_ROOM_TO_NODE_SERVER) {
            socket.emit('admin-join-room', action.room.roomId, (ack, newRoom) => {
                // TODO: handle error notify
                if (!ack) return
                store.dispatch({type: types.JOIN_ROOM_SUCCEED, room: newRoom})
            })
        } else if (socket && action.type === types.RE_JOIN_ALL_AVAILABLE_ROOM_TO_SOCKET_REQUESTED) {
            socket.emit('admin-re-join-room', action.rooms, ack => {
                if (!ack) {
                    console.log('Rejoin all available socket failed')
                    store.dispatch(roomActions.reJoinRoomToSocketFailed(action.rooms))
                } else {
                    console.log('Rejoin all available socket success')
                }
            })
        } else if (socket && action.type === types.CLIENT_SEND_MESSAGE){
            socket.emit('client-send-message', action.message, function (isReceived) {
                console.log(`Admin send message and server receive ${isReceived}`)
            })
        } else if (socket && action.type === types.RESET_NUM_OF_UNREAD_MESSAGE) {
            socket.emit('reset-number-of-unread-messages', action.room.roomId, ack => {
            })
        } else if (socket && action.type === types.EMIT_SELECT_LIST_AGENT) {
            const data = {
                agentIds : action.agentIds,
                roomId: action.roomId
            }
            socket.emit('agent-select-other-agents', data, ack => {
                console.log('Agent finish request other agents to join rooms', ack)
            })
        } else if (socket && action.type === types.SEND_REQUEST_USER_RATING) {
            socket.emit('admin-send-action-rating', action.roomId, ack => {

            })
        } else if (socket && action.type === types.BROADCAST_CLOSE_ROOM_TO_OTHER_AGENT) {
            socket.emit('admin-close-room', action.roomId, ack => {

            })
        }
        return result
    }
}

const initAgent = store => {
    store.dispatch(agentRequested())
    return axios.get(`${API_URL}/api/fetch-admin-info`)
        .then(res => res.data)
        .then(agent => {
            store.dispatch(agentSucceed(agent))
            return agent
        }).catch(err => store.dispatch(agentFailure()))
}

function getRoomFromServer(dataEmit) {
    console.log('Rooms data from server', dataEmit)
    const { roomId, roomStatus, roomType, roomInfo, topic, customer, agents, tags, notes, createdAt } = dataEmit

    return {
        roomId,
        roomStatus,
        roomType,
        roomInfo,
        topic,
        customer,
        agents,
        tags,
        notes,
        createdAt
    }
}

function getMessageFromServer(message) {
    const { senderId, senderName, messageType, messageFrom, content, fileName, createdAt } = message
    return {
        senderId,
        senderName,
        messageType,
        messageFrom,
        content,
        fileName,
        createdAt
    }
}
export default () => {

    socket = io(`${NODE_URL}/chat`)

    initAgent(store).then(agent => {
        socket.emit('admin-join-default-room', { adminId: agent.id }, ack => {
            console.log('Admin join room default', ack)
        })
    })

    socket.on('server-send-room-enable', data => {
        console.log('Server send room enable');
        const room = getRoomFromServer(data)
        store.dispatch(addEnableRoom(room))
    })

    socket.on('server-send-auto-assigned-room', data => {
        console.log('Server send auto assigned room');
        const room = getRoomFromServer(data)
        store.dispatch(addAvailableRoom(room))

    })

    socket.on('server-send-message', msg => {
        const { roomId } = msg
        const message = getMessageFromServer(msg)

        store.dispatch(addMessageForRoom(roomId, message))

        if (store.getState().currentRoomId !== roomId) {
            store.dispatch(roomActions.updateNumberOfUnreadMessages(roomId))
        }
    })

    socket.on('close-room-to-other-agents', roomId => {
        console.log('Server send close room to other agents')
        store.dispatch(chatActions.setStatusOfRoomSucceed(roomId, 3))
    })

}
