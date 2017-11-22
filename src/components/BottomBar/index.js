import React from 'react'
import EmojiBoard from '../EmojiBoard/index'
import * as actions from '../../actions/action'
import moment from 'moment'

const getMessageFromClient = message => {
    const { senderId, senderName, messageType, messageFrom, content, fileName, createdAt } = message
    return {
        senderId,
        senderName,
        messageType,
        messageFrom,
        content,
        fileName,
        createdAt
    }
}
class BottomBar extends React.Component {
    constructor(props){
        super(props)
        this.state = {isShowEmojiBoard: false}
    }
    enter = e => {
        if (e.charCode === 13) {
            this.send()
        }
    }

    getMessageToSendServer = () => {
        const { currentRoom, agent } = this.props
        return {
            roomId: currentRoom.roomId,
            roomType: currentRoom.roomType,
            senderId: agent.id,
            senderName: agent.name,
            messageType: 100,
            messageFrom: 0,
            content: this.refs.chat.value,
            fileName: null,
            customer: currentRoom.customer,
            createdAt: moment().format('YYYY-MM-DD HH:mm:ss')
        }
    }

    send = () => {
        if (this.refs.chat.value == '') return false
        const msg = this.getMessageToSendServer()

        console.log('Message send:', msg)

        this.props.dispatch(actions.addMessageForRoom(msg.roomId, getMessageFromClient(msg)))

        this.props.dispatch(actions.clientSendMessage(msg))

        this.refs.chat.value = ''

        this.setState({isShowEmojiBoard: false})
    }

    uploadImage = () => {
        let msgToServer = this.getMessageToSendServer()
        let msgToState = getMessageFromClient(msgToServer)
        let input = this.refs.attach
        //validate input
        if (input.files && input.files[0]) {
            this.props.uploadImage(input.files[0], msgToServer, msgToState)
            this.refs.attach.value = ''
        }
        this.refs.chat.focus()
    }

    removeAttach() {
        this.refs.divPreview.setAttribute('style', 'display: none')
        this.refs.preview.setAttribute('src', '')
        this.refs.attach.files[0] = null
    }


    componentDidMount() {
        this.refs.chat.focus()
    }

    addEmoji(emoji) {
        this.refs.chat.value = this.refs.chat.value + emoji
    }

    showEmojiBoard = () => {
        this.setState({isShowEmojiBoard: !this.state.isShowEmojiBoard})
    }

    sendRequestJoinRoom() {
        this.props.adminSendRequestJoinRoom({room: this.props.currentRoom})
    }

    render() {

        return (
            <div className="bottom">
                <div className="chat-input">
                    <input className="form-control" ref="chat" onKeyPress={this.enter} type="text"
                    placeholder="Type here"/>
                </div>
                <div className="icon-button">
                    {/* <i className="fa fa-smile-o" onClick={this.showEmojiBoard}/> */}
                    <label>
                        <input type="file" accept="image/*" ref="attach" onChange={this.uploadImage}/>
                        <i className="fa fa-paperclip"/>
                    </label>
                    {/* <a className="button send" href="#"><i className="fa fa-paper-plane" aria-hidden="true"
                    onClick={this.send}/></a> */}
                </div>
                {this.state.isShowEmojiBoard && <EmojiBoard/>}
            </div>
        )
    }

}

export default BottomBar
