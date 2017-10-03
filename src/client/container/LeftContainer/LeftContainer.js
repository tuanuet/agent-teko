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

function mapStateToProps(state) {
    return {};
}

export default connect(mapStateToProps)(LeftContainer);
