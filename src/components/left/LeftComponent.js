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
            currentClosedRoomSearchValue: '',
            now: Date.now()
        }
    }

    componentDidMount() {
        this.updateInterval = setInterval(() => this.setState({ now: Date.now() }), 1000 * 60)
    }

    checkSubmitSearch = e => {
        if (e.keyCode === 13) {
            this.searchClosedRooms()
        }
    }

    changeCurrentTab = value => {
        this.setState({
            currentTab: value,
            searchValue: ''
        })
    }

    changeSearchValue = e => {
        this.setState({
            searchValue: e.target.value
        })
    }

    searchClosedRooms = () => {
        const { loadClosedRoom, actions } = this.props
        const { searchValue } = this.state
        this.setState({
            currentClosedRoomSearchValue: searchValue
        })
        actions.removeAllClosedRooms()
        loadClosedRoom(searchValue)
    }

    componentWillUnmount() {
        clearInterval(this.updateInterval)
    }

    render() {
        const { currentTab, searchValue, currentClosedRoomSearchValue } = this.state
        const { rooms, adminChooseRoom, currentRoomId, loadClosedRoom, isHavingMoreClosed, isLoadingMoreRooms } = this.props
        const filterCondition = room => {
            if (currentTab === 'closed') return true
            if (room.customer.name.toLowerCase().includes(searchValue.toLowerCase())) return true
            return room.tags.some(tag => tag.title.toLowerCase().includes(searchValue.toLowerCase()))
        }

        const availableRooms = rooms.filter(room => room.roomStatus === 2).filter(filterCondition)
        const enableRooms = rooms.filter(room => room.roomStatus === 1).filter(filterCondition)
        const closedRooms = rooms.filter(room => room.roomStatus === 3)

        const numOfUnReadRoom = rooms.filter(room => room.roomStatus === 2 && room.roomInfo && room.roomInfo.numOfUnReadMessages).length

        if (numOfUnReadRoom === 0) {
            document.title = config.DEFAULT_TITLE
        } else {
            document.title = `(${numOfUnReadRoom}) ${config.DEFAULT_TITLE}`
        }

        return <div className="left">
            <TabBar
                currentTab={currentTab}
                loadClosedRoom={loadClosedRoom}
                numberOfEnableRooms={enableRooms.length}
                changeCurrentTab={this.changeCurrentTab} />
            <SearchBar
                currentTab={currentTab}
                searchValue={searchValue}
                currentClosedRoomSearchValue={currentClosedRoomSearchValue}
                changeSearchValue={this.changeSearchValue}
                searchClosedRooms={this.searchClosedRooms}
                checkSubmitSearch={this.checkSubmitSearch} />
            <div className="tab-content">
                <AvailableRooms
                    currentTab={currentTab}
                    currentRoomId={currentRoomId}
                    availableRooms={availableRooms}
                    adminChooseRoom={adminChooseRoom}
                />
                <EnableRooms
                    currentTab={currentTab}
                    enableRooms={enableRooms}
                    adminChooseRoom={adminChooseRoom}
                />
                <ClosedRooms
                    currentTab={currentTab}
                    closedRooms={closedRooms}
                    currentRoomId={currentRoomId}
                    currentClosedRoomSearchValue={currentClosedRoomSearchValue}
                    adminChooseRoom={adminChooseRoom}
                    isHavingMoreClosed={isHavingMoreClosed}
                    isLoadingMoreRooms={isLoadingMoreRooms}
                    loadClosedRoom={loadClosedRoom}
                />
            </div>
        </div>
    }

}

LeftComponent.propTypes = {
    rooms: PropTypes.array.isRequired,
    adminChooseRoom: PropTypes.func.isRequired,
};

export default LeftComponent;
