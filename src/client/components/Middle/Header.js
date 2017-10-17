import {connect} from 'react-redux';
import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import * as chatActions from '../../container/MiddleContainer/chatActions';
import SelectAgent from "../Modal/SelectAgent";
import SelectTheme from "../Modal/SelectTheme";
import _ from 'lodash';


class Header extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.showListAgent = this.showListAgent.bind(this);
        this.showTheme = this.showTheme.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.onSaveSelectListAgent = this.onSaveSelectListAgent.bind(this);

        this.state = {
            showModals: {
                selectTheme: false,
                selectListAgent: false
            }
        }

    }

    showTheme() {
        this.setState({
            showModals: {
                selectTheme: !this.state.showModals.selectTheme,
                selectListAgent : false
            }
        })
    }

    showListAgent() {
        this.props.actions.agentsFetchRequested();
        this.setState({
            showModals: {
                selectTheme: false,
                selectListAgent: !this.state.showModals.selectListAgent
            }
        })
    }


    componentDidMount() {
        $(document).keyup(e => {
            if (e.keyCode === 27) {
                this.closeModal();
            }
        })
    }

    closeModal(){
        this.setState({
            showModals:
                {
                    selectTheme: false,
                    selectListAgent: false
                }

        })
    }

    onSaveSelectListAgent(agents){
        let roomId = this.props.currentRoomId;
        this.props.actions.saveSelectAgent(roomId,agents,this.closeModal);
    }

    render() {
        let modal = null;
        if (this.state.showModals.selectListAgent) {
            modal = <SelectAgent {...this.props} onSave={this.onSaveSelectListAgent} onClose={this.closeModal}/>;
        }
        if (this.state.showModals.selectTheme) {
            modal = <SelectTheme {...this.props} />;
        }
        return (
            <div className="header">
                <div className="title">
                    <div>CHAT HEADER</div>
                    <div className="group-button">
                        <button className="" data-toggle="tooltip" data-placement="top" title="Change theme"
                                data-target="#exampleModal"><i
                            className="fa fa-wrench" onClick={this.showTheme}/></button>
                        <button className="" data-toggle="tooltip" data-placement="top" title="Request user rating">
                            <i className="fa fa-star"/></button>
                        <button className="" data-toggle="tooltip" data-placement="top" title="Add agent to room"><i
                            className="fa fa-plus" onClick={this.showListAgent}/></button>
                        <button className="" data-toggle="tooltip" data-placement="top" title="Push"><i
                            className="fa fa-external-link-square"/></button>
                        <button className="red" data-toggle="tooltip" data-placement="top" title="Close room"><i
                            className="fa fa-times"/></button>

                        {modal}
                    </div>
                </div>

                <div className="list-tag">
                    <button className="tag">Sale</button>
                    <button className="tag">Active</button>
                    <button className="tag red">Delay</button>
                </div>
            </div>
        );
    }
};

Header.propTypes = {
    changeTheme: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
    return {
        currentRoomId : state.currentRoomId,
        agents: state.agents,
        otherAgents : _(state.rooms).find(room => room.id === state.currentRoomId).otherAgents
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({...{}, ...chatActions}, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);