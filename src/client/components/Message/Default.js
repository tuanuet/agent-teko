import React from 'react';

export default class Default extends React.Component {
    render() {
        let msg = this.props.msg;
        let metabox = msg.metadata ? <li className={msg.typeSender}><Metabox metadata={msg.metadata}/></li> : null;

        return (
            <div>
                <div className={`chat-group ${msg.typeSender}`}>
                    <div className="chat">{msg.message.content}</div>
                </div>
            </div>
        )
    }
}


function Metabox(props) {
    return (
        <div className="meta-box">
            <div className="box-title">
                <div className="box-image">
                    <img src={props.metadata.image}/>
                </div>
                <div className="title font-weight-bold">{props.metadata.title}</div>
            </div>
            <div>{props.metadata.description}</div>
        </div>
    );
}