import React, {PropTypes} from 'react';
import NoteItem from './NoteItem';

const NoteList = ({notes, deleteNote}) => {
    return (
        <div className="notes-list">
            {notes && notes.map(note => <NoteItem key={note.id} note={note} deleteNote={deleteNote} />)}
        </div>
    );
};

NoteList.propTypes = {
    notes: PropTypes.array,
};

export default NoteList;
