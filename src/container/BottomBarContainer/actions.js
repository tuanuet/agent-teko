import {
    FETCH_META,
    FETCH_META_SUCCESS,
    FETCH_META_FAILURE,
    UPLOAD_FILE,
    UPLOAD_FILE_FAILURE,
    UPLOAD_FILE_SUCCESS
} from '../../constants/actionTypes';

export function getMetaLink(link,content){
    return {
        type : FETCH_META,
        link,content
    };
}
export function fetchMetadataFailure(message){
    return {
        type : FETCH_META_FAILURE,
        message
    };
}
export function fetchMetadataSuccess() {
    return {
        type: FETCH_META_SUCCESS,
    };
}

export function uploadFile(data) {
    return {
        type: UPLOAD_FILE,
        data
    }
}
export function uploadFileFailure(message) {
    return {
        type: UPLOAD_FILE_FAILURE,
        message
    }
}
export function uploadFileSuccess(message) {
    return {
        type: UPLOAD_FILE_SUCCESS,
        message
    }
}
