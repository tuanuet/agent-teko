import React, {PropTypes} from 'react'
import AvailableRoom from './AvailableRoom'

class AvailableRooms extends React.Component {
    render() {
        const { currentTab, availableRooms, adminChooseRoom, currentRoomId } = this.props

        return <div className={`tab-pane ${currentTab === 'available' && 'active'}`} id="chat" role="tabpanel">
            { availableRooms.length === 0 ? <div className="text-center" style={{fontSize: '16px'}}>
                Danh sách rỗng
            </div> : availableRooms.sort((a, b) => {
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
    }
}

AvailableRooms.propTypes = {
    availableRooms: PropTypes.array.isRequired,
    adminChooseRoom: PropTypes.func.isRequired
}

export default AvailableRooms
