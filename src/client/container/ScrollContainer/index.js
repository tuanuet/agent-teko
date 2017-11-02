import React from 'react';
import ListMessage from '../../components/ListMessage/index';
import * as ReactDOM from "react-dom";


class Scroll extends React.Component {
    constructor(props) {
        super(props);
        this.scrollToBottom = this.scrollToBottom.bind(this);
    }
    scrollToBottom() {
        const messagesContainer = ReactDOM.findDOMNode(this.messagesContainer);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    };

    componentDidMount() {
        this.scrollToBottom();
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }


    render() {
        let {theme} = this.props;
        return (
            <div className={`body ${theme}`}  ref={(el) => { this.messagesContainer = el; }}>
                <ListMessage messages={this.props.messages}/>
                <div style={{float: 'left', clear: 'both'}}>
                </div>
            </div>
        );
    }
}





export default Scroll;
