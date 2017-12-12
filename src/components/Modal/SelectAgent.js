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
                    <div className="title">Thêm admin vào phòng chat</div>
                    <hr/>
                    <div role="form" className="list-theme">
                        <ListAgent
                            agents={this.props.agents}
                            roomAgents={this.props.roomAgents}
                            currentAgent={this.props.currentAgent}
                            setSelectAgents={this.setSelectAgents} />
                    </div>
                    <hr/>
                    <div className="control">
                        <button type="button" className="btn btn-primary save clickable" onClick={e => {
                            this.props.onSave(this.state.agents.map(agentId => this.props.agents.find(tmp => tmp.id === agentId)))
                        }}>Lưu</button>
                        <button type="button" className="btn cancel clickable" onClick={this.props.onClose}>Hủy</button>
                    </div>
                </div>

            </div>
        )
    }
}
