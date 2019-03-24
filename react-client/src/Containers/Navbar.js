import React, {Component} from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";

class Navbar extends Component {
    render(){
        return (
            <nav className="navbar navbar-expand">
                <div className="container-fluid">
                    <Link to={"/"} className={"navbar-brand"}>
                        <img src="https://campusrec.illinois.edu/wp-content/uploads/2017/08/block-I-icon-512x512-300x300.png" alt="Travelling in Chambana"/>
                        Travelling in Chambana
                    </Link>
                    <ul className="nav navbar-nav navbar-right">
                        <li>
                            <Link to={"/signup"}>Sign up</Link>
                        </li>
                        <li>
                            <Link to={"/signin"}>Sign In</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}


function mapStateToProps(state){
    return {
        currentUser: state.currentUser
    }
}

export default connect(mapStateToProps, null)(Navbar);