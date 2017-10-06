import React, {PropTypes} from 'react';
import Header from './Header';
import ChatContent from './ChatContent';
import BottomBarContainer from '../../container/BottomBarContainer';

class MiddleComponent extends React.Component{
    render(){
        return(
            <div className="middle">
                <Header
                    {...this.props}
                />

                <ChatContent
                    {...this.props}
                />

                <BottomBarContainer/>
            </div>
        )
    }
}

MiddleComponent.propTypes = {
    showTheme: PropTypes.func.isRequired,
    changeTheme: PropTypes.func.isRequired,
    theme: PropTypes.string.isRequired
};


export default MiddleComponent;