import React, {PropTypes} from 'react';
import AvailableRoom from './AvailableRoom';

const AvailableRooms = ({availableRooms}) => {
    return (
        <div className="tab-pane active" id="chat" role="tabpanel">
            {availableRooms.map(availableRoom => <AvailableRoom key={availableRoom.id} availableRoom={availableRoom}/>)}
        </div>
    );
};

AvailableRooms.propTypes = {
    availableRooms: PropTypes.array.isRequired
};

export default AvailableRooms;