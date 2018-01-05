import React from 'react'
import {connect} from 'react-redux'
import RightComponent from '../../components/right/RightComponent'
import {bindActionCreators} from 'redux'
import * as chatActions from '../MiddleContainer/chatActions'
import * as roomActions from '../LeftContainer/roomActions'
import * as customerActions from './action/customerActions'
import * as noteActions from './action/noteActions'
import { fetchMoreMessages } from '../ChatContentContainer/actions'
import { IMAGE } from '../../constants/MessageTypes'

class RightContainer extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            newNote: ''
        }
        this.updateNoteState = this.updateNoteState.bind(this)
        this.handleOnKeyUpTakeNote = this.handleOnKeyUpTakeNote.bind(this)
        this.onClickSaveNote = this.onClickSaveNote.bind(this)
    }

    //update when input a note
    updateNoteState(event) {
        const note = event.target.value
        this.setState({
            newNote: note
        })
    }

    //handle on key up take note
    handleOnKeyUpTakeNote(event) {
        if (event.keyCode === 13 && !event.shiftKey && !event.ctrlKey) {
            this.saveNote(this.state.newNote.trim())
        } else if (event.keyCode === 13 && event.ctrlKey) {
            this.setState({
                newNote: event.target.value + '\n'
            })
        } else {
            this.setState({
                newNote: event.target.value
            })
        }
    }

    //on click to save note
    onClickSaveNote() {
        this.saveNote(this.state.newNote)
    }

    //take new note
    saveNote(content) {
        if (content === '') return
        let note = {
            content: content,
            customerId: this.props.customer.id,
        }

        this.props.actions.saveNote(note)
            .then(() => this.setState({
                newNote: ''
            }))
            .catch(error => {
                console.log("Error while saving note", error)
            })
    }

    updateNote = ({noteId, content}, callback) => {
        this.props.actions.updateNote(noteId, content).then(() => {
            if (typeof callback === 'function') callback()
        })
    }

    deleteNote = noteId => {
        if (confirm(`Bạn có muốn xóa note này?`)) {
            this.props.actions.deleteNote(noteId)
        }
    }

    render() {
        const {customer, notes, photos, currentAgent, currentRoomId, actions, agents, isLoadingMessages, nextFetchingRoom, isMobile, isShowInfo, toggleShowInfo, toggleShowOrderCreate, isShowOrderCreate} = this.props
        if (!currentRoomId) return false
        if (isMobile && !isShowInfo) return false
        return (
            <RightComponent
                isMobile={isMobile}
                isShowOrderCreate={isShowOrderCreate}
                actions={actions}
                customer={customer}
                agents={agents}
                currentAgent={currentAgent}
                notes={notes}
                photos={photos}
                currentRoomId={currentRoomId}
                nextFetchingRoom={nextFetchingRoom}
                isLoadingMessages={isLoadingMessages}
                newNote={this.state.newNote}
                updateNote={this.updateNote}
                deleteNote={this.deleteNote}
                updateNoteState={this.updateNoteState}
                onClickSaveNote={this.onClickSaveNote}
                handleOnKeyUpTakeNote={this.handleOnKeyUpTakeNote}
                toggleShowInfo={toggleShowInfo}
                toggleShowOrderCreate={toggleShowOrderCreate}
            />
        )
    }
}

function mapStateToProps(state, ownProps) {
    let currentRoomId = state.currentRoomId
    let currentRoom = {}
    let customer = {}
    let notes = []
    let photos = []
    if (currentRoomId) {
        currentRoom = state.rooms.find(room => room.roomId === currentRoomId)
        customer = currentRoom.customer
        notes = currentRoom.notes
        photos = currentRoom.messages.filter(msg => msg.messageType === IMAGE && !msg.fileName.startsWith(`sticker`)).sort((a, b) => {
            if (!a.createdAt) return 0
            if (!b.createdAt) return 0
            if (a.createdAt > b.createdAt) return -1
            if (a.createdAt < b.createdAt) return 1
            return 0
        })
    }
    return {
        customer: customer,
        currentAgent: state.agent,
        agents: state.agents,
        notes: notes,
        photos: photos,
        currentRoomId: state.currentRoomId,
        nextFetchingRoom: currentRoom.nextFetchingRoom || state.currentRoomId,
        isLoadingMessages: state.isLoadingMessages
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            ...roomActions,
            ...chatActions ,
            ...customerActions,
            ...noteActions,
            fetchMoreMessages
        }, dispatch)
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(RightContainer)
