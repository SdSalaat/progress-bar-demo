import React from "react";
import ProgressBar from 'react-bootstrap/ProgressBar';

const ProgressBars = ({bar}) => {
    let value = bar < 0 ? 0 : bar;
    return (
        <ProgressBar now={value} variant={bar > 100 ? 'danger' : ''} label={`${value}%`}/>
    )
};

export default ProgressBars;
