import React from 'react';
import ChatFormContainer from '../../container/ChatformContainer';
import ChatBoxContainer from '../../container/ChatboxContainer';
import ChatTitle from '../../components/ChatTitle';
import {connect} from 'react-redux';

require('../../css/cssGroup');

class App extends React.Component {

    componentDidMount() {
        const bubble = $('.bubble');

        bubble.click(e => {
            if (bubble.hasClass('circle')) {
                bubble.removeClass('circle');
                setTimeout(function () {
                    $('.bubble-body').addClass('show');
                }, 200)
            }
        });
    }

    render() {
        return (
            <div className="bubble circle">
                <div className="bubble-icon"><i className="fa fa-whatsapp"/></div>
                <div className="bubble-body">
                    <ChatTitle/>
                    <div className="chat-body">
                        <ChatBoxContainer/>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        hideForm: state.toggleForm,
    };
}

export default connect(mapStateToProps)(App);
