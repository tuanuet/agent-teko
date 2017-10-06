import React, {PropTypes} from 'react';
import AvailableRoom from './AvailableRoom';

const AvailableRooms = ({availableRooms, adminChooseRoom}) => {
    return (
        <div className="tab-pane active" id="chat" role="tabpanel">
            {availableRooms.map(availableRoom => {
                    return <AvailableRoom
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
    availableRooms: PropTypes.array.isRequired,
    adminChooseRoom: PropTypes.func.isRequired
};

export default AvailableRooms;