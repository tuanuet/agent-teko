import React from 'react'
import ListMessage from '../ListMessage'
import * as ReactDOM from "react-dom"


class Scroll extends React.Component {
    constructor(props) {
        super(props)
        this.activeScroll = false
        this.currentChatHeight = 0
        this.scrollToBottom = this.scrollToBottom.bind(this)
    }

    scrollToBottom() {
        const messagesContainer = ReactDOM.findDOMNode(this.messagesContainer)
        messagesContainer.scrollTop = messagesContainer.scrollHeight
    }

    componentDidMount() {
        this.scrollToBottom()
    }

    componentWillReceiveProps = nextProps => {
        const { messages, currentRoomId } = this.props
        const { messages: nextMessages, currentRoomId: nextCurrentRoomId } = nextProps

        if (currentRoomId !== nextCurrentRoomId) {
            this.activeScroll = true
        } else if (JSON.stringify(messages ? messages.slice(-1).pop() : {})
            !== JSON.stringify(nextMessages ? nextMessages.slice(-1).pop() : {})) {
            this.activeScroll = true
        }
    }

    calculateScroll = () => {
        this.activeScroll = false
    }

    componentDidUpdate = () => {
        const chatNode = ReactDOM.findDOMNode(this.messagesContainer)

        if (this.activeScroll) {
            this.scrollToBottom()
            this.activeScroll = false
            this.currentChatHeight = chatNode.scrollHeight
        } else if (this.currentChatHeight !== chatNode.scrollHeight) {
            chatNode.scrollTop = chatNode.scrollHeight - this.currentChatHeight
            this.currentChatHeight = chatNode.scrollHeight
        }
    }

    render() {
        const { theme } = this.props
        return (
            <div className={`body ${theme}`}  ref={(el) => { this.messagesContainer = el }}>
                <ListMessage
                    {...this.props}
                    calculateScroll={this.calculateScroll}
                />
                <div style={{float: 'left', clear: 'both'}}>
                </div>
            </div>
        )
    }
}

export default Scroll
