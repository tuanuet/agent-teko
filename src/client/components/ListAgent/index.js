import * as React from "react";
import _ from 'lodash';

class ListAgent extends React.Component {

    constructor(props){
        super(props);
        this.toggleCheckbox = this.toggleCheckbox.bind(this);
    }

    componentWillMount() {
        this.elderSelectAgents = _(this.props.otherAgents).map(agent => agent.agentId).value();
        console.log('otherAgentDefault:',this.elderSelectAgents);
        this.selectAgents = [...this.elderSelectAgents];
    }

    toggleCheckbox(agentId) {
        if (_(this.selectAgents).some(agentId)) {
            _(this.selectAgents).remove(agentId);
        } else {
            this.selectAgents.push(agentId);
        }
        this.props.getSelectAgents(this.selectAgents)
    }

    getAgent(agents,otherAgents) {
        return agents.map((agent,key) => {
            let exist = _(otherAgents).some(item => agent.id === item.agentId);
            let Input = exist ?  <input className="form-check-input" checked type="checkbox" label={agent.id} id={`checkbox${agent.id}`} onChange={this.toggleCheckbox.bind(this, agent.id)}/> :
                <input className="form-check-input" type="checkbox" label={agent.id} id={`checkbox${agent.id}`} onChange={this.toggleCheckbox.bind(this, agent.id)}/>
            return (
                <div className="form-check" key={key} >
                    {Input}
                    <label className="form-check-label" htmlFor={`checkbox${agent.id}`}>
                        {agent.agentName}
                    </label>
                </div>
            )
        })
    }
    render() {
        let {agents,otherAgents} = this.props;
        let Agents = this.getAgent(agents,otherAgents);
        return (
            <ol className="list-agents">
                {Agents}
            </ol>
        );
    }
}
export default ListAgent