import React, {PropTypes} from 'react';
import Header from './Header';
import ChatContent from './ChatContent';
import ChatInput from './ChatInput';

const MiddleComponent = ({theme, showTheme, changeTheme}) => {
    return(
        <div className="middle">
            <Header
                changeTheme={changeTheme}
                showTheme={showTheme}
            />
            <ChatContent
                theme={theme}
            />
            <ChatInput/>

        </div>
    )
};

MiddleComponent.propTypes = {
    showTheme: PropTypes.func.isRequired,
    changeTheme: PropTypes.func.isRequired,
    theme: PropTypes.string.isRequired
};


export default MiddleComponent;