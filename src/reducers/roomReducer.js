import _ from 'lodash'
import initialState from './initialState'
import * as types from '../constants/actionTypes'

export default function roomReducer(state=initialState.rooms, action) {
    switch (action.type) {

        //fetch rooms
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
                    messages: action.messages
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

        case types.ADD_ROOM_AVAILABLE:
            return [action.room,...state]
        case types.REOPEN_ROOM_SUCCEED:
            return [ action.room, ...state ]
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
            return [action.room,...state]

        case types.ADD_MESSAGE_FOR_ROOM: {
            return state.map(room => {
                if (room.roomId !== action.roomId) return room
                return {
                    ...room,
                    roomInfo: {...room.roomInfo, latestMessage: action.message},
                    messages: [...room.messages, action.message]
                }
            })
        }

        case types.RESET_NUM_OF_UNREAD_MESSAGE:
            return state.map(room => {
                if (room.roomId !== action.room.roomId) return room
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

            console.log('RoomReducer:',action)

            let agentIds = _(action.agentIds).map(id => {return {agentId : id}}).value()
            return _(state).map(room => {
                if(room.id != action.roomId) return room

                return {...room,...{otherAgents : [...agentIds,...room.otherAgents]}}
            }).value()

        case types.LOAD_CLOSED_ROOM_SUCCEED:
            let newArray = [...action.closedRooms]
            state.forEach(room => {
                const searchRoom = newArray.find(tmp => tmp.id === room.id)
                if (!searchRoom) newArray = [...newArray, room]
            })
            return newArray

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
                    tags: [...room.tags, { id: action.tagId }]
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
            console.log('come to remove room');
            return state.filter(room => room.roomId !== action.roomId)
        default:
            return state
        }
}
