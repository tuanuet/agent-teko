import React, { Component } from 'react'
import axios from 'axios'
import { ACCESS_TOKEN } from '../../constants/Server'

class Video extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: false,
            content: props.message.content
        }
    }
    handleErrorContent = () => {
        const { message } = this.props
        this.setState({
            isLoading: true
        })

        axios.request({
            method: 'get',
            url: `${message.messageId}/attachments`,
            baseURL: 'https://graph.facebook.com/v2.11/',
            params: {
                access_token: ACCESS_TOKEN
            }
        }).then(res => res.data).then(res => {
            const { video_data: { url } } = res.data.find(attachment => attachment.name === message.fileName)
            this.setState({
                isLoading: false,
                content: url
            })
        }).catch(err => console.log(err))
    }
    render() {
        const { message } = this.props
        const { isLoading, content } = this.state
        const role = message.messageFrom === 0 ? 'self' : 'other'

        return <div className={`message-margin ${role}`}>
            { isLoading ? <div className="loading-attachment">
                <i className="spinner fa fa-circle-o-notch fa-spin fa-1x fa-fw" style={{ color: '#2b7ec9' }}></i>
            </div> : <video onError={this.handleErrorContent} className="message-video" width="480" controls>
                <source src={content} />
            </video> }
        </div>
    }
}

export default Video
