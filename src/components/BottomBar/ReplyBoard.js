import React, {PropTypes} from 'react';

const Reply = ({reply, index}) => {
    index = index + 1;
    return(
        <div className="reply">
            <p className="reply-content">{`${index}. ${reply.content}`}</p>
            <div className="icon-button-reply">
                <i className="fa fa-pencil"></i>
                <i className="fa fa-trash"></i>
            </div>
            </div>
    )
};

class ReplyBoard extends React.Component {
    // insertEmoji = smiley => {
    //     const { text, unified, texts } = smiley
    //     const codePoints = unified.split('-').map(u => `0x${u}`)
    //     const emoji = String.fromCodePoint(...codePoints)
    //     this.props.insertEmoji(emoji)
    // };
    constructor(props, context) {
        super(props, context);
        this.state={
            isShowAddReplyBox: false,
            replies: this.props.replies
        };
        this.showAddReplyBox = this.showAddReplyBox.bind(this);
        this.onKeyUpAddReply = this.onKeyUpAddReply.bind(this);
    }

    showAddReplyBox(event) {
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
                {"id": 1, content:"Tin nhan nhanh asdasdas asdasdasd  1"},
                {"id": 2, content:"Tin nhan nhanh 2"},
                {"id": 3, content:"Tin nhan nhanh 3"},
                {"id": 4, content:"Tin nhan nhanh 4"},
                {"id": 5, content:"Tin nhan nhanh 5"},
                {"id": 6, content:"Tin nhan nhanh 6"},
                {"id": 7, content:"Tin nhan nhanh 7"},
                {"id": 8, content:"Tin nhan nhanh 8"},
                {"id": 9, content:"Tin nhan nhanh 9"},
                {"id": 10, content:"Tin nhan nhanh 10"}
            ];
        const repliesNode = replies1.map((reply, index) => {
            return <Reply key={reply.id} reply={reply} index={index}/>
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
