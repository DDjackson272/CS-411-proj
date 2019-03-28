import React from "react";
import {Link} from "react-router-dom";
import HousingTimeline from "./HousingTimeline"
import SearchComponent from "./SearchComponent"

const Homepage = ({currentUser}) => {
    if (!currentUser.isAuthenticated){
        return (
            <div className={"home-hero"}>
                <h1>Welcome to Urbana - Champaign</h1>
                <h4>New in town?</h4>
                <Link to={"/signup"} className={"btn btn-primary"}>Sign Up Here</Link>
            </div>
        );
    } else {
        return (
            <div>
                <HousingTimeline />
            </div>
        )
    }
};

export default Homepage;