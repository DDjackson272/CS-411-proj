import React, {Component} from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {logout} from "../store/actions/auth";

class Navbar extends Component {
    logout = e => {
        e.preventDefault();
        this.props.logout();
    };

    render(){
        return (
            <nav className="navbar navbar-expand">
                <div className="container-fluid">
                    <div className={"navbar-header"}>
                        <Link to={"/"} className={"navbar-brand"}>
                            <img src="https://campusrec.illinois.edu/wp-content/uploads/2017/08/block-I-icon-512x512-300x300.png" alt="Travelling in Chambana"/>
                            Travelling in Chambana
                        </Link>
                    </div>
                    {this.props.currentUser.isAuthenticated ? (
                        <ul className="uav navbar-nav navbar-right">
                            <li>
                                <Link to={`/housing/${this.props.currentUser.user.username}/recommend`}>
                                    Hi, {this.props.currentUser.user.username}!
                                </Link>
                            </li>
                            <li>
                                <Link to={ `/user/${this.props.currentUser.user.username}/housing/new`} >
                                    New Housing
                                </Link>
                            </li>
                            <li>
                                <Link to={"/"} onClick={this.logout}>
                                    Log out
                                </Link>
                            </li>
                        </ul>
                    ) : (
                        <ul className="nav navbar-nav navbar-right">
                            <li>
                                <Link to={"/signup"}>Sign up</Link>
                            </li>
                            <li>
                                <Link to={"/signin"}>Sign In</Link>
                            </li>
                        </ul>
                    )}
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

export default connect(mapStateToProps, {logout})(Navbar);