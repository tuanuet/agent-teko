import React from 'react';
import {connect} from 'react-redux';
import RightComponent from '../../components/right/RightComponent';
import {bindActionCreators} from 'redux';
import * as chatActions from '../MiddleContainer/chatActions';
import * as roomActions from '../LeftContainer/roomActions';
import * as customerActions from './action/customerActions';

class RightContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            newNote: ""
        };
        this.updateNoteState = this.updateNoteState.bind(this);
    }

    //update when input a note
    updateNoteState(event) {
        const note = event.target.value;
        this.setState({
            newNote: note
        });
    }

    //take new note
    saveNote(event) {
        const note = event.target.value;

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
        actions: bindActionCreators({...{}, ...roomActions, ...chatActions ,...customerActions}, dispatch)
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(RightContainer);
