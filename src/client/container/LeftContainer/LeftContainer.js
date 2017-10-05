import React from 'react';
import {connect} from 'react-redux';
import LeftComponent from '../../components/left/LeftComponent';

class LeftContainer extends React.Component {

    render() {
        const {rooms} = this.props;
        console.log("rooms", rooms);
        return (
            <LeftComponent
                rooms={rooms}
            />
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        rooms: state.rooms
    };
}

function mapDispatchToProps(dispatch) {
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(LeftContainer);
