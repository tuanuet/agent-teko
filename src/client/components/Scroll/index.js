import React from 'react';
import ListMessage from '../ListMessage/index';
import {connect} from 'react-redux';
import {addMessage} from "../../actions/action";
import * as MessageTypes from "../../constants/MessageTypes";
import {getMetaLink} from "../../container/BottomBarContainer/actions";

class Scroll extends React.Component {
    componentDidUpdate() {
        this.scroll();
    }

    componentDidMount() {
        this.scroll();
    }

    scroll() {
        let main = this.refs.main;
        if (main) {
            main.scrollTop = main.scrollHeight;
        }
    }

    componentWillUpdate(nextProps, nextState) {
        if(nextProps.messages.length === 0) return;
        //Check for first message and add stay stun

        if (nextProps.messages.length === 1) {
            this.props.dispatch(addMessage({
                typeSender: 'other',
                sender: '',
                message: {content: 'Stay stun in minutes', type: MessageTypes.NOTIFICATION},
                time: ''
            }));
        }

        //Check metadata when refresh
        const index = nextProps.messages.length - 1;
        const newMessage = nextProps.messages[index];
        if (!newMessage.metadata) {
            this.props.getMetaData(newMessage.message.content, index);
        }

    }

    render() {
        let {theme} = this.props;
        return (
            <div className={`body ${theme}`} ref="main">
                <ListMessage messages={this.props.messages}/>
                <div style={{float: 'left', clear: 'both'}}
                     ref={(el) => {
                         this.messagesEnd = el;
                     }}>
                </div>
            </div>

        );
    }
}


const checkLink = (content) => {
    let patt = /\bhttps?:\/\/\S+\.([a-z]{2}|aero|arpa|biz|com|coop|edu|gov|info|int|jobs|mil|museum|name|nato|net|org|pro|travel|local|internal)\S*/i;
    let result = patt.exec(content);
    if (result && result[0]) {
        console.log('Link detected!', result);
        return result[0];
    }
    return null;
};

function mapToProps(state) {
    let availableRoomId = state.activeRoomId;
    let availableRoom = state.rooms[availableRoomId];
    if(!availableRoom) return {messages : []};
    let messages = availableRoom.messages;
    return {
        messages
    };
}
function mapDispatchToProps(dispatch) {
    return ({
        getMetaData: (text) => {
            let link = checkLink(text);
            if (link) {
                dispatch(getMetaLink(link, text));
            }
        },
        dispatch: dispatch
    });
}


export default connect(mapToProps, mapDispatchToProps)(Scroll);
