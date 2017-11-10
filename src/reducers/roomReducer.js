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
                if (room.id === action.currentRoomId) return {
                    ...room,
                    messages: [...action.messages, ...room.messages],
                    nextFetchingRoom: action.nextFetchingRoom
                }
                return room
            })
            //fetch history chat of customer
        case types.HISTORY_CHAT_FETCH_SUCCEED:
            return state.map(room => {
                if (room.id !== action.roomId) {
                        // This isn't the item we care about - keep it as-is
                    return room
                }

                return {
                    ...room,
                    customers: action.customers
                }
            })

            //fetch history chat of customer
        case types.NOTES_FETCH_SUCCEED:
            return state.map(room => {
                if (room.id !== action.roomId) {
                        // This isn't the item we care about - keep it as-is
                    return room
                }

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
            //add more room available
        case types.ADD_ROOM_AVAILABLE:
            console.log('IN_REDUCER:',action)
            return [action.room,...state]

            //admin join room succeed
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

            //add more room enable
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

        //reset number of unread messages to 0
        case types.RESET_NUM_OF_UNREAD_MESSAGE:
            return state.map(room => {
                if (room.id !== action.room.id) {
                    // This isn't the item we care about - keep it as-is
                    return room
                }

                return Object.assign(room, {numOfUnReadMessages: 0})
            })

        //update number of unread messages
        case types.UPDATE_NUM_OF_UNREAD_MESSAGE:
            return state.map(room => {
                if (room.id !== action.roomId) {
                    // This isn't the item we care about - keep it as-is
                    return room
                }

                return Object.assign(room, {numOfUnReadMessages: room.numOfUnReadMessages + 1})


            })
        //update room when select agents
        case types.UPDATE_SELECT_LIST_AGENT:

            console.log('RoomReducer:',action)

            let agentIds = _(action.agentIds).map(id => {return {agentId : id}}).value()
            return _(state).map(room => {
                if(room.id != action.roomId) return room

                return {...room,...{otherAgents : [...agentIds,...room.otherAgents]}}
            }).value()

        //update closed rooms
        case types.LOAD_CLOSED_ROOM_SUCCEED:
            let newArray = [...action.closedRooms]
            console.log(state)
            state.forEach(room => {
                const searchRoom = newArray.find(tmp => tmp.id === room.id)
                if (!searchRoom) newArray = [...newArray, room]
            })
            return newArray
        //set tag of room succeed
        case types.SET_STATUS_OF_ROOM_SUCCEED:
            return state.map(room => {
                if (room.id !== action.roomId) {
                    // This isn't the item we care about - keep it as-is
                    return room
                }

                return {
                    ...room,
                    status: parseInt(action.status)
                }
            })

        case types.SAVE_TAG_OF_CUSTOMER_SUCCEED:
            return state.map(room => {
                if (room.roomId !== action.roomId) return room

                return {
                    ...room,
                    tags: [...room.tags, { id: action.tagId }]
                }
            })

        case types.DELETE_TAG_OF_CUSTOMER_SUCCEED:
            return state.map(room => {
                if (room.id !== action.roomId) return room
                return {
                    ...room,
                    tags: room.tags.filter(tag => parseInt(tag.id) !== action.tagId)
                }
            })

            // default case, return current state
        default:
            return state
        }
}
