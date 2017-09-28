import React from 'react';
import {connect} from 'react-redux';
import HeaderContainer from '../HeaderComponent/index';
import LeftContainer from '../LeftContainer/index';
import MiddleContainer from '../MiddleContainer/index';
import RightContainer from '../RightContainer/index';

require('../../css/cssGroup');

class App extends React.Component {

    render() {
        return (
            <div>
                <HeaderContainer/>
                <div className="container-chat">
                    <LeftContainer/>
                    <MiddleContainer/>
                    <RightContainer/>
                </div>
            </div>

        );
    }
}

function mapStateToProps(state) {
    return {
        hideForm: state.toggleForm,
    };
}
export default connect(mapStateToProps)(App);
