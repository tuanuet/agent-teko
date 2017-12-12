import * as React from "react";
import _ from 'lodash';

class ListAgent extends React.Component {

    constructor(props){
        super(props);
        this.selectAgents = []
    }

    toggleCheckbox = agentId => {
        if (this.selectAgents.includes(agentId)) {
            const index = this.selectAgents.indexOf(agentId)
            this.selectAgents.splice(index, 1)
        } else {
            this.selectAgents.push(agentId);
        }
        this.props.setSelectAgents(this.selectAgents)
    }

    getAgent(agents, roomAgents, currentAgent) {
        return agents.map(agent => {
            const exist = roomAgents.find(ra => ra.id === agent.id)
            const Input = exist ? <input className="form-check-input" checked disabled type="checkbox" label={agent.id} id={`checkbox${agent.id}`} onChange={e => this.toggleCheckbox(agent.id)} /> :
                <input className="form-check-input" type="checkbox" label={agent.id} id={`checkbox${agent.id}`} onChange={e => this.toggleCheckbox(agent.id)}/>
            return (
                <div className="form-check" key={agent.id} >
                    {Input}
                    <label className="form-check-label" htmlFor={`checkbox${agent.id}`}>
                        {agent.name}
                    </label>
                </div>
            )
        })
    }
    render() {
        const { agents, roomAgents, currentAgent } = this.props;

        const Agents = this.getAgent(agents, roomAgents, currentAgent);
        return (
            <ol className="list-agents">
                {Agents}
            </ol>
        );
    }
}
export default ListAgent
