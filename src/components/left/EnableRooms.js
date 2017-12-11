import React, {PropTypes} from 'react';
import EnableRoom from './EnableRoom';

const EnableRooms = ({currentTab, enableRooms, adminChooseRoom}) => {
    return (
        <div className={`tab-pane ${currentTab === 'enable' && 'active'}`} id="unchat" role="tabpanel">
            { enableRooms.sort((a, b) => {
                if (!a.roomInfo || !a.roomInfo.latestMessage) return 1
                if (!b.roomInfo || !b.roomInfo.latestMessage) return -1
                const aDate = new Date(a.roomInfo.latestMessage.createdAt)
                const bDate = new Date(b.roomInfo.latestMessage.createdAt)
                if (aDate < bDate) return 1
                else if (aDate > bDate) return -1
                return 0
            }).map(enableRoom => {
                return <EnableRoom
                    key={enableRoom.roomId}
                    enableRoom={enableRoom}
                    adminChooseRoom={adminChooseRoom}/>
            }) }
        </div>
    );
};

EnableRooms.propTypes = {
    enableRooms: PropTypes.array.isRequired,
    adminChooseRoom: PropTypes.func.isRequired
};

export default EnableRooms;
