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
    const { currentRoomId } = state;
    let currentRoom = state.rooms.find(room => room.roomId === currentRoomId);
    if (!currentRoom) return {messages : []};
    const messages = currentRoom.messages;
    return {
        currentRoomId,
        nextFetchingRoom: currentRoom.nextFetchingRoom || state.currentRoomId,
        messages
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({...messageActions}, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatContentContainer);
