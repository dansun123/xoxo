import React from 'react';
// import './Landing.css';
import {Button} from "@material-ui/core";


const Landing = () => {

    const handleTouchstone = () => {
        // TODO: Launch touchstone
    }

    return (
        <div>
            <Button variant="contained" onClick={handleTouchstone}>
                Login
            </Button>
        </div>
    );
}

export default Landing;
