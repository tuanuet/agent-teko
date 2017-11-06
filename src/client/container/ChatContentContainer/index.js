import React from 'react';
import {connect} from 'react-redux';
import ChatContent from '../../components/Middle/ChatContent'
import * as messageActions from './actions'
import { bindActionCreators } from 'redux'

class ChatContentContainer extends React.Component {
    render() {
      return (
        <ChatContent {...this.props}/>
      )

    }
}

function mapStateToProps(state, ownProps) {
    let availableRoomId = state.currentRoomId;
    let availableRoom = state.rooms.filter(room => room.id === availableRoomId)[0];
    if(!availableRoom) return {messages : []};
    let messages = availableRoom.messages;
    return {
        currentRoomId: state.currentRoomId,
        nextFetchingRoom: availableRoom.nextFetchingRoom || state.currentRoomId,
        messages
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({...messageActions}, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatContentContainer);
