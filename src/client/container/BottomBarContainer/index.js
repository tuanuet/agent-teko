import React from 'react';
import {connect} from 'react-redux';
import BottomBar from '../../components/BottomBar';
import {uploadImage} from './actions';
import * as types from '../../constants/actionTypes';
import AcceptRoom from '../../components/BottomBar/AcceptRoom';
import ReopenRoom from '../../components/BottomBar/ReopenRoom';
import {bindActionCreators} from 'redux';
import * as roomActions from '../LeftContainer/roomActions';


class BottomBarContainer extends React.Component {

    sendRequestJoinRoom() {
        const {currentRoom} = this.props;
        this.props.actions.sendRequestJoinRoomToPHPServer(currentRoom);
    }

    sendReopenRoom = roomId => {
        const { actions } = this.props

        actions.sendReopenRoom(roomId)
    }

    render() {
        const { currentRoom } = this.props

        // if (currentRoom.status === 3 && currentRoom.roomType === 'facebook') {
        //     return <ReopenRoom
        //         {...this.props}
        //         sendReopenRoom={this.sendReopenRoom} />
        // }
        // if (currentRoom.status === 3 && currentRoom.roomType === 'default') {
        //     return false
        // }
        if (currentRoom.status === 3 && currentRoom.roomType !== 'facebook') {
            return false
        }
        if (currentRoom.status === 1) {
            return <AcceptRoom sendRequestJoinRoom={this.sendRequestJoinRoom.bind(this)} />
        }
        return (
            <BottomBar {...this.props}/>
        );
    }
}

function mapStateToProps(state) {
    const currentRoom = state.rooms.find(room => room.id === state.currentRoomId);
    return {
        currentRoom,
        agent : state.agent,
    };
}
function mapDispatchToProps(dispatch) {
    return{
        actions: bindActionCreators({...{}, ...roomActions}, dispatch),
        dispatch,
        uploadImage : (formData,msg,msgToState) => {
            dispatch(uploadImage(formData,msg,msgToState));
        },
        adminSendRequestJoinRoom: ({room}) => {
            dispatch({type: types.JOIN_ROOM_TO_PHP_SERVER_REQUESTED, room});
        }
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(BottomBarContainer);
