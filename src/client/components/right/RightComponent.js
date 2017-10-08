import React, {PropTypes} from 'react';
import Customer from './Customer';
import CustomerFullInfo from './CustomerFullInfo';
import NoteList from './NoteList';
import TakeNote from './TakeNote';

const RightComponent = ({customer, notes, updateNoteState, newNote}) => {
    return(
        <div className="right">
            <Customer customer={customer}/>
            <CustomerFullInfo customer={customer}/>
            <NoteList notes={notes}/>
            <TakeNote updateNoteState={updateNoteState} newNote={newNote}/>
        </div>
    );
};

RightComponent.propTypes = {
    customer: PropTypes.object.isRequired,
    newNote: PropTypes.string.isRequired,
    updateNoteState: PropTypes.func.isRequired
};

export default RightComponent;