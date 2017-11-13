import React, {PropTypes} from 'react';
import ContentEditable from 'react-contenteditable';

const NoteItem = ({note, editNote, deleteNote}) => {
    return <div className="px-md py-sm note-item" title={note.createdAt}>

        <div className="note-item-content d-flex">
            <p className="pr-sm ps-type-ellipsis">{note.content}</p>
            <div className="note-item-timestamp d-flex">
                <i className="fa fa-times" aria-hidden="true" onClick={e => deleteNote(note.id)}></i>
            </div>

        </div>
    </div>
};

NoteItem.propTypes={
    note: PropTypes.object,
};

export default NoteItem;
