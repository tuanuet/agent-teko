import React from 'react';
import {connect} from 'react-redux';

class HeaderContainer extends React.Component {

    render() {
        return (
            <header>
            </header>
        );
    }
}

function mapStateToProps(state) {
    return {

    };
}
export default connect(mapStateToProps)(HeaderContainer);
