import React from 'react';
import {connect} from 'react-redux';
import MiddleComponent from '../../components/middle/MiddleComponent';

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
        $('#test').tooltip();
        return (
            <MiddleComponent
                showTheme={this.showTheme}
                theme={this.state.theme}
                changeTheme={this.changeTheme}
            />
        );
    }
}

function mapStateToProps(state) {
    return {};
}

export default connect(mapStateToProps)(MiddleContainer);