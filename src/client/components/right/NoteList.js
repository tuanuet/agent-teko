import React, {PropTypes} from 'react';
import NoteItem from './NoteItem';

const NoteList = ({notes}) => {
    return (
        <div className="notes-list">
            {notes && notes.map(note => <NoteItem key={note.id} note={note}/>)}
        </div>
    );
};

NoteList.propTypes = {
    notes: PropTypes.array.isRequired,
};

export default NoteList;
