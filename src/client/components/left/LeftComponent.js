import React, {PropTypes} from 'react';
import SearchBar from './SearchBar';
import TabBar from './TabBar';
import AvailableRooms from './AvailableRooms';
import EnableRooms from './EnableRooms';
const LeftComponent = ({rooms}) => {
    let availableRooms = rooms.filter(room => {
        return room.status === 2;
    });

    let enableRooms = rooms.filter(room => {
        return room.status === 1;
    });

    return(
        <div className="left">
            <TabBar/>
            <SearchBar/>
            <div className="tab-content">
                <AvailableRooms availableRooms={availableRooms}/>
                <EnableRooms enableRooms={enableRooms}/>
            </div>
        </div>
    );
};

LeftComponent.propTypes = {
    rooms: PropTypes.array.isRequired
};

export default LeftComponent;
