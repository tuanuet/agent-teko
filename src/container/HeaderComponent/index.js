import React from 'react';
import {connect} from 'react-redux';

class HeaderContainer extends React.Component {

    render() {
        return (
            <header>
                <i className="fa fa-chevron-left" aria-hidden="true"></i>
            </header>
        );
    }
}

function mapStateToProps(state) {
    return {

    };
}
export default connect(mapStateToProps)(HeaderContainer);
