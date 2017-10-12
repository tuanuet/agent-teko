import React from 'react';
import {connect} from 'react-redux';
import LeftComponent from '../../components/left/LeftComponent';
import {bindActionCreators} from 'redux';
import * as roomActions from './roomActions';
import * as chatActions from '../MiddleContainer/chatActions';

class LeftContainer extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.adminChooseRoom = this.adminChooseRoom.bind(this);
    }

    /**
     * handle event when admin choose a room to chat
     * @param event
     */
    adminChooseRoom(roomId) {
        const {rooms} = this.props;
        let room = rooms.filter(room => roomId === room.id)[0];
        this.props.actions.adminChooseRoom(roomId);
        this.props.actions.messagesFetchRequested(room);
        this.props.actions.resetNumOfUnReadMessages(room);
    }

    /**
     * render method
     * @returns {XML}
     */
    render() {
        const {rooms} = this.props;
        return (
            <LeftComponent
                adminChooseRoom={this.adminChooseRoom}
                rooms={rooms}
            />
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        rooms: state.rooms,
        currentRoomId: state.currentRoomId,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({...{}, ...roomActions, ...chatActions}, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LeftContainer);
