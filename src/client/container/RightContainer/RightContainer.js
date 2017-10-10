import React from 'react';
import {connect} from 'react-redux';
import RightComponent from '../../components/right/RightComponent';
import {bindActionCreators} from 'redux';
import * as chatActions from '../MiddleContainer/chatActions';
import * as roomActions from '../LeftContainer/roomActions';
import * as customerActions from './action/customerActions';
import * as noteActions from './action/noteActions';
import toastr from 'toastr';

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
    handleOnKeyUpTakeNote(event){
        if (event.keyCode === 13) {
            this.saveNote(this.state.newNote.trim());
        }
    }

    //on click to save note
    onClickSaveNote() {
        this.saveNote(this.state.newNote);
    }

    //take new note
    saveNote(content) {
        let note = {
            content: content,
            roomId: this.props.currentRoomId
        };
        console.log('new note', note);
        this.props.actions.saveNote(note)
            .then(() => this.setState({
                newNote: ""
            }))
            .catch(error => {
                console.log("error while saving note", error);
            });
    }

    //edit note
    editNote(id, event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            let newContent = event.target.value;
            console.log("new content", newContent);
            const {notes} = this.props;
            let oldNote = notes.filter(note => note.id === id)[0];
            if (oldNote.content === newContent) {
                console.log("nothing to save");
            } else {
                console.log(oldNote.content, newContent);
                console.log("changed");
            }
        }

    }


    render() {
        const {customer} = this.props;
        const {notes} = this.props;
        return (
            <RightComponent
                customer={customer}
                notes={notes}
                newNote={this.state.newNote}
                updateNoteState={this.updateNoteState}
                onClickSaveNote={this.onClickSaveNote}
                handleOnKeyUpTakeNote={this.handleOnKeyUpTakeNote}
                editNote={this.editNote.bind(this)}
            />
        );
    }
}

function mapStateToProps(state, ownProps) {
    let currentRoomId = state.currentRoomId;
    let customer = {};
    let notes = [];
    if (currentRoomId != null) {
        let room = state.rooms.filter(room => room.id === currentRoomId)[0];
        customer = room.customers[0];
        notes = room.notes;
    }
    return {
        customer: customer,
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
