import React, {PropTypes} from 'react';
import AvailableRoom from './AvailableRoom';

const AvailableRooms = ({availableRooms, adminChooseRoom, currentRoomId}) => {
    return <div className="tab-pane active" id="chat" role="tabpanel">
        { availableRooms.sort((a, b) => {
            if (!a.roomInfo || !a.roomInfo.latestMessage) return 1
            if (!b.roomInfo || !b.roomInfo.latestMessage) return -1
            const aDate = new Date(a.roomInfo.latestMessage.createdAt)
            const bDate = new Date(b.roomInfo.latestMessage.createdAt)
            if (aDate < bDate) return 1
            else if (aDate > bDate) return -1
            return 0
        }).map(availableRoom => {
            return <AvailableRoom
                currentRoomId={currentRoomId}
                key={availableRoom.roomId}
                availableRoom={availableRoom}
                adminChooseRoom={adminChooseRoom} />
        }) }
    </div>
};

AvailableRooms.propTypes = {
    availableRooms: PropTypes.array.isRequired,
    adminChooseRoom: PropTypes.func.isRequired
};

export default AvailableRooms;
