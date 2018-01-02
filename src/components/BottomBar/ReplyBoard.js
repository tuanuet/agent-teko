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
    }

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
                        <i className="fa fa-trash"></i>
                    </div>
                </div>
            )
        } else{
            return(
                <div className="reply">
                    <input value={this.state.reply.content} autoFocus onChange={this.handleOnChangeReply}/>
                    <i className="fa fa-check clickable icon-button-reply"></i>
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
        this.onKeyUpAddReply = this.onKeyUpAddReply.bind(this);
    }

    showAddReplyBox() {
        this.setState({
            isShowAddReplyBox: !this.state.isShowAddReplyBox
        });
    }

    onKeyUpAddReply(event) {
        if (event.keyCode === 13) {
            this.setState({
                isShowAddReplyBox: !this.state.isShowAddReplyBox
            })
        }
    }

    render() {
        let replies1=[
                {"id": 1, content:"Tin nhan nhanh 1 asdasdas asdasdasd  1"},
                {"id": 2, content:"Tin nhan nhanh 2 dsada dsadsadsa "},
                {"id": 3, content:"Tin nhan nhanh 3 sda dsadsada"},
                {"id": 4, content:"Tin nhan nhanh 4 dsadsadsa"},
                {"id": 5, content:"Tin nhan nhanh 5"},
                {"id": 6, content:"Tin nhan nhanh 6"},
                {"id": 7, content:"Tin nhan nhanh 7"},
                {"id": 8, content:"Tin nhan nhanh 8"},
                {"id": 9, content:"Tin nhan nhanh 9"},
                {"id": 10, content:"Tin nhan nhanh 10"}
            ];
        const repliesNode = replies1.map((reply, index) => {
            return <Reply key={reply.id} reply={reply} index={index} insertQuickReply={this.props.insertQuickReply}/>
        });
        const { toggleReplyBoard } = this.props;
        const { isShowAddReplyBox, replies} = this.state;
        let bottom = null;
        if (0) {
            bottom = <div className="add-reply">Tối đa 10 tin nhắn nhanh</div>
        } else if (!isShowAddReplyBox) {
            bottom = <div className="add-reply" onClick={this.showAddReplyBox}>
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
        return <div className="reply-board" onBlur={toggleReplyBoard} tabIndex={0}>
            <div className="reply-list">
                {repliesNode}
            </div>

            {/*{ smileys.map(smiley => {*/}
                {/*const { sheet_x, sheet_y, unified, text, texts } = smiley*/}
                {/*return <Emoji key={unified}*/}
                              {/*smiley={smiley}*/}
                              {/*insertEmoji={this.insertEmoji} />*/}
            {/*}) }*/}
            {bottom}
        </div>
    }
}

export default ReplyBoard
