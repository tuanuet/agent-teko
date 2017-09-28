import React from 'react';
import {connect} from 'react-redux';

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
            <div className="middle">
                <div className="header">
                    <div className="title">
                        <div>CHAT HEADER</div>
                        <div className="group-button">
                            <button className="" data-toggle="tooltip" data-placement="top" title="Change theme"
                                    data-target="#exampleModal"><i
                                className="fa fa-wrench" onClick={this.showTheme}/></button>

                            <div className="lio-modal" id="selectTheme" data-toggle="modal">
                                <div className="body">
                                    <div className="title">Select your theme</div>
                                    <div className="list-theme">
                                        <button className="black" onClick={this.changeTheme}/>
                                        <button className="blue" onClick={this.changeTheme}/>
                                        <button className="pink" onClick={this.changeTheme}/>
                                    </div>
                                </div>
                            </div>


                            <button className="" data-toggle="tooltip" data-placement="top" title="Request user rating">
                                <i className="fa fa-star"/></button>
                            <button className="" data-toggle="tooltip" data-placement="top" title="Add agent to room"><i
                                className="fa fa-plus"/></button>
                            <button className="" data-toggle="tooltip" data-placement="top" title="Push"><i
                                className="fa fa-external-link-square"/></button>
                            <button className="red" data-toggle="tooltip" data-placement="top" title="Close room"><i
                                className="fa fa-times"/></button>
                        </div>
                    </div>

                    <div className="list-tag">
                        <button className="tag">Sale</button>
                        <button className="tag">Active</button>
                        <button className="tag red">Delay</button>
                    </div>
                </div>
                <div className={'body ' + this.state.theme}>
                    <div className="chat-group self">
                        <div className="chat">Hello</div>
                    </div>
                    <div className="chat-group other">
                        <div className="chat">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid laborum
                            molestiae
                            quo.
                        </div>
                    </div>
                    <div className="chat-group self">
                        <div className="chat">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid laborum
                            molestiae
                            quo.
                        </div>
                    </div>
                </div>
                <div className="bottom">
                    <div className="chat-input">
                        <input className="form-control" type="text" placeholder="Type here"/>
                    </div>
                    <div className="group-button">
                        <a className="button send" href="#"><i className="fa fa-paper-plane" aria-hidden="true"></i></a>
                    </div>
                </div>

            </div>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

export default connect(mapStateToProps)(MiddleContainer);