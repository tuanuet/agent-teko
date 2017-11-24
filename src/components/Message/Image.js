import React from 'react'
import axios from 'axios'
import { ACCESS_TOKEN } from '../../constants/Server'

export default class Image extends React.Component {
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

        if (!message.fileName.includes(`sticker`)) {
            axios.request({
                method: 'get',
                url: `${message.messageId}/attachments`,
                baseURL: 'https://graph.facebook.com/v2.11/',
                params: {
                    access_token: ACCESS_TOKEN
                }
            }).then(res => res.data).then(res => {
                const { image_data: { url } } = res.data.find(attachment => attachment.name === message.fileName)
                this.setState({
                    isLoading: false,
                    content: url
                })
            }).catch(err => console.log(err))
        } else {
            axios.request({
                method: 'get',
                url: `${message.messageId}/shares?fields=link`,
                baseURL: 'https://graph.facebook.com/v2.11/',
                params: {
                    access_token: ACCESS_TOKEN
                }
            }).then(res => res.data).then(res => {
                const { link } = res.data.find(share => `sticker_${share.id}` === message.fileName)
                this.setState({
                    isLoading: false,
                    content: link
                })
            }).catch(err => console.log(err))
        }
    }
    render() {
        const { message } = this.props
        const { isLoading, content } = this.state
        const role = message.messageFrom === 0 ? 'self' : 'other'

        return (
            <div className={role}>
                <div className="image">
                    <div className="content">
                        { isLoading ? <div className="message-margin loading-attachment">
                            <i className="spinner fa fa-circle-o-notch fa-spin fa-1x fa-fw" style={{ color: '#2b7ec9' }}></i>
                        </div> : <img src={content}
                            alt={message.fileName}
                            onError={this.handleErrorContent}
                            width={message.fileName.includes(`sticker`) && '120'} /> }

                    </div>
                </div>
            </div>
        );
    }
}
