import React from 'react'
import ListMessage from '../ListMessage'
import ReactDOM from 'react-dom'

class Scroll extends React.Component {
    constructor(props) {
        super(props)
        this.activeScroll = false
        this.currentChatHeight = 0
    }

    scrollToBottom = () => {
        const chatNode = ReactDOM.findDOMNode(this.messagesContainer)
        chatNode.scrollIntoView(false)
    }

    scrollDown = value => {
        const chatNode = ReactDOM.findDOMNode(this.messagesContainer)
        chatNode.parentNode.scrollTop = chatNode.parentNode.scrollTop + value
    }

    componentDidMount() {
        this.scrollToBottom()
    }

    componentWillReceiveProps = nextProps => {
        const { messages, currentRoomId, currentRoom } = this.props
        const { currentRoom: nextRoom, currentRoomId: nextCurrentRoomId, isSearching } = nextProps

        if (currentRoomId !== nextCurrentRoomId) {
            this.activeScroll = true
        } else if (JSON.stringify(currentRoom.messages ? currentRoom.messages.slice(-1).pop() : {})
            !== JSON.stringify(nextRoom.messages ? nextRoom.messages.slice(-1).pop() : {})) {
            this.activeScroll = true
        }
    }

    componentDidUpdate = () => {
        const chatNode = ReactDOM.findDOMNode(this.messagesContainer)
        const { isLoadingMessages, isSearching, currentIndex, currentRoom, searchMessage } = this.props
        const { roomInfo } = currentRoom

        if (this.activeScroll) {
            this.scrollToBottom()
            this.activeScroll = false
            this.currentChatHeight = chatNode.scrollHeight
        } else if (this.currentChatHeight !== chatNode.scrollHeight) {
            chatNode.parentNode.scrollTop = chatNode.scrollHeight - this.currentChatHeight
            this.currentChatHeight = chatNode.scrollHeight
        } else if (isLoadingMessages) {
            this.scrollToBottom()
        } else if (isSearching) {
            const matchingItems = document.querySelectorAll('[class^="search-matching-item"]')
            if (matchingItems.length === 0) return false
            matchingItems.forEach(item => item.removeAttribute('style'))
            const matchingItem = matchingItems[matchingItems.length - currentIndex - 1]
            chatNode.parentNode.scrollTop = matchingItem.offsetTop - 200
            matchingItem.style.background = '#fffd4a'
        }

        if (roomInfo && roomInfo.seenAt) { // Keep scroll if Seen message
            chatNode.parentNode.scrollTop = chatNode.parentNode.scrollTop + 16 // Height of Seen message
        }
    }

    render() {
        const { theme } = this.props
        return (
            <div className={`body ${theme}`} >
                <ListMessage
                    ref={el => { this.messagesContainer = el }}
                    {...this.props}
                    scrollToBottom={this.scrollToBottom}
                />
                <div style={{float: 'left', clear: 'both'}}>
                </div>
            </div>
        )
    }
}

export default Scroll
