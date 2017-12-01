export const ROOMS_FETCH_REQUESTED = 'ROOMS_FETCH_REQUESTED';
export const ROOMS_FETCH_SUCCEED = 'ROOMS_FETCH_SUCCEED';
export const ROOMS_FETCH_FAILED = 'ROOMS_FETCH_FAILED';
export const ADMIN_CHOOSE_ROOM = 'ADMIN_CHOOSE_ROOM';

export const MESSAGES_FETCH_REQUESTED = 'MESSAGES_FETCH_REQUESTED';
export const MESSAGES_FETCH_SUCCEED = 'MESSAGES_FETCH_SUCCEED';
export const MESSAGES_FETCH_FAILED = 'MESSAGES_FETCH_FAILED';

export const AGENTS_FETCH_REQUESTED = 'AGENTS_FETCH_REQUESTED';
export const AGENTS_FETCH_SUCCEED = 'AGENTS_FETCH_SUCCEED';
export const AGENTS_FETCH_FAILED = 'AGENTS_FETCH_FAILED';

export const AGENT_INFO_FETCH_REQUESTED = 'AGENT_INFO_FETCH_REQUESTED';
export const AGENT_INFO_FETCH_SUCCEED = 'AGENT_INFO_FETCH_SUCCEED';
export const AGENT_INFO_FETCH_FAILED = 'AGENT_INFO_FETCH_FAILED';

export const HISTORY_CHAT_FETCH_REQUESTED = 'HISTORY_CHAT_FETCH_REQUESTED';
export const HISTORY_CHAT_FETCH_SUCCEED = 'HISTORY_CHAT_FETCH_SUCCEED';
export const HISTORY_CHAT_FETCH_FAILED = 'HISTORY_CHAT_FETCH_FAILED';

export const NOTES_FETCH_REQUESTED = 'NOTES_FETCH_REQUESTED';
export const NOTES_FETCH_SUCCEED = 'NOTES_FETCH_SUCCEED';
export const NOTES_FETCH_FAILED = 'NOTES_FETCH_FAILED';
export const UPDATE_NOTE_SUCCEED = 'UPDATE_NOTE_SUCCEED';
export const CREATE_NOTE_SUCCEED = 'CREATE_NOTE_SUCCEED';
export const DELETE_NOTE_REQUESTED = 'DELETE_NOTE_REQUESTED'
export const DELETE_NOTE_SUCCEED = 'DELETE_NOTE_SUCCEED'

export const JOIN_ROOM_TO_NODE_SERVER = 'JOIN_ROOM_TO_NODE_SERVER'
export const JOIN_ROOM_TO_PHP_SERVER_REQUESTED = 'JOIN_ROOM_TO_PHP_SERVER_REQUESTED';
export const JOIN_ROOM_TO_PHP_SERVER_SUCCEED = 'JOIN_ROOM_TO_PHP_SERVER_SUCCEED';
export const JOIN_ROOM_TO_PHP_SERVER_FAILED = 'JOIN_ROOM_TO_PHP_SERVER_FAILED';
export const JOIN_ROOM_TO_SOCKET_SUCCEED = 'JOIN_ROOM_TO_SOCKET_SUCCEED';
export const JOIN_ROOM_SUCCEED = 'JOIN_ROOM_SUCCEED';
export const JOIN_ROOM_FAILED = 'JOIN_ROOM_FAILED';

export const RE_JOIN_ALL_AVAILABLE_ROOM_TO_SOCKET_REQUESTED = 'RE_JOIN_ALL_AVAILABLE_ROOM_TO_SOCKET_REQUESTED';
export const RE_JOIN_ROOM_TO_SOCKET_SUCCEED = 'RE_JOIN_ROOM_TO_SOCKET_SUCCEED';

export const REOPEN_ROOM = 'REOPEN_ROOM'
export const REOPEN_ROOM_SUCCEED = 'REOPEN_ROOM_SUCCEED'

export const ADD_ROOM_AVAILABLE = 'ADD_ROOM_AVAILABLE';
export const ADD_ROOM_ENABLE = 'ADD_ROOM_ENABLE';

export const ADD_MESSAGE_FOR_ROOM = 'ADD_MESSAGE_FOR_ROOM';

