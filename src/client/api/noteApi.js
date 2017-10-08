import axios from 'axios';
import * as apiType from '../constants/apiTypes';

class NoteApi {
    static notesFetchRequested(roomId) {
        return axios.get(`${apiType.NOTES_FETCH_REQUESTED}?roomId=${roomId}`)
            .then(response => response.data);
    }

    static saveNote(){}
}

export default NoteApi;
