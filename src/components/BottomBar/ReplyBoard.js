import React from 'react';

class Reply extends React.Component{

    constructor(props, context){
        super(props, context);
        this.state={
            isEditing: false,
            reply: {
                id: this.props.reply.id,
                content: this.props.reply.content
            }
        }
    }

    toggleEditReply = () => {
        console.log("dada");
        this.setState({
            isEditing: !this.state.isEditing
        })
    };

    handleOnChangeReply = e => {
        this.setState({
           reply : {
               id: this.state.reply.id,
               content: e.target.value
           }
        })
    };

    handleOnKeyUpReply = e => {
        if(e.keyCode === 13) {
            this.props.editQuickReply(this.state.reply.id, this.state.reply.content);
            this.setState({
                isEditing: !this.state.isEditing
            })
        }
    };

    handleOnClickSaveReply = e => {
        this.props.editQuickReply(this.state.reply.id, this.state.reply.content);
        this.setState({
            isEditing: !this.state.isEditing
        })
    };

    handleOnDeleteQuickReply = e => {
        this.props.deleteQuickReply(this.state.reply.id);
    };

    render(){
        if(!this.state.isEditing) {
            let index = this.props.index + 1;
            return (
                <div className="reply">
                    <p className="reply-content clickable"
                       onClick={this.props.insertQuickReply.bind(this, this.state.reply.content)}
                       title={this.state.reply.content}>{`${index}. ${this.state.reply.content}`}
                    </p>
                    <div className="icon-button-reply">
                        <i className="fa fa-pencil" onClick={this.toggleEditReply}></i>
                        <i className="fa fa-trash" onClick={this.handleOnDeleteQuickReply}></i>
                    </div>
                </div>
            )
        } else{
            return(
                <div className="reply">
                    <input value={this.state.reply.content}
                           autoFocus
                           onKeyUp={this.handleOnKeyUpReply}
                           onChange={this.handleOnChangeReply}/>
                    <i className="fa fa-check clickable icon-button-reply" onClick={this.handleOnClickSaveReply}></i>
                </div>
            )
        }
    }


};

class ReplyBoard extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state={
            isShowAddReplyBox: false,
            replies: this.props.replies,
            isEditReply: false,
        };
        this.showAddReplyBox = this.showAddReplyBox.bind(this);
    }

    showAddReplyBox() {
        this.setState({
            isShowAddReplyBox: !this.state.isShowAddReplyBox
        });
    }

    onKeyUpAddReply = event => {
        if (event.keyCode === 13) {
            this.setState({
                isShowAddReplyBox: !this.state.isShowAddReplyBox
            });
            this.props.addQuickReply(event.target.value);
        }
    };

    render() {
        const { isShowAddReplyBox, replies} = this.state;
        const repliesNode = replies.map((reply, index) => {
            return(
                <Reply key={reply.id}
                       reply={reply}
                       index={index}
                       insertQuickReply={this.props.insertQuickReply}
                       editQuickReply={this.props.editQuickReply}
                       deleteQuickReply={this.props.deleteQuickReply}
                />

            )
        });
        const { toggleReplyBoard } = this.props;

        let bottom = null;
        if (replies.length > 9) {
            bottom = <div className="add-reply">Tối đa 10 tin nhắn nhanh</div>
        } else if (!isShowAddReplyBox) {
            bottom = <div className="add-reply add-reply-button" onClick={this.showAddReplyBox}>
                <i className="fa fa-plus add-reply">&nbsp;Click để thêm</i>
            </div>
        } else {
            bottom = <input
                ref="addReply"
                type="text"
                size={17}
                className="add-reply add-reply-box"
                placeholder="Thêm tin nhắn nhanh"
                onKeyUp={this.onKeyUpAddReply}
                autoFocus={true}
            />
        }
        return <div className="reply-board" tabIndex={0}>
            <div className="reply-list">
                {repliesNode}
            </div>
            {bottom}
        </div>
    }
}

export default ReplyBoard