export const RESET_NUM_OF_UNREAD_MESSAGE = 'RESET_NUM_OF_UNREAD_MESSAGE';
export const UPDATE_NUM_OF_UNREAD_MESSAGE = 'UPDATE_NUM_OF_UNREAD_MESSAGE';
export const RESET_NUM_OF_UNREAD_MESSAGE_SUCCEED = 'RESET_NUM_OF_UNREAD_MESSAGE_SUCCEED'

export const CLIENT_SEND_MESSAGE = 'CLIENT_SEND_MESSAGE';

export const SEND_REQUEST_USER_RATING = 'SEND_REQUEST_USER_RATING';
export const SAVE_LIST_AGENT_JOIN_ROOM = 'SAVE_LIST_AGENT_JOIN_ROOM';
export const SAVE_LIST_AGENT_JOIN_ROOM_SUCCEED = 'SAVE_LIST_AGENT_JOIN_ROOM_SUCCEED';


export const UPDATE_SELECT_LIST_AGENT = 'UPDATE_SELECT_LIST_AGENT';
export const EMIT_SELECT_LIST_AGENT = 'EMIT_SELECT_LIST_AGENT';


export const LIST_OF_TAGS_FETCH_REQUESTED = 'LIST_OF_TAGS_FETCH_REQUESTED';
export const LIST_OF_TAGS_FETCH_SUCCEED = 'LIST_OF_TAGS_FETCH_SUCCEED';
export const LIST_OF_TAGS_FETCH_FAILED = 'LIST_OF_TAGS_FETCH_FAILED';

export const SET_STATUS_OF_ROOM_REQUESTED = 'SET_STATUS_OF_ROOM_REQUESTED';
export const SET_STATUS_OF_ROOM_SUCCEED = 'SET_STATUS_OF_ROOM_SUCCEED';
export const SET_STATUS_OF_ROOM_FAILED = 'SET_STATUS_OF_ROOM_FAILED';

export const LOAD_CLOSED_ROOM_REQUESTED = 'LOAD_CLOSED_ROOM_REQUESTED';
export const LOAD_CLOSED_ROOM_SUCCEED = 'LOAD_CLOSED_ROOM_SUCCEED';
export const LOAD_CLOSED_ROOM_FAILED = 'LOAD_CLOSED_ROOM_FAILED';

export const BROADCAST_CLOSE_ROOM_TO_OTHER_AGENT = 'BROADCAST_CLOSE_ROOM_TO_OTHER_AGENT';

export const SAVE_TAG_OF_CUSTOMER_REQUESTED = 'SAVE_TAG_OF_CUSTOMER_REQUESTED';
export const SAVE_TAG_OF_CUSTOMER_SUCCEED = 'SAVE_TAG_OF_CUSTOMER_SUCCEED';
export const DELETE_TAG_OF_CUSTOMER_REQUESTED = 'DELETE_TAG_OF_CUSTOMER_REQUESTED';
export const DELETE_TAG_OF_CUSTOMER_SUCCEED = 'DELETE_TAG_OF_CUSTOMER_SUCCEED';

export const FETCH_MORE_MESSAGES_REQUEST = 'FETCH_MORE_MESSAGES_REQUEST';
export const FETCH_MORE_MESSAGES_SUCCEED = 'FETCH_MORE_MESSAGES_SUCCEED';
export const FETCH_MORE_MESSAGES_FAILED = 'FETCH_MORE_MESSAGES_FAILED';

export const REMOVE_ROOM = 'REMOVE_ROOM'
export const AGENT_HANDLE_ALL_ROOM = 'AGENT_HANDLE_ALL_ROOM'

export const FETCH_META = 'app/BottomBarContainer/FETCH_META';
export const FETCH_META_SUCCESS = 'app/BottomBarContainer/FETCH_META_SUCCESS';
export const FETCH_META_FAILURE = 'app/BottomBarContainer/FETCH_META_FAILURE';

export const UPLOAD_FILE ='app/BottomBarContainer/UPLOAD_FILE';
export const UPLOAD_FILE_SUCCESS ='app/BottomBarContainer/UPLOAD_FILE_SUCCESS';
export const UPLOAD_FILE_FAILURE ='app/BottomBarContainer/UPLOAD_FILE_FAILURE';

export const UPDATE_CUSTOMER_INFO_SUCCEED = 'UPDATE_CUSTOMER_INFO_SUCCEED'
