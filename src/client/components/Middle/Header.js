import React, {PropTypes} from 'react';

const Header = ({showTheme, changeTheme}) => {
    return(
        <div className="header">
            <div className="title">
                <div>CHAT HEADER</div>
                <div className="group-button">
                    <button className="" data-toggle="tooltip" data-placement="top" title="Change theme"
                            data-target="#exampleModal"><i
                        className="fa fa-wrench" onClick={showTheme}/></button>

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
    );
};

Header.propTypes = {
    showTheme: PropTypes.func.isRequired,
    changeTheme: PropTypes.func.isRequired,
};

export default Header;