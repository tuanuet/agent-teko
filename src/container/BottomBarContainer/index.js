import React from 'react';
import {connect} from 'react-redux';
import BottomBar from '../../components/BottomBar';
import {uploadFile} from './actions';
import * as types from '../../constants/actionTypes';
import AcceptRoom from '../../components/BottomBar/AcceptRoom';
import ReopenRoom from '../../components/BottomBar/ReopenRoom';
import {bindActionCreators} from 'redux';
import * as roomActions from '../LeftContainer/roomActions';


class BottomBarContainer extends React.Component {

    sendRequestJoinRoom = () => {
        const { currentRoom } = this.props;
        this.props.adminSendRequestJoinRoom(currentRoom);
        const $ = window.jQuery = window.$
        $('.nav-tabs a[href="#chat"]').tab('show')
    }

    sendReopenRoom = async roomId => {
        const { actions } = this.props

        await actions.sendReopenRoom(roomId)
        const $ = window.jQuery = window.$
        $('.nav-tabs a[href="#chat"]').tab('show')
    }

    render() {
        const { currentRoom, agent } = this.props
        if (!agent) return false

        const { role: { slug } } = agent
        if (currentRoom.roomStatus === 3 && currentRoom.roomType === 'facebook') {
            if (slug !== 'agent' && slug !== 'operator' && slug !== 'developer') return false
            return <ReopenRoom
                {...this.props}
                sendReopenRoom={this.sendReopenRoom} />
        }
        if (currentRoom.roomStatus === 3 && currentRoom.roomType === 'default') {
            return false
        }
        if (currentRoom.roomStatus === 1) {
            if (slug !== 'agent' && slug !== 'developer') return false
            return <AcceptRoom sendRequestJoinRoom={this.sendRequestJoinRoom} />
        }
        return <BottomBar {...this.props} />
    }
}

function mapStateToProps(state) {
    const currentRoom = state.rooms.find(room => room.roomId === state.currentRoomId);
    return {
        currentRoom,
        agent : state.agent
    };
}
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({...{}, ...roomActions}, dispatch),
        dispatch,
        uploadFile: data => {
            dispatch(uploadFile(data))
        },
        adminSendRequestJoinRoom: room => {
            dispatch({type: types.JOIN_ROOM_TO_NODE_SERVER, room});
        }
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(BottomBarContainer);
