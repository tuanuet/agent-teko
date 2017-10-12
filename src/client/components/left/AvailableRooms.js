import React, {PropTypes} from 'react';
import AvailableRoom from './AvailableRoom';

const AvailableRooms = ({availableRooms, adminChooseRoom, currentRoomId}) => {
    return (
        <div className="tab-pane active" id="chat" role="tabpanel">
            {availableRooms.map(availableRoom => {
                    return <AvailableRoom
                        currentRoomId={currentRoomId}
                        key={availableRoom.id}
                        availableRoom={availableRoom}
                        adminChooseRoom={adminChooseRoom}
                    />
                }
            )}
        </div>
    );
};

AvailableRooms.propTypes = {
    currentRoomId: PropTypes.object.isRequired,
    availableRooms: PropTypes.array.isRequired,
    adminChooseRoom: PropTypes.func.isRequired
};

export default AvailableRooms;