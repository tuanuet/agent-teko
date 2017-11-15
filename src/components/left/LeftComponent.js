import React, {PropTypes} from 'react';
import SearchBar from './SearchBar';
import TabBar from './TabBar';
import AvailableRooms from './AvailableRooms';
import EnableRooms from './EnableRooms';
import ClosedRooms from './ClosedRooms';

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
        let availableRooms = rooms.filter(room => room.roomStatus === 2)
        let enableRooms = rooms.filter(room => room.roomStatus === 1)
        let closedRooms = rooms.filter(room => room.roomStatus === 3)

        if (searchValue) {
            if (currentTab === 'available') {
                availableRooms = availableRooms.filter(filterCondition)
            } else if (currentTab === 'enable') {
                enableRooms = enableRooms.filter(filterCondition)
            } else if (currentTab === 'closed') {
                // TODO: search in server
                closedRooms = closedRooms.filter(filterCondition)
            }
        }

        return <div className="left">
            <TabBar
                loadClosedRoom={loadClosedRoom}
                numberOfEnableRooms={enableRooms.length}
                changeCurrentTab={this.changeCurrentTab} />
            <SearchBar
                searchValue={searchValue}
                changeSearchValue={this.changeSearchValue} />
            <div className="tab-content">
                <AvailableRooms
                    currentRoomId={currentRoomId}
                    availableRooms={availableRooms}
                    adminChooseRoom={adminChooseRoom}
                />
                <EnableRooms
                    enableRooms={enableRooms}
                    adminChooseRoom={adminChooseRoom}
                />
                <ClosedRooms
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
