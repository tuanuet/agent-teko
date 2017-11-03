import React, { Component } from 'react'

class ReopenRoom extends Component {
    render() {
        const { currentRoom, sendReopenRoom } = this.props
        return <div className="bottom">
            <button className="btn btn-primary accept-room"
                onClick={e => sendReopenRoom(currentRoom.id)}>
                Mở lại hội thoại
            </button>
        </div>
    }
}

export default ReopenRoom
