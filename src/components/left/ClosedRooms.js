import React, {PropTypes} from 'react'
import * as helper from '../../helper'

class ClosedRoom extends React.PureComponent {
    render() {
        const { closedRoom, currentRoomId, adminChooseRoom } = this.props

        let className = 'room-item'
        if (closedRoom.roomId === currentRoomId) {
            className += ' active'
        }

        return <div className={className} onClick={adminChooseRoom.bind(this, closedRoom.roomId)} >
            <div className="customer-control">
                <img
                    src={closedRoom.customer.avatarUrl}
                className="avatar" alt="image"/>
            </div>
            <div className="customer-info">
                <div className="title">
                    <div className="name">{closedRoom.customer.name}</div>
                    <div className="timer">
                        <span>{helper.formatDatetime(closedRoom.closedAt)}</span>
                    </div>
                </div>
                <div className="d-flex justify-content-between">
                </div>
                { closedRoom.tags && <div className="tags-of-room">
                    { closedRoom.tags.map(tag => <span key={tag.id} className="tag" style={{ backgroundColor: `${tag.color}`}}>
                        { tag.title }
                    </span> ) }
                </div> }
            </div>
        </div>
    }
}

class ClosedRooms extends React.Component {
    render() {
        const { currentTab, closedRooms, searchData, adminChooseRoom, currentRoomId, isHavingMoreClosed, isLoadingMoreRooms, loadClosedRoom } = this.props

        return <div className={`tab-pane ${currentTab === 'closed' && 'active'}`} id="closedchat" role="tabpanel">
            { !isLoadingMoreRooms && closedRooms.length === 0 ? <div className="text-center" style={{fontSize: '16px'}}>
                Danh sách rỗng
            </div> : closedRooms.map((closedRoom, index) => <ClosedRoom
                key={closedRoom.roomId}
                closedRoom={closedRoom}
                currentRoomId={currentRoomId}
                adminChooseRoom={adminChooseRoom} />) }

            { isHavingMoreClosed && (isLoadingMoreRooms ? <div className="text-center">
                <i className="fa fa-circle-o-notch fa-spin fa-1x fa-fw" style={{ color: '#2b7ec9' }}></i>
                <span className="sr-only">Loading...</span>
            </div> : <div className="text-center clickable" onClick={e => loadClosedRoom(searchData)} style={{ color: '#2b7ec9' }}> {/* Better pass function */}
                Tải thêm
            </div>) }
        </div>
    }
}


export default ClosedRooms
