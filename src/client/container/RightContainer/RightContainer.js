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
        console.log("on change");
        const note = event.target.value;
        this.setState({
            newNote: note
        });
    }

    //handle on key up take note
    handleOnKeyUpTakeNote(event){
        if (event.keyCode === 13) {
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



    render() {
        const {customer} = this.props;
        const {notes} = this.props;
        const {currentRoomId} = this.props;
        if (!currentRoomId) {
            return (
                <div>WELCOME</div>
            );
        }
        return (
            <RightComponent
                customer={customer}
                notes={notes}
                newNote={this.state.newNote}
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
