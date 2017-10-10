import React, {PropTypes} from 'react';
import Customer from './Customer';
import CustomerFullInfo from './CustomerFullInfo';
import NoteList from './NoteList';
import TakeNote from './TakeNote';

const RightComponent = ({customer, notes, updateNoteState, newNote, handleOnKeyUpTakeNote, onClickSaveNote, editNote}) => {
    return(
        <div className="right">
            <Customer customer={customer}/>
            <CustomerFullInfo customer={customer}/>
            <NoteList notes={notes} editNote={editNote} />
            <TakeNote
                updateNoteState={updateNoteState}
                newNote={newNote}
                handleOnKeyUpTakeNote={handleOnKeyUpTakeNote}
                onClickSaveNote={onClickSaveNote}
                editNote={editNote}
            />
        </div>
    );
};

RightComponent.propTypes = {
    customer: PropTypes.object.isRequired,
    newNote: PropTypes.string.isRequired,
    updateNoteState: PropTypes.func.isRequired,
    handleOnKeyUpTakeNote: PropTypes.func.isRequired,
    onClickSaveNote: PropTypes.func.isRequired,
    editNote: PropTypes.func
};

export default RightComponent;