import React from 'react';
import {connect} from 'react-redux';
import MiddleComponent from '../../components/Middle/index';

class MiddleContainer extends React.Component {
    constructor(props) {
        super(props);
        this.showTheme = this.showTheme.bind(this);
        this.changeTheme = this.changeTheme.bind(this);

        const localStorage = window.localStorage;
        const color = localStorage.getItem('themeColor');
        this.state = {theme: color ? color : 'blue'};
    }

    showTheme() {
        $('#selectTheme').toggleClass('show');
    }

    changeTheme(e) {
        const localStorage = window.localStorage;
        const color = e.target.className;
        localStorage.setItem('themeColor', color);
        this.setState({theme: color})
    }

    render() {

        const {currentRoomId} = this.props;
        if (!currentRoomId) {
            return <div>WELCOME</div>;
        } else {
            $('#test').tooltip();
            return (
                <MiddleComponent
                    showTheme={this.showTheme}
                    theme={this.state.theme}
                    changeTheme={this.changeTheme}
                    {...this.props}
                />
            );
        }
    }
}

function mapStateToProps(state, ownProps) {
    let availableRoomId = state.currentRoomId;
    let availableRoom = state.rooms.filter(room => room.id === availableRoomId)[0];
    if(!availableRoom) return {messages : []};
    let messages = availableRoom.messages;
    return {
        rooms: state.rooms,
        currentRoomId: state.currentRoomId,
        messages
    };
}

function mapDispatchToProps(dispatch) {
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(MiddleContainer);