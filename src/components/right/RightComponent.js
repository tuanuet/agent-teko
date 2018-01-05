import React, {PropTypes} from 'react'
import Customer from './Customer'
import CustomerFullInfo from './CustomerFullInfo'
import NoteList from './NoteList'
import TakeNote from './TakeNote'
import Photos from './Photos'
import OrderCreate from './OrderCreate'

class RightComponent extends React.Component {
    render() {
        const { actions, agents, customer, notes, photos, currentRoomId, nextFetchingRoom, isLoadingMessages, newNote, updateNote, handleOnKeyUpTakeNote, onClickSaveNote, updateNoteState, deleteNote, isMobile, toggleShowInfo, toggleShowOrderCreate, isShowOrderCreate } = this.props
        return <div className={`right ${isMobile ? `is-mobile` : ``} ${isShowOrderCreate ? `show-order-create` : ``}`}>
            <Customer customer={customer} agents={agents} isMobile={isMobile} toggleShowInfo={toggleShowInfo} />
            <CustomerFullInfo customer={customer} actions={actions} />
            <OrderCreate customer={customer} toggleShowOrderCreate={toggleShowOrderCreate} />
            <NoteList notes={notes} updateNote={updateNote} deleteNote={deleteNote} />
            <TakeNote
                isMobile={isMobile}
                newNote={newNote}
                updateNoteState={updateNoteState}
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
    }
}

RightComponent.propTypes = {
    customer: PropTypes.object.isRequired,
    newNote: PropTypes.string.isRequired,
    handleOnKeyUpTakeNote: PropTypes.func.isRequired,
    onClickSaveNote: PropTypes.func.isRequired,
    updateNoteState: PropTypes.func.isRequired
}

export default RightComponent
