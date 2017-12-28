import React, {PropTypes} from 'react'
import SearchBar from './SearchBar'
import TabBar from './TabBar'
import AvailableRooms from './AvailableRooms'
import EnableRooms from './EnableRooms'
import ClosedRooms from './ClosedRooms'
import * as config from '../../constants/config'
import { CLOSED_ROOM_PAGING_VALUE } from '../../constants/config'

class LeftComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currentTab: 'available',
            searchValue: '',
            searchType: '',
            filterBy: 'all',
            now: Date.now()
        }
    }

    componentDidMount() {
        this.updateInterval = setInterval(() => this.setState({ now: Date.now() }), 1000 * 60)
    }

    componentDidUpdate() {
        const { rooms } = this.props
        const numOfUnReadRoom = rooms.filter(room => room.roomStatus === 2 && room.roomInfo && room.roomInfo.numOfUnReadMessages && !room.tags.find(tag => tag.title === 'Spam')).length

        if (numOfUnReadRoom === 0) {
            document.title = config.DEFAULT_TITLE
        } else {
            document.title = `(${numOfUnReadRoom}) ${config.DEFAULT_TITLE}`
        }
    }

    changeCurrentTab = value => {
        const { currentTab } = this.state
        const { actions, loadClosedRoom } = this.props
        this.setState({
            currentTab: value
        })
    }

    resetSearchType = () => {
        const { currentTab } = this.state
        const { actions, loadClosedRoom } = this.props
        this.setState({
            searchType: '',
            searchValue: ''
        }, () => {
            actions.removeAllClosedRooms()
            loadClosedRoom()
        })
    }

    searchRooms = type => {
        const { currentTab, searchValue } = this.state
        const { actions, loadClosedRoom } = this.props

        this.setState({
            searchType: type
        }, () => {
            actions.removeAllClosedRooms()
            loadClosedRoom(searchValue, type)
        })
    }

    changeSearchValue = e => {
        this.setState({
            searchValue: e.target.value
        })
    }

    changeFilterBy = value => {
        this.setState({
            filterBy: value
        })
    }

    componentWillUnmount() {
        clearInterval(this.updateInterval)
    }

    render() {
        const { currentTab, searchType, searchValue, filterBy } = this.state
        const { rooms, adminChooseRoom, currentRoomId, loadClosedRoom, isHavingMoreClosed, isLoadingRooms, isLoadingMoreRooms } = this.props

        const filterAvailable = room => {
            if (filterBy === 'unread') {
                if (!room.roomInfo) return false
                if (room.roomInfo.numOfUnReadMessages === 0) return false
                return true
            } else if (filterBy === 'misschat') {
                if (!room.roomInfo) return false
                if (!room.roomInfo.latestMessage) return false
                if (room.roomInfo.latestMessage.messageFrom === 0) return false
                return true
            } else if (filterBy === 'all') return true
            else return false
        }

        const searchRooms = room => {
            const { customer } = room
            const { notes, tags } = customer
            if (!searchType) {
                if (room.tags.find(tag => tag.title === 'Spam')) return false
                return true
            } else if (searchType === 'customer') {
                const { name, phone } = customer
                return name.toLowerCase().includes(searchValue.toLowerCase())
                    || phone.toLowerCase().includes(searchValue.toLowerCase())
            } else if (searchType === 'tag') {
                return tags.some(tag => {
                    const { title } = tag
                    return title.toLowerCase().includes(searchValue.toLowerCase())
                })
            } else if (searchType === 'note') {
                return notes.some(note => {
                    const { content }  = note
                    return content.toLowerCase().includes(searchValue.toLowerCase())
                })
            } else return false
        }

        const availableRooms = rooms.filter(room => room.roomStatus === 2).filter(searchRooms).filter(filterAvailable)
        const enableRooms = rooms.filter(room => room.roomStatus === 1).filter(searchRooms)
        const closedRooms = rooms.filter(room => room.roomStatus === 3)

        return <div className="left">
            <TabBar
                currentTab={currentTab}
                loadClosedRoom={loadClosedRoom}
                numberOfEnableRooms={enableRooms.length}
                numberOfActiveRooms={availableRooms.length}
                changeCurrentTab={this.changeCurrentTab} />
            <SearchBar
                currentTab={currentTab}
                searchType={searchType}
                searchValue={searchValue}
                filterBy={filterBy}
                searchRooms={this.searchRooms}
                resetSearchType={this.resetSearchType}
                changeSearchValue={this.changeSearchValue}
                changeFilterBy={this.changeFilterBy} />
            { !isLoadingRooms ? <div className="tab-content">
                <AvailableRooms
                    currentTab={currentTab}
                    currentRoomId={currentRoomId}
                    availableRooms={availableRooms}
                    adminChooseRoom={adminChooseRoom}
                />
                <EnableRooms
                    currentTab={currentTab}
                    currentRoomId={currentRoomId}
                    enableRooms={enableRooms}
                    adminChooseRoom={adminChooseRoom}
                />
                <ClosedRooms
                    currentTab={currentTab}
                    currentRoomId={currentRoomId}
                    closedRooms={closedRooms}
                    adminChooseRoom={adminChooseRoom}
                    isHavingMoreClosed={isHavingMoreClosed}
                    isLoadingMoreRooms={isLoadingMoreRooms}
                    loadClosedRoom={loadClosedRoom}
                    searchValue={searchValue}
                    searchType={searchType}
                />
            </div> : <div className="text-center">
                <i className="fa fa-circle-o-notch fa-spin fa-1x fa-fw" style={{ color: '#2b7ec9' }}></i>
                <span className="sr-only">Loading...</span>
            </div> }
        </div>
    }

}

LeftComponent.propTypes = {
    rooms: PropTypes.array.isRequired,
    adminChooseRoom: PropTypes.func.isRequired,
};

export default LeftComponent;
