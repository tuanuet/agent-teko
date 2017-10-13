import React, {PropTypes} from 'react';
import ListAgent from '../../components/ListAgent';
let agents = [
    {agentName : "Vuong oc"},
    {agentName : "Vuong oc22"},
    {agentName : "Vuong oc asdkfaalsdflkasd"},
    {agentName : "Vuong oc 123123"},
    {agentName : "Vuong oc1"},
    {agentName : "Vuon"}
]

class Header extends React.Component {
    showTheme() {
        $('#selectTheme').toggleClass('show');
    }
    showListAgent(){
        $('#selectListAgent').toggleClass('show');
    }
    componentDidMount(){
        $(document).keyup(e => {
            if(e.keyCode === 27 ) {
                $('.lio-modal').removeClass('show');
            }
        })
    }
    render(){
        let {changeTheme} = this.props;
        return(
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


                        <div className="lio-modal" id="selectListAgent" data-toggle="modal">
                            <div className="body">
                                <div className="title">Select your agent</div>
                                <hr/>
                                <div role="form" className="list-theme">
                                    <ListAgent agents={agents}/>
                                </div>
                                <hr/>
                                <div className="control">
                                    <button type="button" className="btn btn-primary save">Save</button>
                                    <button type="button" className="btn cancel">Cancel</button>
                                </div>
                            </div>

                        </div>
                        <div className="lio-modal" id="selectTheme" data-toggle="modal">
                            <div className="body">
                                <div className="title">Select your theme</div>
                                <div className="list-theme">
                                    <button className="black" onClick={changeTheme}/>
                                    <button className="blue" onClick={changeTheme}/>
                                    <button className="pink" onClick={changeTheme}/>
                                </div>
                            </div>
                        </div>
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

export default Header;