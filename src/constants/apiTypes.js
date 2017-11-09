import { API_URL, NODE_URL } from './Server'

export const ROOMS_FETCH_REQUESTED = `${API_URL}/api/fetch-active-rooms`;
export const LIST_OF_TAGS_FETCH_REQUESTED = `${API_URL}/api/fetch-tags`;
export const MESSAGES_FETCH_REQUESTED = `${API_URL}/api/fetch-messages-of-room`;
export const NOTES_FETCH_REQUESTED = `${API_URL}/api/fetch-notes`;


export const AGENTS_FETCH_REQUESTED = `${API_URL}/api/other-agents-fetch-requested`;
export const SAVE_NOTE_REQUESTED = `${API_URL}/api/save-note-requested`;
export const ADMIN_JOIN_ROOM_SUCCEED = `${API_URL}/api/admin-join-room-succeed`;
export const SEND_REQUEST_JOIN_ROOM = `${API_URL}/api/request-join-room`;
export const SET_STATUS_OF_ROOM_REQUESTED = `${API_URL}/api/set-status-of-room-requested`;
export const LOAD_CLOSED_ROOMS = `${API_URL}/api/closed-rooms-fetch-requested`;
export const UPLOAD_IMAGE_REQUESTED = `${API_URL}/api/files/upload`;
export const REOPEN_ROOM = `${API_URL}/api/reopen-room`;
export const SAVE_TAG_OF_ROOM = `${API_URL}/api/save-tag-of-room`;
export const DELETE_TAG_OF_ROOM = `${API_URL}/api/delete-tag-of-room`;
export const FETCH_MORE_MESSAGES = `${API_URL}/api/fetch-more-messages`;
