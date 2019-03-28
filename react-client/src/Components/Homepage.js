import React, {Component}from "react";
import {Link} from "react-router-dom";
import HousingTimeline from "./HousingTimeline"

class Homepage extends Component {
    constructor(props){
        super(props);
    }

    render(){
        let {currentUser} = this.props;
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
                    <HousingTimeline {...this.props}/>
                </div>
            )
        }
    }
}

export default Homepage;