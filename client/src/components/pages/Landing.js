import React from 'react';
import './Landing.css';
import {Button} from "rebass";

const Landing = () => {

    const touchstone = () => {
        // Launch touchstone
    }

    return (
        <div className="Landing">
            <Button className="button-outline" onClick={touchstone}>
                Login
            </Button>
        </div>
    );
}

export default Landing;
