import React, { PureComponent } from 'react'

class Info extends PureComponent {
    render() {
        const { message } = this.props
        const { content } = message

        return <div className="message-type-info">
            { content }
        </div>
    }
}

export default Info
