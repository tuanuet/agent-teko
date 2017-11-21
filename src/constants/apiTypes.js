import { API_URL, NODE_URL } from './Server'

export const ROOMS_FETCH_REQUESTED = `${API_URL}/api/fetch-active-rooms`
export const LIST_OF_TAGS_FETCH_REQUESTED = `${API_URL}/api/fetch-tags`
export const MESSAGES_FETCH_REQUESTED = `${API_URL}/api/fetch-messages-of-room`
export const NOTES_FETCH_REQUESTED = `${API_URL}/api/fetch-notes`
export const SAVE_TAG_OF_CUSTOMER = `${API_URL}/api/create-tag-of-customer`
export const SAVE_NOTE_REQUESTED = `${API_URL}/api/create-note-of-customer`
export const DELETE_TAG_OF_CUSTOMER = `${API_URL}/api/delete-tag-of-customer`
export const AGENTS_FETCH_REQUESTED = `${API_URL}/api/fetch-other-agents`
export const SET_STATUS_OF_ROOM_REQUESTED = `${API_URL}/api/update-room-status`
export const LOAD_CLOSED_ROOMS = `${API_URL}/api/fetch-closed-rooms`
export const FETCH_MORE_MESSAGES = `${API_URL}/api/fetch-more-messages`
export const DELETE_NOTE_REQUESTED = `${API_URL}/api/delete-note-of-customer`
export const UPDATE_NOTE_REQUESTED = `${API_URL}/api/update-note-of-customer`
export const UPLOAD_IMAGE_REQUESTED = `${API_URL}/api/files/upload`
export const UPDATE_ADMIN_BROADCAST_ROOMS = `${API_URL}/api/update-admin-broadcast`
export const UPDATE_ADMIN_UNBROADCAST_ROOMS = `${API_URL}/api/update-admin-unbroadcast`

export const ADMIN_JOIN_ROOM_SUCCEED = `${API_URL}/api/admin-join-room-succeed`
export const SEND_REQUEST_JOIN_ROOM = `${API_URL}/api/request-join-room`
