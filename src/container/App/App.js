import React from 'react'
import HeaderContainer from '../HeaderComponent/index'
import LeftContainer from '../LeftContainer/LeftContainer'
import MiddleContainer from '../MiddleContainer/MiddleContainer'
import RightContainer from '../RightContainer/RightContainer'
import { NotificationContainer } from 'react-notifications'

require('../../css/cssGroup');

class App extends React.Component {
    render() {
        return (
            <div>
                <HeaderContainer />
                <div className="container-chat">
                    <LeftContainer />
                    <MiddleContainer />
                    <RightContainer />
                </div>
                <NotificationContainer />
            </div>

        );
    }
}

export default (App);
