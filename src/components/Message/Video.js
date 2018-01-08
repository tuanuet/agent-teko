import React, { PureComponent } from 'react'
import axios from 'axios'
import { ACCESS_TOKEN } from '../../constants/Server'
import moment from "moment/moment";

class Video extends PureComponent {
    constructor(props) {
        super(props)
        this.mounted = false
        this.state = {
            isLoading: false,
            content: props.message.content,
            createdAt: props.message.createdAt
        }
    }
    handleErrorContent = () => {
        const { message } = this.props
        this.setState({
            isLoading: true
        })

        axios.request({
            method: 'get',
            url: `${message.messageId.startsWith(`m_`) ? message.messageId : `m_${message.messageId}`}/attachments`,
            baseURL: 'https://graph.facebook.com/v2.11/',
            params: {
                access_token: ACCESS_TOKEN
            }
        }).then(res => res.data).then(res => {
            if (!this.mounted) return false
            const { video_data: { url } } = res.data.find(attachment => attachment.name === message.fileName)
            this.setState({
                isLoading: false,
                content: url
            })
        }).catch(err => console.log(`Video err`, err))
    }
    componentDidMount = () => {
        this.mounted = true
    }
    scrollDown = () => {
        const { isCustomerBlock, loadingMoreBlock, scrollToBottom } = this.props
        if (!isCustomerBlock)
            if (!loadingMoreBlock)
                if (scrollToBottom) scrollToBottom()
    }
    componentDidUpdate = () => {
        this.scrollDown()
    }
    componentWillUnmount = () => {
        this.mounted = false
    }
    render() {
        const { message } = this.props
        const { isLoading, content } = this.state
        const role = message.messageFrom === 0 ? 'self' : 'other'

        return <div className={`message-margin ${role}`}
                    title={moment(createdAt).calendar()}
                    data-toggle="tooltip" data-placement= {role !=="self"?"left":"right"}>
            { isLoading ? <div className="loading-attachment">
                <i className="spinner fa fa-circle-o-notch fa-spin fa-1x fa-fw" style={{ color: '#2b7ec9' }}></i>
            </div> : <video onLoad={this.scrollDown} onError={this.handleErrorContent} className="message-video" width="480" controls>
                <source src={content} />
            </video> }
        </div>
    }
}

export default Video
