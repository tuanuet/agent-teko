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
import { firstCallOf_messagesFetchRequested } from '../container/MiddleContainer/chatActions'
import { NotificationManager } from 'react-notifications'

let socket = null
import store from '../store/store'

export function socketMiddleware() {
    return next => (action) => {
        const result = next(action)
        if (socket && action.type === types.JOIN_ROOM_TO_NODE_SERVER) {
            socket.emit('admin-join-room', action.room.roomId, (ack, newRoom) => {
                if (!ack) {
                    alert(newRoom)
                    return false
                }
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
        } else if (socket && action.type === types.CLIENT_SEND_MESSAGE) {
            socket.emit('client-send-message', action.message, function (isReceived) {
                if (isReceived === false) {
                    const { roomId, content } = action.message
                    store.dispatch({
                        type: types.CLIENT_SEND_MESSAGE_FAILED,
                        roomId,
                        content
                    })
                }
            })
        } else if (socket && action.type === types.RESET_NUM_OF_UNREAD_MESSAGE) {
            socket.emit('reset-number-of-unread-messages', action.roomId, ack => {
                if (!ack) return false
                store.dispatch({type: types.RESET_NUM_OF_UNREAD_MESSAGE_SUCCEED, roomId: action.roomId})
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
        } else if (socket && action.type === types.REOPEN_ROOM) {
            socket.emit('admin-reopen-room', action.roomId, (ack, dataEmit) => {
                if (!ack) {
                    alert(`Có lỗi xảy ra khi mở lại hội thoại. Vui lòng thử lại sau.`)
                } else {
                    firstCallOf_messagesFetchRequested[dataEmit.roomId] = true
                    store.dispatch({type: types.REOPEN_ROOM_SUCCEED, room: dataEmit})
                }
            })
        } else if (socket && action.type === types.UPLOAD_FILE) {
            socket.emit('client-send-attachment', action.data, (ack, msg) => {
                if (!ack) alert(`Có lỗi xảy ra. Vui lòng thử lại sau.\n\nChi tiết lỗi: ${msg}`)
            })
        } else if (socket && action.type === types.ADMIN_EXIT_ROOM) {
            socket.emit('admin-exit-room', action.roomId, (ack, msg) => {
                if (!ack) alert(`Không thoát được khỏi phòng chat.\n\nChi tiết lỗi: ${msg}`)
            })
        } else if (socket && action.type === types.MARK_AS_UNREAD) {
            socket.emit('admin-mark-unread', action.roomId)
        }
        return result
    }
}

const initAgent = store => {
    store.dispatch(agentRequested())
    store.dispatch(chatActions.agentsFetchRequested())
    return axios.get(`${API_URL}/api/fetch-admin-info`)
        .then(res => res.data)
        .then(data => {
            store.dispatch(agentSucceed(data.agent, data.subscriptions))
            return data
        }).catch(err => {
            console.log(err);
            store.dispatch(agentFailure())
        })
}

function getRoomFromServer(dataEmit) {
    const { roomId, roomStatus, roomType, roomInfo, messages, topic, customer, agents, tags, notes, createdAt } = dataEmit

    return {
        roomId,
        roomStatus,
        roomType,
        roomInfo,
        messages,
        topic,
        customer,
        agents,
        tags,
        notes,
        createdAt
    }
}

function getMessageFromServer(message) {
    const { messageId, senderId, senderName, messageType, messageFrom, content, fileName, createdAt } = message
    return {
        messageId,
        senderId,
        senderName,
        messageType,
        messageFrom,
        content,
        fileName,
        createdAt
    }
}
export default async () => {

    const { agent, token } = await initAgent(store)
    socket = io.connect(`${NODE_URL}/chat`)

    socket.emit('handshake', token, (ack, msg) => {
        if (!ack) {
            alert(msg)
            return false
        }

        socket.emit('admin-join-default-room', { adminId: agent.id }, ack => {
            console.log('Admin join room default', ack)
        })

        socket.on('server-send-admin-join-room-succeed', data => {
            const { agentId, roomId } = data
            if (store.getState().agent.id === agentId) return
            store.dispatch({type: types.REMOVE_ROOM, roomId})
        })

        socket.on('server-send-room-enable', data => {
            console.log('Server send room enable');
            const room = getRoomFromServer(data)
            store.dispatch(addEnableRoom(room))
        })

        socket.on('server-send-auto-assigned-room', data => {
            console.log('Server send auto assigned room', data);
            const room = getRoomFromServer(data)
            store.dispatch(addAvailableRoom(room))
        })

        socket.on('server-send-subscription', newSub => {
            NotificationManager.info(newSub.body, newSub.title, 5000, null, true)
            store.dispatch({ type: types.ADD_NEW_SUBSCRIPTION, newSub})
        })

        socket.on('server-send-message', msg => {
            const { roomId } = msg
            const message = getMessageFromServer(msg)
            store.dispatch(addMessageForRoom(roomId, message))
        })

        socket.on('server-send-involve-admins', ({ customer, newInvolveAdmins }) => {
            store.dispatch({ type: types.UPDATE_INVOLVE_ADMINS, customer, newInvolveAdmins })
        })

        socket.on('remove-agent-in-room', room => {
            const { agent } = store.getState()
            store.dispatch({ type: types.REMOVE_ADMIN_IN_ROOM, room })
        })

        socket.on('close-room-to-other-agents', roomId => {
            store.dispatch(chatActions.setStatusOfRoomSucceed(roomId, 3))
        })

        socket.on('broadcast-mark-unread', roomId => {
            store.dispatch({ type: types.BROADCAST_MARK_UNREAD, roomId })
        })

        socket.on('customer-seen', data => {
            const { fbId, seenAt } = data
            store.dispatch({ type: types.CUSTOMER_SEEN, fbId, seenAt })
        })

        socket.on('reconnect', () => {
            socket.emit('admin-join-default-room', { adminId: store.getState().agent.id }, ack => {
                console.log('Admin join room default', ack)
            })
            socket.emit('admin-re-join-room', store.getState().rooms.filter(room => room.roomStatus !== 3).map(room => ({roomId: room.roomId})), ack => {
                if (!ack) {
                    console.log('Rejoin all available socket failed')
                    store.dispatch(roomActions.reJoinRoomToSocketFailed(action.rooms))
                } else {
                    console.log('Rejoin all available socket success')
                }
            })
        })
    })

}
