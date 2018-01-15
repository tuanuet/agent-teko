import { API_URL, NODE_URL, TEKSHOP_URL } from './Server'

export const ROOMS_FETCH_REQUESTED = `${API_URL}/api/fetch-active-rooms`
export const LIST_OF_TAGS_FETCH_REQUESTED = `${API_URL}/api/fetch-tags`
export const MESSAGES_FETCH_REQUESTED = `${API_URL}/api/fetch-messages-of-room`
export const NOTES_FETCH_REQUESTED = `${API_URL}/api/fetch-notes`
export const SAVE_TAG_OF_CUSTOMER = `${API_URL}/api/create-tag-of-customer`
export const SAVE_NOTE_REQUESTED = `${API_URL}/api/create-note-of-customer`
export const DELETE_TAG_OF_CUSTOMER = `${API_URL}/api/delete-tag-of-customer`
export const AGENTS_FETCH_REQUESTED = `${API_URL}/api/fetch-agents`
export const SET_STATUS_OF_ROOM_REQUESTED = `${API_URL}/api/update-room-status`
export const LOAD_CLOSED_ROOMS = `${API_URL}/api/fetch-closed-rooms`
export const FETCH_MORE_MESSAGES = `${API_URL}/api/fetch-more-messages`
export const DELETE_NOTE_REQUESTED = `${API_URL}/api/delete-note-of-customer`
export const UPDATE_NOTE_REQUESTED = `${API_URL}/api/update-note-of-customer`
export const UPLOAD_IMAGE_REQUESTED = `${API_URL}/api/files/upload`
export const UPDATE_ADMIN_BROADCAST_ROOMS = `${API_URL}/api/update-admin-broadcast`
export const UPDATE_ADMIN_UNBROADCAST_ROOMS = `${API_URL}/api/update-admin-unbroadcast`
export const UPDATE_CUSTOMER_INFO = `${API_URL}/api/update-customer-info`
export const MARK_SUBSCRIPTIONS_AS_READ = `${API_URL}/api/mark-subscriptions-as-read`
export const FETCH_SEARCH_PRODUCTS = `${TEKSHOP_URL}/admin/api/products`
export const CREATE_ORDER = `${NODE_URL}/api/orders/validate-order`

export const ADMIN_JOIN_ROOM_SUCCEED = `${API_URL}/api/admin-join-room-succeed`
export const SEND_REQUEST_JOIN_ROOM = `${API_URL}/api/request-join-room`
export const ADD_QUICK_REPLY_REQUESTED = `${API_URL}/api/add-quick-reply-requested`
export const DELETE_QUICK_REPLY_REQUESTED = `${API_URL}/api/delete-quick-reply-requested`
export const UPDATE_QUICK_REPLY_REQUESTED = `${API_URL}/api/update-quick-reply-requested`
