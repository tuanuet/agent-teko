import React, {PropTypes} from 'react';
import SearchBar from './SearchBar';
import TabBar from './TabBar';
import AvailableRooms from './AvailableRooms';
import EnableRooms from './EnableRooms';
const LeftComponent = ({rooms, adminChooseRoom, currentRoomId}) => {
    let availableRooms = rooms.filter(room => {
        return room.status === 2;
    });

    let enableRooms = rooms.filter(room => {
        return room.status === 1;
    });


    return(
        <div className="left">
            <TabBar numberOfEnableRooms={enableRooms.length}/>
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
            </div>
        </div>
    );
};

LeftComponent.propTypes = {
    rooms: PropTypes.array.isRequired,
    adminChooseRoom: PropTypes.func.isRequired,
};

export default LeftComponent;
