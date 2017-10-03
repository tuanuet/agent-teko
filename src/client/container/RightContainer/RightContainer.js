import React from 'react';
import {connect} from 'react-redux';
import RightComponent from '../../components/right/RightComponent';
import {bindActionCreators} from 'redux';

class RightContainer extends React.Component {

    render() {
        return (
            <RightComponent/>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {};
}

function mapDispatchToProps(dispatch) {
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(RightContainer);
