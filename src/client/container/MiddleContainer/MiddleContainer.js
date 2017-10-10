import React from 'react';
import {connect} from 'react-redux';
import ChatContentContainer from '../ChatContentContainer'
import Header from '../../components/Middle/Header'
import BottomBarContainer from '../BottomBarContainer'

class MiddleContainer extends React.Component {
    constructor(props) {
        super(props);
        this.showTheme = this.showTheme.bind(this);
        this.changeTheme = this.changeTheme.bind(this);

        const localStorage = window.localStorage;
        const color = localStorage.getItem('themeColor');
        this.state = {theme: color ? color : 'blue'};
    }

    showTheme() {
        $('#selectTheme').toggleClass('show');
    }

    changeTheme(e) {
        const localStorage = window.localStorage;
        const color = e.target.className;
        localStorage.setItem('themeColor', color);
        this.setState({theme: color})
    }

    render() {

        const {currentRoomId} = this.props;
        console.log('MiddleComponent run',currentRoomId);
        if (!currentRoomId) {
            return <div>WELCOME</div>;
        } else {
            $('#test').tooltip();
            return (

              <div className="middle">
                  <Header
                      showTheme={this.showTheme}
                      theme={this.state.theme}
                      changeTheme={this.changeTheme}
                  />

                  <ChatContentContainer
                    showTheme={this.showTheme}
                    theme={this.state.theme}
                    changeTheme={this.changeTheme}
                  />

                  <BottomBarContainer/>
              </div>
            );
        }
    }
}

function mapStateToProps(state, ownProps) {
    return {
        currentRoomId: state.currentRoomId,
    };
}

function mapDispatchToProps(dispatch) {
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(MiddleContainer);
