import React, {PropTypes} from 'react';
import Customer from './Customer';
import CustomerFullInfo from './CustomerFullInfo';
import NoteList from './NoteList';
import TakeNote from './TakeNote';

const RightComponent = ({customer, notes, newNote, handleOnKeyUpTakeNote, onClickSaveNote, updateNoteState}) => {
    return(
        <div className="right">
            <Customer customer={customer} />
            <CustomerFullInfo customer={customer} />
            <NoteList notes={notes} />
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
