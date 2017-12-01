import React from 'react';
import {connect} from 'react-redux';
import RightComponent from '../../components/right/RightComponent';
import {bindActionCreators} from 'redux';
import * as chatActions from '../MiddleContainer/chatActions';
import * as roomActions from '../LeftContainer/roomActions';
import * as customerActions from './action/customerActions';
import * as noteActions from './action/noteActions';

class RightContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            newNote: ""
        };
        this.updateNoteState = this.updateNoteState.bind(this);
        this.handleOnKeyUpTakeNote = this.handleOnKeyUpTakeNote.bind(this);
        this.onClickSaveNote = this.onClickSaveNote.bind(this);
    }

    //update when input a note
    updateNoteState(event) {
        const note = event.target.value;
        this.setState({
            newNote: note
        });
    }

    //handle on key up take note
    handleOnKeyUpTakeNote(event) {
        if (event.keyCode === 13 && !event.shiftKey) {
            this.saveNote(this.state.newNote.trim());
        } else {
            this.setState({
                newNote: event.target.value
            })
        }
    }

    //on click to save note
    onClickSaveNote() {
        this.saveNote(this.state.newNote);
    }

    //take new note
    saveNote(content) {
        if (content === "") return;
        let note = {
            content: content,
            customerId: this.props.customer.id,
        };

        this.props.actions.saveNote(note)
            .then(() => this.setState({
                newNote: ""
            }))
            .catch(error => {
                console.log("Error while saving note", error);
            });
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
        const {customer, notes, currentAgent, currentRoomId, actions} = this.props;
        if (!currentRoomId) {
            return false
        }
        return (
            <RightComponent
                actions={actions}
                customer={customer}
                currentAgent={currentAgent}
                notes={notes}
                newNote={this.state.newNote}
                updateNote={this.updateNote}
                deleteNote={this.deleteNote}
                updateNoteState={this.updateNoteState}
                onClickSaveNote={this.onClickSaveNote}
                handleOnKeyUpTakeNote={this.handleOnKeyUpTakeNote}
            />
        );
    }
}

function mapStateToProps(state, ownProps) {
    let currentRoomId = state.currentRoomId;
    let customer = {};
    let notes = [];
    if (currentRoomId) {
        let room = state.rooms.find(room => room.roomId === currentRoomId);
        customer = room.customer;
        notes = room.notes;
    }
    return {
        customer: customer,
        currentAgent: state.agent,
        notes: notes,
        currentRoomId: state.currentRoomId
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            ...{},
            ...roomActions,
            ...chatActions ,
            ...customerActions,
            ...noteActions
        }, dispatch)
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(RightContainer);
