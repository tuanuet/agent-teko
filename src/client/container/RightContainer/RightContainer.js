import React from 'react';
import {connect} from 'react-redux';
import RightComponent from '../../components/right/RightComponent';

class RightContainer extends React.Component {

    render() {
        return (
            <RightComponent/>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

export default connect(mapStateToProps)(RightContainer);
