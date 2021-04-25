import React from 'react';
// import './Landing.css';
import { Button } from "@material-ui/core";
import { get, post } from "../../utilities"

const Landing = () => {

    const handleTouchstone = () => {
        let link = window.location.origin.replace("http:", "https:") + "/api/signUpLogin";
        if (link.includes("localhost:5000")) link = window.location.origin + "/api/signUpLogin";
        let encodedLink = encodeURIComponent(link);

        get("/api/getRedirectLink").then((ret) => {
            window.location.href = ret.link + "login?redirect=" + encodedLink;
        });
    };
    return (
        <div>
            <Button variant="contained" onClick={handleTouchstone}>
                Login
            </Button>
        </div>
    );
}

export default Landing;
