import React, {PropTypes} from 'react';
import Customer from './Customer';
import CustomerFullInfo from './CustomerFullInfo';
import NoteList from './NoteList';
import TakeNote from './TakeNote';

const RightComponent = () => {
    return(
        <div className="right">
            <Customer/>
            <CustomerFullInfo/>
            <NoteList/>
            <TakeNote/>
        </div>
    );
};

export default RightComponent;