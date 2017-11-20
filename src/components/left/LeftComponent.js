import React, {PropTypes} from 'react'
import SearchBar from './SearchBar'
import TabBar from './TabBar'
import AvailableRooms from './AvailableRooms'
import EnableRooms from './EnableRooms'
import ClosedRooms from './ClosedRooms'
import * as config from '../../constants/config'

class LeftComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currentTab: 'available',
            searchValue: ''
        }
    }

    changeCurrentTab = value => {
        this.setState({
            currentTab: value
        })
    }

    changeSearchValue = e => {
        this.setState({
            searchValue: e.target.value
        })
    }

    render() {
        const { currentTab, searchValue } = this.state
        const { rooms, adminChooseRoom, currentRoomId, loadClosedRoom } = this.props
        const filterCondition = room => {
            if (room.customer.name.toLowerCase().includes(searchValue.toLowerCase())) return true
            return room.tags.some(tag => tag.title.toLowerCase().includes(searchValue.toLowerCase()))
        }

        const availableRooms = rooms.filter(room => room.roomStatus === 2).filter(filterCondition)
        const enableRooms = rooms.filter(room => room.roomStatus === 1).filter(filterCondition)
        const closedRooms = rooms.filter(room => room.roomStatus === 3).filter(filterCondition)

        const numOfUnReadRoom = rooms.filter(room => room.roomInfo && room.roomInfo.numOfUnReadMessages).length

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
                searchValue={searchValue}
                changeSearchValue={this.changeSearchValue} />
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
                    adminChooseRoom={adminChooseRoom}
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
