import React, {PropTypes} from 'react';
import EnableRoom from './EnableRoom';

const EnableRooms = ({enableRooms, adminChooseRoom}) => {
    return (
        <div className="tab-pane" id="unchat" role="tabpanel">
            {enableRooms.map(enableRoom => {
                    return <EnableRoom
                        key={enableRoom.id}
                        enableRoom={enableRoom}
                        adminChooseRoom={adminChooseRoom}/>
                }
            )};

        </div>
    );
};

EnableRooms.propTypes = {
    enableRooms: PropTypes.array.isRequired,
    adminChooseRoom: PropTypes.func.isRequired
};

export default EnableRooms;