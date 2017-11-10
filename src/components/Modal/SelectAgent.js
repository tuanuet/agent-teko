import React from 'react'
import ListAgent from '../ListAgent';

export default class SelectAgent extends React.Component {
    constructor(props){
        super(props);
        this.state = {agents: []};
    }
    setSelectAgents = agents => {
        this.setState({
            agents
        });
    }
    render(){
        return (
            <div className="lio-modal show" id="selectListAgent" data-toggle="modal">
                <div className="body">
                    <div className="title">Select your agent</div>
                    <hr/>
                    <div role="form" className="list-theme">
                        <ListAgent agents={this.props.agents} setSelectAgents={this.setSelectAgents} roomAgents={this.props.roomAgents}/>
                    </div>
                    <hr/>
                    <div className="control">
                        <button type="button" className="btn btn-primary save" onClick={e => {
                            this.props.onSave(this.state.agents)
                        }}>Save</button>
                        <button type="button" className="btn cancel" onClick={this.props.onClose}>Cancel</button>
                    </div>
                </div>

            </div>
        )
    }
}
