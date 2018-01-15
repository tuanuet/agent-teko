import React from 'react'
import { connect } from 'react-redux'
import ChatContent from '../../components/Middle/ChatContent'
import Header from '../../components/Middle/Header'
import BottomBarContainer from '../BottomBarContainer'
import * as messageActions from '../ChatContentContainer/actions'
import { bindActionCreators } from 'redux'

class MiddleContainer extends React.Component {
    constructor(props) {
        super(props)
        this.changeTheme = this.changeTheme.bind(this)

        const localStorage = window.localStorage
        const color = localStorage.getItem('themeColor')
        this.state = {
            theme: color ? color : 'blue',
            searchMessage: '',
            isSearching: false,
            numResult: 0,
            currentIndex: 0
        }
    }

    componentWillReceiveProps = nextProps => {
        const { currentRoomId } = this.props
        if (currentRoomId !== nextProps.currentRoomId) {
            this.setState({
                searchMessage: '',
                isSearching: false,
                numResult: 0,
                currentIndex: 0
            })
        }
    }

    changeTheme(e) {
        const localStorage = window.localStorage
        const color = e.target.className
        localStorage.setItem('themeColor', color)
        this.setState({theme: color})
    }

    changeSearchMessage = e => {
        this.setState({
            searchMessage: e.target.value
        })
    }

    closeSearching = () => {
        const matchingItems = document.querySelectorAll('[class^="search-matching-item"]')
        matchingItems.forEach(item => item.removeAttribute('style'))

        this.setState({
            searchMessage: '',
            isSearching: false
        })
    }

    goSearching = async () => {
        const { searchMessage } = this.state
        const { actions, currentRoom } = this.props
        if (!searchMessage) return false
        let countResult = 0

        while (this.props.nextFetchingRoom !== -1) {
            await actions.fetchMoreMessages(this.props.nextFetchingRoom, this.props.currentRoomId)
        }

        this.props.currentRoom.messages.forEach(msg => {
            const { messageType, content } = msg
            if (!content) return false
            if (messageType !== 100) return false
            if (content.toLowerCase().includes(searchMessage.toLowerCase())) countResult++
        })
        this.setState({
            isSearching: true,
            numResult: countResult,
            currentIndex: 0
        })
    }

    keyPressSearch = e => {
        if (e.keyCode === 13) {
            this.goSearching()
        }
    }

    increaseIndex = () => {
        const { currentIndex, numResult } = this.state
        if (numResult === 0 || currentIndex === numResult - 1) return false
        this.setState(prevState => ({
            currentIndex: prevState.currentIndex + 1
        }))
    }

    decreaseIndex = () => {
        const { currentIndex, numResult } = this.state
        if (currentIndex === 0) return false
        this.setState(prevState => ({
            currentIndex: prevState.currentIndex - 1
        }))
    }

    render() {
        const { currentRoomId, isLoadingMessages, isMobile, isShowInfo, toggleShowInfo, isShowOrderCreate, toggleShowOrderCreate } = this.props
        const { theme, searchMessage, isSearching, numResult, currentIndex } = this.state

        if (!currentRoomId) return false
        if (isMobile && isShowInfo) return false

        return <div className={`middle ${isMobile ? `is-mobile` : ``} ${isShowOrderCreate ? `show-order-create` : ``}`}>
            <Header
                isMobile={isMobile}
                toggleShowInfo={toggleShowInfo}
                isShowOrderCreate={isShowOrderCreate}
                toggleShowOrderCreate={toggleShowOrderCreate}
                searchMessage={searchMessage}
                isSearching={isSearching}
                numResult={numResult}
                currentIndex={currentIndex}
                isLoadingMessages={isLoadingMessages}
                changeTheme={this.changeTheme}
                closeSearching={this.closeSearching}
                goSearching={this.goSearching}
                keyPressSearch={this.keyPressSearch}
                increaseIndex={this.increaseIndex}
                decreaseIndex={this.decreaseIndex}
                changeSearchMessage={this.changeSearchMessage}
            />

            <ChatContent
                theme={theme}
                isSearching={isSearching}
                searchMessage={searchMessage}
                currentIndex={currentIndex}
                {...this.props}
            />

            <BottomBarContainer isMobile={isMobile} />
        </div>
    }
}

function mapStateToProps(state, ownProps) {
    const { currentRoomId, isLoadingMessages } = state
    const currentRoom = state.rooms.find(room => room.roomId === state.currentRoomId)
    return {
        currentRoomId,
        currentRoom,
        nextFetchingRoom: currentRoom && currentRoom.nextFetchingRoom || state.currentRoomId,
        isLoadingMessages
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({...messageActions}, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MiddleContainer)
