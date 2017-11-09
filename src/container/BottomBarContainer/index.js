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
        const { currentRoom } = this.props;
        this.props.adminSendRequestJoinRoom(currentRoom);
    }

    sendReopenRoom = async roomId => {
        const { actions } = this.props

        await actions.sendReopenRoom(roomId)
        location.reload()
    }

    render() {
        const { currentRoom } = this.props

        if (currentRoom.roomStatus === 3 && currentRoom.roomType === 'facebook') {
            return <ReopenRoom
                {...this.props}
                sendReopenRoom={this.sendReopenRoom} />
        }
        if (currentRoom.roomStatus === 3 && currentRoom.roomType === 'default') {
            return false
        }
        if (currentRoom.roomStatus === 1) {
            return <AcceptRoom sendRequestJoinRoom={this.sendRequestJoinRoom.bind(this)} />
        }
        return <BottomBar {...this.props} />
    }
}

function mapStateToProps(state) {
    const currentRoom = state.rooms.find(room => room.roomId === state.currentRoomId);
    return {
        currentRoom,
        agent : state.agent,
    };
}
function mapDispatchToProps(dispatch) {
    return{
        actions: bindActionCreators({...{}, ...roomActions}, dispatch),
        dispatch,
        uploadImage: (formData,msg,msgToState) => {
            dispatch(uploadImage(formData,msg,msgToState));
        },
        adminSendRequestJoinRoom: room => {
            dispatch({type: types.JOIN_ROOM_TO_NODE_SERVER, room});
        }
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(BottomBarContainer);
