import React, {PropTypes} from 'react'
import SearchBar from './SearchBar'
import TabBar from './TabBar'
import AvailableRooms from './AvailableRooms'
import EnableRooms from './EnableRooms'
import ClosedRooms from './ClosedRooms'
import * as config from '../../constants/config'
import { CLOSED_ROOM_PAGING_VALUE } from '../../constants/config'

const INIT_SEARCH_DATA = {
    'customer'  : '',
    'tag'       : '',
    'note'      : '',
    'message'   : ''
}

class LeftComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currentTab: 'available',
            searchData: INIT_SEARCH_DATA,
            isSearchMode: false,
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

    resetSearchData = () => {
        const { actions, loadClosedRoom } = this.props
        this.setState({
            searchData: INIT_SEARCH_DATA,
            isSearchMode: false
        }, () => {
            actions.removeAllClosedRooms()
            loadClosedRoom()
        })
    }

    searchRooms = () => {
        const { currentTab, searchData } = this.state
        const { actions, loadClosedRoom } = this.props
        if (!searchData['customer'] && !searchData['tag'] && !searchData['note'] && !searchData['message']) return false
        this.setState({
            isSearchMode: true
        }, () => {
            actions.removeAllClosedRooms()
            loadClosedRoom(searchData)
        })
    }

    changeSearchValue = type => e => {
        e.preventDefault()
        const value = e.target.value
        this.setState(prevState => ({
            searchData: {
                ...prevState.searchData,
                [type]: value
            }
        }))
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
        const { currentTab, searchData, filterBy, isSearchMode } = this.state
        const { rooms, adminChooseRoom, currentRoomId, loadClosedRoom, isHavingMoreClosed, isLoadingRooms, isLoadingMoreRooms, isMobile } = this.props

        if (isMobile && currentRoomId) return false // Hidden if mobile

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
            if (!isSearchMode) {
                if (room.tags.find(tag => tag.title === 'Spam')) return false
                return true
            }
            if (searchData['customer']) {
                const { name, phone } = customer
                if (!name.toLowerCase().includes(searchData['customer'].toLowerCase())
                    && !phone.toLowerCase().includes(searchData['customer'].toLowerCase())) return false
            }
            if (searchData['tag']) {
                const condition = tags.some(tag => {
                    const { title } = tag
                    return title.toLowerCase().includes(searchData['tag'].toLowerCase())
                })
                if (!condition) return false
            }
            if (searchData['note']) {
                const condition = notes.some(note => {
                    const { content }  = note
                    return content.toLowerCase().includes(searchData['note'].toLowerCase())
                })
                if (!condition) return false
            }
            return true
        }

        const availableRooms = rooms.filter(room => room.roomStatus === 2).filter(searchRooms).filter(filterAvailable)
        const enableRooms = rooms.filter(room => room.roomStatus === 1).filter(searchRooms)
        const closedRooms = rooms.filter(room => room.roomStatus === 3)

        return <div className={`left ${isMobile ? `is-mobile` : ``}`}>
            <TabBar
                currentTab={currentTab}
                loadClosedRoom={loadClosedRoom}
                numberOfEnableRooms={enableRooms.length}
                numberOfActiveRooms={availableRooms.length}
                changeCurrentTab={this.changeCurrentTab} />
            <SearchBar
                currentTab={currentTab}
                searchData={searchData}
                isSearchMode={isSearchMode}
                filterBy={filterBy}
                searchRooms={this.searchRooms}
                resetSearchData={this.resetSearchData}
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
                    searchData={searchData}
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
