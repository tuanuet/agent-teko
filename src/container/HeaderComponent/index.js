import React from 'react';
import {connect} from 'react-redux';

class HeaderContainer extends React.Component {

    render() {
        const { agent } = this.props

        return (
            <header>
                Xin chào, {agent.name}
            </header>
        );
    }
}

function mapStateToProps(state) {
    return {
        agent: state.agent
    };
}
export default connect(mapStateToProps)(HeaderContainer);
