import React, {PropTypes} from 'react';
import SearchBar from './SearchBar';
import TabBar from './TabBar';
import AvailableRooms from './AvailableRooms';
import EnableRooms from './EnableRooms';
import ClosedRooms from './ClosedRooms';

const LeftComponent = ({rooms, adminChooseRoom, currentRoomId, loadClosedRoom}) => {
    let availableRooms = rooms.filter(room => {
        return room.roomStatus !== 1 && room.roomStatus !== 3;
    });

    let enableRooms = rooms.filter(room => {
        return room.roomStatus === 1;
    });

    let closedRooms = rooms.filter(room => {
        return room.roomStatus === 3;
    });

    return(
        <div className="left">
            <TabBar numberOfEnableRooms={enableRooms.length} loadClosedRoom={loadClosedRoom} />
            <SearchBar/>
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
    );
};

LeftComponent.propTypes = {
    rooms: PropTypes.array.isRequired,
    adminChooseRoom: PropTypes.func.isRequired,
};

export default LeftComponent;
