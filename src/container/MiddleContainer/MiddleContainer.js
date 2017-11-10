import React from 'react';
import {connect} from 'react-redux';
import ChatContentContainer from '../ChatContentContainer'
import Header from '../../components/Middle/Header'
import BottomBarContainer from '../BottomBarContainer'

class MiddleContainer extends React.Component {
    constructor(props) {
        super(props);
        this.changeTheme = this.changeTheme.bind(this);

        const localStorage = window.localStorage;
        const color = localStorage.getItem('themeColor');
        this.state = {theme: color ? color : 'blue'};
    }

    changeTheme(e) {
        const localStorage = window.localStorage;
        const color = e.target.className;
        localStorage.setItem('themeColor', color);
        this.setState({theme: color})
    }

    render() {

        const { currentRoomId } = this.props;
        if (!currentRoomId) {
            return false
        } else {
            return (

              <div className="middle">
                  <Header
                      changeTheme={this.changeTheme}
                  />

                  <ChatContentContainer
                    theme={this.state.theme}
                  />

                  <BottomBarContainer/>
              </div>
            );
        }
    }
}

function mapStateToProps(state, ownProps) {
    return {
        currentRoomId: state.currentRoomId
    };
}

function mapDispatchToProps(dispatch) {
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(MiddleContainer);
