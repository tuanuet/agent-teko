import React, {PropTypes} from 'react';
import NoteItem from './NoteItem';

const NoteList = ({notes, editNote}) => {
    return (
        <div className="notes-list">
            {notes.map(note => <NoteItem key={note.id} editNote={editNote} note={note}/>)}
        </div>
    );
};

NoteList.propTypes = {
    notes: PropTypes.array.isRequired,
    editNote: PropTypes.func
};

export default NoteList;