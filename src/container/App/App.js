import React from 'react'
import HeaderContainer from '../HeaderComponent/index'
import LeftContainer from '../LeftContainer/LeftContainer'
import MiddleContainer from '../MiddleContainer/MiddleContainer'
import RightContainer from '../RightContainer/RightContainer'
import OrderCreateContainer  from '../OrderCreateContainer/index'
import { NotificationContainer } from 'react-notifications'
import * as orderActions from 'Actions/orderActions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

require('../../css/cssGroup');

class App extends React.Component {
    constructor() {
        super()
        this.state = {
            width: window.innerWidth,
            isShowInfo: false,
            isShowOrderCreate: false
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
    toggleShowOrderCreate = () => {
        const { actions } = this.props
        this.setState(prevState => ({
            isShowOrderCreate: !prevState.isShowOrderCreate
        }), () => {
            actions.resetOrder()
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
        const { width, isShowInfo, isShowOrderCreate } = this.state
        const isMobile = width < 1200
        return <div>
            <HeaderContainer isMobile={isMobile} />
            <div className={`container-chat ${isShowOrderCreate ? `show-order-create` : ``}`}>
                <OrderCreateContainer
                    isShowOrderCreate={isShowOrderCreate}
                    toggleShowOrderCreate={this.toggleShowOrderCreate} />
                <LeftContainer
                    isShowOrderCreate={isShowOrderCreate}
                    isMobile={isMobile} />
                <MiddleContainer
                    isShowInfo={isShowInfo}
                    isShowOrderCreate={isShowOrderCreate}
                    isMobile={isMobile}
                    toggleShowInfo={this.toggleShowInfo}
                    toggleShowOrderCreate={this.toggleShowOrderCreate} />
                <RightContainer
                    isShowInfo={isShowInfo}
                    isShowOrderCreate={isShowOrderCreate}
                    isMobile={isMobile}
                    toggleShowInfo={this.toggleShowInfo}
                    toggleShowOrderCreate={this.toggleShowOrderCreate} />
            </div>
            <NotificationContainer isMobile={isMobile} />
        </div>
    }
}

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators({...orderActions}, dispatch)
    }
}

export default connect(null, mapDispatchToProps)(App)
