import React from 'react';
import {connect} from 'react-redux';
import LeftComponent from '../../components/left/LeftComponent';
import {bindActionCreators} from 'redux';
import * as roomActions from './roomActions';

class LeftContainer extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.adminChooseRoom = this.adminChooseRoom.bind(this);
    }

    /**
     * handle event when admin choose a room to chat
     * @param event
     */
    adminChooseRoom(event) {
        let roomId = event.target.value;
        console.log("roomid", roomId);
        this.props.actions.adminChooseRoom(roomId);
    }

    /**
     * render method
     * @returns {XML}
     */
    render() {
        const {rooms} = this.props;
        console.log("rooms", rooms);
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
        rooms: state.rooms
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({...{}, ...roomActions}, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LeftContainer);
