import React from 'react'
import HeaderContainer from '../HeaderComponent/index'
import LeftContainer from '../LeftContainer/LeftContainer'
import MiddleContainer from '../MiddleContainer/MiddleContainer'
import RightContainer from '../RightContainer/RightContainer'
import { NotificationContainer } from 'react-notifications'

require('../../css/cssGroup');

class App extends React.Component {
    constructor() {
        super()
        this.state = {
            width: window.innerWidth,
            isShowInfo: false
        }
    }
    componentWillMount() {
        window.addEventListener('resize', this.handleWindowResize)
    }
    handleWindowResize = () => {
        this.setState({
            width: window.innerWidth
        })
    }
    toggleShowInfo = () => {
        this.setState(prevState => ({
            isShowInfo: !prevState.isShowInfo
        }))
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowResize)
    }
    render() {
        const { width, isShowInfo } = this.state
        const isMobile = width < 1200
        return <div>
            <HeaderContainer isMobile={isMobile} />
            <div className="container-chat">
                <LeftContainer isMobile={isMobile} />
                <MiddleContainer
                    isShowInfo={isShowInfo}
                    isMobile={isMobile}
                    toggleShowInfo={this.toggleShowInfo} />
                <RightContainer
                    isShowInfo={isShowInfo}
                    isMobile={isMobile}
                    toggleShowInfo={this.toggleShowInfo} />
            </div>
            <NotificationContainer isMobile={isMobile} />
        </div>
    }
}

export default (App);
