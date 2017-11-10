import React, {PropTypes} from 'react';
import ContentEditable from 'react-contenteditable';

const NoteItem = ({note, editNote}) => {
    return <div className="px-md py-sm note-item" title={note.createdAt}>

        <div className="note-item-content d-flex">
            <ContentEditable
                className="pr-sm ps-type-ellipsis"
                html={note.content}
                value={note.id}
            />
            <div className="note-item-timestamp d-flex">
                <i className="fa fa-times" aria-hidden="true"></i>
            </div>

        </div>
    </div>
};

NoteItem.propTypes={
    note: PropTypes.object,
};

export default NoteItem;
