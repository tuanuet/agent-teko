
import React from 'react';
import EmojiBoard from '../EmojiBoard/index';
import * as actions from '../../actions/action';

function getMessageFromClient(message) {
    return {
        id : null,
        senderId: message.senderId,
        messageType: message.type,
        messageFrom: message.messageFrom,
        checkedMetaLink: false,
        senderName: message.name,
        content: message.message.content,
        name: message.fileName,
        createdAt : message.createdAt
    };
}
class BottomBar extends React.Component {

    enter(e) {
        if (e.charCode === 13) {
            this.send();
        }
    }

    send() {
        let {currentRoom,agent} = this.props;
        let roomId = currentRoom.id;
        let content = this.refs.chat.value;
        let senderId = agent.id;
        let name = agent.name;
        let customers = currentRoom.customers;
        let roomType = currentRoom.roomType;
        let msg = {
            message: {content},
            roomId,
            senderId,
            name,
            customers,
            roomType: roomType,
            type : 100,
            messageFrom: 0,
            createdAt:new Date().toLocaleString()
        };
        this.props.dispatch(actions.addMessageForRoom(roomId,getMessageFromClient(msg)));

        this.props.dispatch(actions.clientSendMessage(msg));

        this.refs.chat.value = '';

        this.setState({isShowEmojiBoard: false});
    }

    uploadImage() {
        console.log('upload');
        let input = this.refs.attach;
        let name = this.props.customer.name;
        //todo : validate input
        if (input.files && input.files[0]) {
            let formData = new FormData();

            formData.append('fileToUpload', input.files[0]);

            this.props.uploadImage({formData, name});
            this.refs.attach.value = '';
        }
        this.refs.chat.focus();
    }

    //
    // componentWillUpdate(nextProps, nextState) {
    //     if (nextProps.image.url) {
    //         let {room, customer} = this.props;
    //         let roomId = room.id;
    //         let senderId = customer.customerId;
    //         let name = customer.name;
    //         this.props.socket.emit('client-send-message', {
    //             message:
    //                 {type: 103, content: nextProps.image.url},
    //             roomId,
    //             senderId,
    //             name
    //         }, (success) => {
    //             console.log(success);
    //         });
    //         this.props.dispatch(setImage({url: null}));
    //     }
    // }

    removeAttach() {
        this.refs.divPreview.setAttribute('style', 'display: none');
        this.refs.preview.setAttribute('src', '');
        this.refs.attach.files[0] = null;
    }


    componentDidMount() {
        this.refs.chat.focus();
    }

    addEmoji(emoji) {
        this.refs.chat.value = this.refs.chat.value + emoji;
    }

    constructor(props) {
        super(props);
        this.state = {isShowEmojiBoard: false};
    }

    showEmojiBoard() {
        this.setState({isShowEmojiBoard: !this.state.isShowEmojiBoard});
    }

    sendRequestJoinRoom() {
        this.props.adminSendRequestJoinRoom({room: this.props.currentRoom});
    }


    render() {

        return (
            <div className="bottom">
                <div className="chat-input">
                    <input className="form-control" ref="chat" onKeyPress={this.enter.bind(this)} type="text"
                           placeholder="Type here"/>
                </div>
                <div className="icon-button">
                    <i className="fa fa-smile-o" onClick={this.showEmojiBoard.bind(this)}/>
                    <label>
                        <input type="file" accept="image/*" ref="attach" onChange={this.uploadImage.bind(this)}/>
                        <i className="fa fa-paperclip"/>
                    </label>
                    <a className="button send" href="#"><i className="fa fa-paper-plane" aria-hidden="true"
                                                           onClick={this.send.bind(this)}/></a>
                </div>
                {this.state.isShowEmojiBoard ? <EmojiBoard/> : ''}
            </div>
        );
    }

}

export default BottomBar;