import React, { Component } from 'react'

class Info extends Component {
    render() {
        const { message } = this.props
        const { content } = message

        return <div className="message-type-info">
            { content }
        </div>
    }
}

export default Info
