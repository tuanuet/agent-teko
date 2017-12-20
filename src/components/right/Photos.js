import React, { Component } from 'react'
import Image from '../Message/Image'

class Photos extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isZooming: false,
            content: '',
            limit: 6
        }
    }
    componentWillMount = () => {
        window.addEventListener('keydown', this.handleKeyEvent)
    }
    openZooming = (fileName, content) => {
        if (fileName.includes(`sticker`)) return false

        this.setState({
            isZooming: true,
            content
        })
    }
    handleKeyEvent = e => {
        if (e.keyCode === 27) {
            this.setState({
                isZooming: false,
            })
        }
    }
    closeZooming = e => {
        e.preventDefault()
        if (e.target !== e.currentTarget) return false

        this.setState({
            isZooming: false,
        })
    }
    loadMoreImage = () => {
        const { limit } = this.state
        const { photos, nextFetchingRoom, currentRoomId, actions } = this.props

        if (limit < photos.length) {
            this.setState(prev => ({
                limit: prev.limit + 6
            }))
        } else {
            actions.fetchMoreMessages(nextFetchingRoom, currentRoomId)
        }
    }
    componentWillUnMount = () => {
        window.removeEventListener('keydown', this.handleKeyEvent)
    }
    render() {
        const { isZooming, content, limit } = this.state
        const { photos, isLoadingMessages, nextFetchingRoom } = this.props

        return <div className="customer-photos">
            <div className="row no-gutters">
                { photos.slice(0, limit).map((e, idx) => <Image
                    key={`${e.messageId}_${e.fileName}_${idx}`}
                    message={e}
                    isCustomerBlock={true}
                    openZooming={this.openZooming} /> ) }
            </div>
            { isZooming && <div className="image-overlay" onClick={this.closeZooming}>
                <span>
                    <img className="overlay-content" src={content} />
                    <div className="close-button" onClick={this.closeZooming} title="Ấn ESC để thoát">&times;</div>
                </span>
            </div> }
            { nextFetchingRoom !== -1 && (!isLoadingMessages ? <div className="text-center clickable" onClick={this.loadMoreImage} style={{ color: '#2b7ec9', fontSize: '.7em' }}>
                Tải thêm
            </div> : <div className="text-center">
                <i className="fa fa-circle-o-notch fa-spin fa-1x fa-fw" style={{ color: '#2b7ec9', fontSize: '.7em' }}></i>
                <span className="sr-only">Loading...</span>
            </div>) }
        </div>
    }
}

export default Photos
