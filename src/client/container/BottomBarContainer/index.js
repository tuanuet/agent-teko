import React from 'react';
import {connect} from 'react-redux';
import BottomBar from '../../components/BottomBar';
import {addMessage, setImage} from '../../actions/action';
import {getMetaLink, uploadImage} from './actions';


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
            dispatch({type: 'ADMIN_SEND_REQUEST_JOIN_ROOM', room})
        }
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(BottomBarContainer);
