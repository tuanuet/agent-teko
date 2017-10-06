import React from 'react';

export default class Default extends React.Component {
    render() {
        let message = this.props.message;
        // let metabox = msg.metadata ? <li className={msg.typeSender}><Metabox metadata={msg.metadata}/></li> : null;
        // messageFrom === 1 then self
        // todo : check right agent because many agent agentId === message.senderId
        let role = message.messageFrom === 1 ? 'self' : 'other';
        return (
            <div>
                <div className={`chat-group ${role}`}>
                    <div className="chat">{message.content}</div>
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