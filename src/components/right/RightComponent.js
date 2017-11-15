import React, {PropTypes} from 'react';
import Customer from './Customer';
import CustomerFullInfo from './CustomerFullInfo';
import NoteList from './NoteList';
import TakeNote from './TakeNote';

const RightComponent = ({customer, notes, newNote, updateNote, handleOnKeyUpTakeNote, onClickSaveNote, updateNoteState, deleteNote}) => {
    return(
        <div className="right">
            <Customer customer={customer} />
            <CustomerFullInfo customer={customer} />
            <NoteList notes={notes} updateNote={updateNote} deleteNote={deleteNote} />
            <TakeNote
                updateNoteState={updateNoteState}
                newNote={newNote}
                handleOnKeyUpTakeNote={handleOnKeyUpTakeNote}
                onClickSaveNote={onClickSaveNote}
            />
        </div>
    );
};

RightComponent.propTypes = {
    customer: PropTypes.object.isRequired,
    newNote: PropTypes.string.isRequired,
    handleOnKeyUpTakeNote: PropTypes.func.isRequired,
    onClickSaveNote: PropTypes.func.isRequired,
    updateNoteState: PropTypes.func.isRequired
};

export default RightComponent;
