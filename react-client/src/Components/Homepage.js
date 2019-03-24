import React from "react";
import {Link} from "react-router-dom";

const Homepage = () => (
    <div className={"home-hero"}>
        <h1>Welcome to Urbana - Champaign</h1>
        <h4>New in town?</h4>
        <Link to={"/signup"} className={"btn btn-primary"}>Sign Up Here</Link>
    </div>
);

export default Homepage;