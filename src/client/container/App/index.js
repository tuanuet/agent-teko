import React from 'react';
import ChatBoxContainer from '../../container/ChatboxContainer';
import {connect} from 'react-redux';

require('../../css/cssGroup');

class App extends React.Component {

    render() {
        return (
            <ChatBoxContainer/>
        );
    }
}

function mapStateToProps(state) {
    return {
        hideForm: state.toggleForm,
    };
}
export default connect(mapStateToProps)(App);
