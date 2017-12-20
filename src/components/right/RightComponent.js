import React, {PropTypes} from 'react';
import Customer from './Customer';
import CustomerFullInfo from './CustomerFullInfo';
import NoteList from './NoteList';
import TakeNote from './TakeNote';
import Photos from './Photos'

const RightComponent = ({actions, agents, customer, notes, photos, currentRoomId, nextFetchingRoom, isLoadingMessages, newNote, updateNote, handleOnKeyUpTakeNote, onClickSaveNote, updateNoteState, deleteNote}) => {
    return(
        <div className="right">
            <Customer customer={customer} agents={agents} />
            <CustomerFullInfo customer={customer} actions={actions} />
            <NoteList notes={notes} updateNote={updateNote} deleteNote={deleteNote} />
            <TakeNote
                updateNoteState={updateNoteState}
                newNote={newNote}
                handleOnKeyUpTakeNote={handleOnKeyUpTakeNote}
                onClickSaveNote={onClickSaveNote}
            />
            <Photos
                actions={actions}
                photos={photos}
                currentRoomId={currentRoomId}
                nextFetchingRoom={nextFetchingRoom}
                isLoadingMessages={isLoadingMessages}
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
