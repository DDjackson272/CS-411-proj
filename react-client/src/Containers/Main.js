import React from 'react';
import {Switch, Route, withRouter, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import Homepage from "../Components/Homepage";
import AuthForm from "../Components/AuthForm"
import {authUser} from "../store/actions/auth"

const Main = props => {
    const {authUser} = props;
    return (
        <div className={"container"}>
            <Switch>
                <Route exact path={"/"} render={ props => < Homepage {...props} /> } />
                <Route exact path={"/signin"} render={ props => {
                    return (
                        <AuthForm
                            onAuth={authUser}
                            buttonText={"Sign in"}
                            heading={"Welcome Back!"}
                            signUp={false}
                            {...props} />
                    );
                }}/>
                <Route exact path={"/signup"} render={ props => {
                    return (
                        <AuthForm
                            onAuth={authUser}
                            buttonText={"Sign up"}
                            heading={"Explore our town today!"}
                            signUp={true}
                            {...props} />
                    );
                }}/>
            </Switch>
        </div>
    )
};

function mapStateToProps(state) {
    return {
        currentUser: state.currentUser
    };
}

export default withRouter(connect(mapStateToProps, {authUser})(Main));