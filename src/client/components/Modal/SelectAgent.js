import ListAgent from '../ListAgent';
import React from 'react'
export default function (props) {
    return (
        <div className="lio-modal show" id="selectListAgent" data-toggle="modal">
            <div className="body">
                <div className="title">Select your agent</div>
                <hr/>
                <div role="form" className="list-theme">
                    <ListAgent agents={props.agents}/>
                </div>
                <hr/>
                <div className="control">
                    <button type="button" className="btn btn-primary save">Save</button>
                    <button type="button" className="btn cancel">Cancel</button>
                </div>
            </div>

        </div>
    )
}