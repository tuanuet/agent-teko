import _ from 'lodash'
import initialState from './initialState'
import * as types from '../constants/actionTypes'
import * as helper from '../helper'
import { firstCallOf_messagesFetchRequested } from '../container/MiddleContainer/chatActions'

export default function roomReducer(state=initialState.rooms, action) {
    switch (action.type) {

        case types.ROOMS_FETCH_SUCCEED:
            return [
                ...state,
                ...action.rooms
            ]
        case types.MESSAGES_FETCH_SUCCEED:
            return state.map(room => {
                if (room.roomId !== action.roomId) {
                    return room
                }
                return {
                    ...room,
                    messages: action.messages,
                    nextFetchingRoom: action.nextFetchingRoom
                }
            })
        case types.FETCH_MORE_MESSAGES_SUCCEED:
            return state.map(room => {
                if (room.roomId === action.currentRoomId) return {
                    ...room,
                    messages: [...action.messages, ...room.messages],
                    nextFetchingRoom: action.nextFetchingRoom
                }
                return room
            })

        case types.NOTES_FETCH_SUCCEED:
            return state.map(room => {
                if (room.roomId !== action.roomId) return room
                return {
                    ...room,
                    notes: action.notes
                }
            })

        case types.CREATE_NOTE_SUCCEED:
            return state.map(room => {
                if (room.customer.id !== action.customerId) return room

                return {
                    ...room,
                    notes: [...room.notes, action.note]
                }
            })
        case types.UPDATE_CUSTOMER_INFO_SUCCEED:
            return state.map(room => {
                if (room.customer.id !== action.customerId) return room

                return {
                    ...room,
                    customer: {
                        ...room.customer,
                        phone: action.newPhoneNumber
                    }
                }
            })
        case types.ADD_ROOM_AVAILABLE:
            if (state.find(room => room.customer.id === action.room.customer.id)) {
                return state.map(room => {
                    if (room.customer.id !== action.room.customer.id) return room
                    return action.room
                })
            } else return [ action.room, ...state ]
        case types.REOPEN_ROOM_SUCCEED:
            const oldRoom = state.find(room => room.customer.id === action.room.customer.id)
            return [
                {...action.room,
                    messages: oldRoom.messages,
                    nextFetchingRoom: oldRoom.nextFetchingRoom
                },
                ...state.filter(room => room.customer.id !== action.room.customer.id)
            ]
        case types.JOIN_ROOM_SUCCEED:
            return state.map(room => {
                if (room.roomId !== action.room.roomId) {
                    return room
                }

                return {
                    ...room,
                    roomStatus: action.room.roomStatus,
                    agents: action.room.agents
                }
            })

        case types.ADD_ROOM_ENABLE:
            if (state.find(room => room.customer.id === action.room.customer.id)) {
                return state.map(room => {
                    if (room.customer.id !== action.room.customer.id) return room
                    return action.room
                })
            } else return [ action.room, ...state ]

        case types.ADD_MESSAGE_FOR_ROOM: {
            return state.map(room => {
                if (room.roomId !== action.roomId) return room
                const unReadMessages = action.message.messageFrom === 0 ? 0 : room.roomInfo.numOfUnReadMessages + 1
                if (room.messages) {
                    return {
                        ...room,
                        roomInfo: {...room.roomInfo, latestMessage: action.message, numOfUnReadMessages: unReadMessages },
                        messages: [...room.messages, action.message]
                    }
                } else return {
                    ...room,
                    roomInfo: {...room.roomInfo, latestMessage: action.message, numOfUnReadMessages: unReadMessages },
                    messages: [action.message]
                }
            })
        }
        case types.CLIENT_SEND_MESSAGE_FAILED:
            return state.map(room => {
                if (room.roomId !== action.roomId) return room
                return {
                    ...room,
                    messages: room.messages.map(msg => {
                        if (msg.content !== action.content) return msg
                        return {
                            ...msg,
                            isError: true
                        }
                    })
                }
            })
        case types.REMOVE_ADMIN_IN_ROOM:
            if (state.find(room => room.roomId == action.room.roomId)) {
                return state.map(room => {
                    if (room.roomId !== action.room.roomId) return room
                    return {
                        ...room,
                        agents: action.room.agents,
                        roomStatus: action.room.roomStatus
                    }
                })
            } else if (action.room.roomStatus === 1) {
                firstCallOf_messagesFetchRequested[action.room.roomId] = null
                return [...state, action.room]
            } else return state

        case types.RESET_NUM_OF_UNREAD_MESSAGE:
            return state.map(room => {
                if (room.roomId !== action.roomId) return room
                return {
                    ...room,
                    roomInfo: {...room.roomInfo, numOfUnReadMessages: 0}
                }
            })

        case types.UPDATE_NUM_OF_UNREAD_MESSAGE:
            return state.map(room => {
                if (room.roomId !== action.roomId) return room
                return {
                    ...room,
                    roomInfo: {...room.roomInfo, numOfUnReadMessages: room.roomInfo.numOfUnReadMessages + 1},
                }
            })

        case types.UPDATE_SELECT_LIST_AGENT:
            let agentIds = _(action.agentIds).map(id => {return {agentId : id}}).value()
            return _(state).map(room => {
                if(room.id != action.roomId) return room

                return {...room,...{otherAgents : [...agentIds,...room.otherAgents]}}
            }).value()

        case types.LOAD_CLOSED_ROOM_SUCCEED:
            return [...state, ...action.closedRooms]

        case types.SET_STATUS_OF_ROOM_SUCCEED:
            return state.map(room => {
                if (room.roomId !== action.roomId) return room

                return {
                    ...room,
                    roomStatus: action.status
                }
            })

        case types.SAVE_TAG_OF_CUSTOMER_SUCCEED:
            return state.map(room => {
                if (room.customer.id !== action.customerId) return room

                return {
                    ...room,
                    tags: [...room.tags, action.tag]
                }
            })

        case types.DELETE_TAG_OF_CUSTOMER_SUCCEED:
            return state.map(room => {
                if (room.customer.id !== action.customerId) return room
                return {
                    ...room,
                    tags: room.tags.filter(tag => tag.id !== action.tagId)
                }
            })

        case types.DELETE_NOTE_SUCCEED:
            return state.map(room => {
                return {
                    ...room,
                    notes: room.notes.filter(note => note.id !== action.noteId)
                }
            })
        case types.REMOVE_ROOM:
            return state.filter(room => room.roomId !== action.roomId)
        case types.UPDATE_NOTE_SUCCEED:
            return state.map(room => {
                return {
                    ...room,
                    notes: room.notes.map(note => {
                        if (note.id !== action.noteId) return note
                        return {
                            ...note,
                            content: action.content,
                            updatedAt: helper.now()
                        }
                    })
                }
            })
        case types.SAVE_LIST_AGENT_JOIN_ROOM:
            return state.map(room => {
                if (room.roomId !== action.roomId) return room
                return {
                    ...room,
                    agents: [...room.agents, ...action.agents]
                }
            })
        case types.REMOVE_ALL_CLOSED_ROOMS:
            return state.filter(room => room.roomStatus !== 3)
        case types.UPDATE_INVOLVE_ADMINS:
            return state.map(room => {
                if (room.customer.id !== action.customer.id) return room
                return {
                    ...room,
                    customer: {
                        ...room.customer,
                        involveAdmins: action.newInvolveAdmins
                    }
                }
            })
        default:
            return state
        }
}
