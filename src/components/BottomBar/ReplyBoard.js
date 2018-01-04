import React from 'react'
import ReactDom from 'react-dom'

class Reply extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            isEditing: false,
            isDisplay: true,
            reply: {
                id: props.reply.id,
                content: props.reply.content
            }
        }
    }

    toggleEditReply = () => {
        this.setState(prevState => ({
            isEditing: !prevState.isEditing
        }))
    }

    handleOnChangeReply = e => {
        e.preventDefault()
        const value = e.target.value
        this.setState(prevState => ({
            reply: {
                ...prevState.reply,
                content: value
            }
        }))
    }

    handleOnKeyUpReply = e => {
        const { reply } = this.state
        if (e.keyCode === 13) {
            e.preventDefault()
            this.props.editQuickReply(reply.id, reply.content)
            this.setState(prevState => ({
                isEditing: !prevState.isEditing
            }))
        }
    }

    handleOnClickSaveReply = e => {
        const { reply } = this.state
        this.props.editQuickReply(reply.id, reply.content)
        this.setState(prevState => ({
            isEditing: !prevState.isEditing
        }))
    }

    handleOnDeleteQuickReply = e => {
        const { reply } = this.state
        const confirm = this.props.deleteQuickReply(reply.id)
        if (confirm) {
            this.setState({
                isDisplay: false
            })
        }
    }

    insertQuickReply = () => {
        const { reply: { content } } = this.state
        this.props.insertQuickReply(content)
        this.props.toggleReplyBoard()
    }

    render() {
        const { isEditing, isDisplay, reply } = this.state

        if (!isDisplay) return false

        if (!isEditing) {
            return <div className="reply">
                <p className="reply-content clickable"
                    onClick={this.insertQuickReply}
                    title={reply.content}>
                    {reply.content}
                </p>
                <div className="icon-button-reply">
                    <i className="fa fa-pencil" onClick={this.toggleEditReply}></i>
                    <i className="fa fa-trash" onClick={this.handleOnDeleteQuickReply}></i>
                </div>
            </div>
        } else {
            return <div className="reply">
                <input autoFocus={true}
                    onFocus={e => { e.target.selectionStart = e.target.selectionEnd = e.target.value.length }}
                    value={reply.content}
                    className="edit-reply add-reply-box form-control"
                    onKeyUp={this.handleOnKeyUpReply}
                    onChange={this.handleOnChangeReply} />
                <i className="fa fa-check clickable icon-button-reply" onClick={this.handleOnClickSaveReply}></i>
            </div>
        }
    }
}

class ReplyBoard extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            isEditReply: false,
            isShowAddReplyBox: false
        }
    }
    componentWillMount() {
        window.addEventListener('mousedown', this.handleOutsideClick)
    }

    handleOutsideClick = e => {
        if (!this.replyBoard.contains(e.target) && e.target.id !== 'toggle-reply-board') {
            this.props.toggleReplyBoard(e, false)
        }
    }

    showAddReplyBox = () => {
        this.setState(prevState => ({
            isShowAddReplyBox: !prevState.isShowAddReplyBox
        }))
    }

    onKeyUpAddReply = e => {
        if (e.keyCode === 13) {
            e.preventDefault()
            this.setState(prevState => ({
                isShowAddReplyBox: !prevState.isShowAddReplyBox
            }))
            this.props.addQuickReply(e.target.value)
        }
    }

    componentWillUnmount() {
        window.removeEventListener('mousedown', this.handleOutsideClick)
    }

    render() {
        const { isShowAddReplyBox } = this.state
        const { replies } = this.props
        const repliesNode = replies.map(reply => {
            return <Reply key={reply.id}
               reply={reply}
               insertQuickReply={this.props.insertQuickReply}
               editQuickReply={this.props.editQuickReply}
               deleteQuickReply={this.props.deleteQuickReply}
               toggleReplyBoard={this.props.toggleReplyBoard}
            />
        })
        const { toggleReplyBoard } = this.props

        let bottom = false
        if (replies.length > 9) {
            // Do nothing
        } else if (!isShowAddReplyBox) {
            bottom = <div className="add-reply add-reply-button clickable" onClick={this.showAddReplyBox}>
                <i className="fa fa-plus">&nbsp;Thêm tin nhắn nhanh mới</i>
            </div>
        } else {
            bottom = <input
                type="text"
                className="add-reply-box form-control"
                placeholder="Thêm tin nhắn nhanh"
                onKeyUp={this.onKeyUpAddReply}
                autoFocus={true}
            />
        }
        return <div className="reply-board" ref={node => this.replyBoard = node}>
            <div className="reply-list">
                {repliesNode}
            </div>
            {bottom}
        </div>
    }
}

export default ReplyBoard
