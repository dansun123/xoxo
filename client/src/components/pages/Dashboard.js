import React, {useState} from 'react';
import {Box, Button, TextField} from "@material-ui/core";


const Dashboard = () => {

    const [picks, setPicks] = useState({
        pick1: "",
        pick2: "",
        pick3: ""
    });

    const handleChange = e => {
        setPicks({...picks, [e.target.id]: e.target.value});
    };

    const handleSubmit = () => {
        // TODO: Submit the picks to db
    };

    return (
        <Box display="flex" flexDirection="column">
            <Box display="flex" flexDirection="column">
                <TextField label="Pick #1" id="pick1" value={picks.pick1} onChange={handleChange}/>
                <TextField label="Pick #2" id="pick2" value={picks.pick2} onChange={handleChange}/>
                <TextField label="Pick #3" id="pick3" value={picks.pick3} onChange={handleChange}/>
            </Box>
        </Box>
    );
}

export default Dashboard;
