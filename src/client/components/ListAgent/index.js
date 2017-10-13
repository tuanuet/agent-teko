import * as React from "react";

function getAgent(agents) {
    return agents.map( (agent,key) => {
        return (
            <div className="form-check">
                <input className="form-check-input" type="checkbox" name="exampleRadios" id={`checkbox${key}`} value="option1" />
                <label className="form-check-label" htmlFor={`checkbox${key}`}>
                    {agent.agentName}
                </label>
            </div>
        )
    })
}

class ListAgent extends React.Component {

    render() {
        let agents = getAgent(this.props.agents);
        return (
            <ol className="list-agents">
                {agents}
            </ol>
        );
    }
}
export default ListAgent