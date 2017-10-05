import React, {PropTypes} from 'react';
import EnableRoom from './EnableRoom';

const EnableRooms = ({enableRooms}) => {
    return (
        <div className="tab-pane" id="unchat" role="tabpanel">
            {enableRooms.map(enableRoom => <EnableRoom key={enableRoom.id} enableRoom={enableRoom}/>)}
        </div>
    );
};

EnableRooms.propTypes = {
    enableRooms: PropTypes.array.isRequired
};

export default EnableRooms;