import React, {PropTypes} from 'react';
import {
    addMessage,
    setAdmin,
    fetchMetadata
} from '../../actions/action';
import Scroll from '../Scroll'
import * as MessageTypes from '../../constants/MessageTypes';
import {execLink} from '../../actions/execLink';

class ChatContent extends React.Component {

    componentDidMount() {

        const {dispatch, socket, customer, room, topic} = this.props;

        socket.emit('client-send-join-room', {customer, room, topic});

        socket.on('server-send-join-room', (({success}) => console.log(`join room ${success}`)));

        socket.on('server-send-message', ({name, message, type}) => {
            console.log({name, message, type});
            let date = new Date().getHours() + ':' + new Date().getSeconds();

            dispatch(addMessage({typeSender: 'other', sender: name, message: {content: message, type}, time: date}));

            let link = execLink(message);
            if (link) {
                dispatch(fetchMetadata(link, message));
            }

        });

        socket.on('server-send-admin-joined', ({name}) => {
            dispatch(setAdmin(name));
            dispatch(addMessage({
                typeSender: 'other',
                sender: '',
                message: {content: `Admin ${name} xin chao quy khach`, type: MessageTypes.NOTIFICATION},
                time: ''
            }));
        });

        socket.on('server-send-rating', () => {
            dispatch(addMessage({
                typeSender: 'other',
                sender: '',
                message: {content: '', type: MessageTypes.RATING},
                time: ''
            }));
        });

    }

    render(){
        // let theme = this.props.theme;
        return(
           <Scroll {...this.props}/>
            /*
            <div className={'body ' + theme}>
                <div className="chat-group self">
                    <div className="chat">Hello</div>
                </div>
                <div className="chat-group other">
                    <div className="chat">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid laborum
                        molestiae
                        quo.
                    </div>
                </div>
                <div className="chat-group self">
                    <div className="chat">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid laborum
                        molestiae
                        quo.
                    </div>
                </div>

            </div>*/
        );
    }

};

ChatContent.propTypes = {
    theme: PropTypes.string.isRequired
};

export default ChatContent;