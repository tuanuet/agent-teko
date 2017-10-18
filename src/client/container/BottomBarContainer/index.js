import React from 'react';
import {connect} from 'react-redux';
import BottomBar from '../../components/BottomBar';
import {uploadImage} from './actions';
import * as types from '../../constants/actionTypes';
import AcceptRoom from '../../components/BottomBar/AcceptRoom';
import {bindActionCreators} from 'redux';
import * as roomActions from '../LeftContainer/roomActions';


class BottomBarContainer extends React.Component {

    sendRequestJoinRoom() {
        const {currentRoom} = this.props;
        this.props.actions.sendRequestJoinRoomToPHPServer(currentRoom);
    }

    render() {
        const {currentRoom} = this.props;
        if (currentRoom.status === 1) {
            return <AcceptRoom sendRequestJoinRoom={this.sendRequestJoinRoom.bind(this)}/>;
        }
        return (
            <BottomBar {...this.props}/>
        );
    }
}

function mapStateToProps(state) {
    let currentRoom = state.rooms.filter(room => room.id === state.currentRoomId)[0];
    return {
        currentRoom: currentRoom,
        agent : state.agent,
    };
}
function mapDispatchToProps(dispatch) {
    return{
        actions: bindActionCreators({...{}, ...roomActions}, dispatch),
        dispatch,
        uploadImage : ({formData}) => {
            dispatch(uploadImage(formData));
        },
        adminSendRequestJoinRoom: ({room}) => {
            dispatch({type: types.JOIN_ROOM_TO_PHP_SERVER_REQUESTED, room});
        }
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(BottomBarContainer);
