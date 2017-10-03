import React from 'react';
import {connect} from 'react-redux';
import LeftComponent from '../../components/left/LeftComponent';

class LeftContainer extends React.Component {

    render() {
        return (
            <LeftComponent/>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {};
}

function mapDispatchToProps(dispatch) {
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(LeftContainer);
