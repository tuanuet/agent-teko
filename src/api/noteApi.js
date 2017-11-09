import axios from 'axios';
import * as apiType from '../constants/apiTypes';

class NoteApi {
    static notesFetchRequested(roomId) {
        return axios.get(`${apiType.NOTES_FETCH_REQUESTED}?roomId=${roomId}`)
            .then(response => response.data);
    }

    static saveNote(note) {
        let data = new FormData();
        data.append("note", JSON.stringify(note));
        return axios.post(apiType.SAVE_NOTE_REQUESTED, data);
    }
}

export default NoteApi;
