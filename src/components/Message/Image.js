import React from 'react'
import axios from 'axios'
import { ACCESS_TOKEN } from '../../constants/Server'

export default class Image extends React.PureComponent {
    constructor(props) {
        super(props)
        this.mounted = false
        this.state = {
            isLoading: false,
            content: props.message.content
        }
    }
    openZooming = () => {
        const { content } = this.state
        const { openZooming, message: { fileName } } = this.props
        openZooming(fileName, content)
    }
    handleErrorContent = () => {
        const { message } = this.props
        this.setState({
            isLoading: true
        })

        if (!message.fileName.includes(`sticker`)) {
            axios.request({
                method: 'get',
                url: `${message.messageId.startsWith(`m_`) ? message.messageId : `m_${message.messageId}`}/attachments`,
                baseURL: 'https://graph.facebook.com/v2.11/',
                params: {
                    access_token: ACCESS_TOKEN
                }
            }).then(res => res.data).then(res => {
                if (!this.mounted) return false
                const { image_data: { url } } = res.data[0] // TODO: Should find the first image
                this.setState({
                    isLoading: false,
                    content: url
                })
            }).catch(err => console.log(`Image err`, err))
        } else {
            axios.request({
                method: 'get',
                url: `${message.messageId.startsWith(`m_`) ? message.messageId : `m_${message.messageId}`}/shares?fields=link`,
                baseURL: 'https://graph.facebook.com/v2.11/',
                params: {
                    access_token: ACCESS_TOKEN
                }
            }).then(res => res.data).then(res => {
                if (!this.mounted) return false
                const { link } = res.data[0] // TODO: should find the first image
                this.setState({
                    isLoading: false,
                    content: link
                })
            }).catch(err => console.log(`Sticker err`, err))
        }
    }
    componentDidMount = () => {
        this.mounted = true
    }
    componentWillUnmount = () => {
        this.mounted = false
    }
    render() {
        const { message, isCustomerBlock } = this.props
        const { isLoading, content } = this.state
        const role = message.messageFrom === 0 ? 'self' : 'other'

        if (isCustomerBlock) {
            if (isLoading) return <div className="col-6 gutters" style={{width: 180, height: 180 }}>
                <div className="loading-attachment">
                    <i className="spinner fa fa-circle-o-notch fa-spin fa-1x fa-fw" style={{ color: '#2b7ec9'}}></i>
                </div>
            </div>
            return <img className="col-6 gutters clickable"
                src={content}
                alt={message.fileName}
                onClick={this.openZooming}
                onError={this.handleErrorContent} />
        }

        return (
            <div className={role}>
                <div className="image">
                    <div className="content">
                        { isLoading ? <div className="message-margin loading-attachment">
                            <i className="spinner fa fa-circle-o-notch fa-spin fa-1x fa-fw" style={{ color: '#2b7ec9' }}></i>
                        </div> : <img src={content}
                            alt={message.fileName}
                            className="clickable"
                            onClick={this.openZooming}
                            onError={this.handleErrorContent}
                            width={message.fileName.includes(`sticker`) && '120'} /> }
                    </div>
                </div>
            </div>
        );
    }
}
