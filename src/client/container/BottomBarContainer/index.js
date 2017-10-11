import React from 'react';
import {connect} from 'react-redux';
import BottomBar from '../../components/BottomBar';
import {addMessage, setImage} from '../../actions/action';
import {getMetaLink, uploadImage} from './actions';
import * as types from '../../constants/actionTypes';


class BottomBarContainer extends React.Component {

    render() {
        return (
            <BottomBar {...this.props}/>
        );
    }
}

function mapStateToProps(state) {
    let currentRoom = state.rooms.filter(room => room.id === state.currentRoomId)[0];
    return {
        currentRoom: currentRoom,
        customer: state.customer,
        image : state.image,
    };
}
function mapDispatchToProps(dispatch) {
    return{
        dispatch,
        sendMessage : ({name,content}) => {
            let date = new Date().getHours() + ':' + new Date().getMinutes();
            dispatch(addMessage({typeSender: 'self', sender: name, message:{content}, time:date}));
        },
        uploadImage : ({formData}) => {
            dispatch(uploadImage(formData));
        },
        adminSendRequestJoinRoom: ({room}) => {
            // console.log("run admin send request join room", room);
            dispatch({type: types.JOIN_ROOM_TO_PHP_SERVER_REQUESTED, room})
        }
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(BottomBarContainer);
