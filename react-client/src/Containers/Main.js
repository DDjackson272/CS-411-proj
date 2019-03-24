import React from 'react';
import {Switch, Route, withRouter, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import Homepage from "../Components/Homepage";
import AuthForm from "../Components/AuthForm"
import {authUser} from "../store/actions/auth"
import {removeError} from "../store/actions/errors";
import {withAuth} from "../hocs/withAuth";
import HousingForm from "../Containers/HousingForm";

const Main = props => {
    const {authUser, errors, removeError, currentUser} = props;
    return (
        <div className={"container"}>
            <Switch>
                <Route exact path={"/"} render={ props =>
                    < Homepage
                        currentUser={currentUser}
                        {...props} />
                } />
                <Route exact path={"/signin"} render={ props => {
                    return (
                        <AuthForm
                            removeError={removeError}
                            errors={errors}
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
                            removeError={removeError}
                            errors={errors}
                            onAuth={authUser}
                            buttonText={"Sign up"}
                            heading={"Explore our town today!"}
                            signUp={true}
                            {...props} />
                    );
                }}/>
                <Route
                    exact path={"/user/:username/housing/new"}
                    component={withAuth(HousingForm)}
                />
            </Switch>
        </div>
    )
};

function mapStateToProps(state) {
    return {
        currentUser: state.currentUser,
        errors: state.errors // errors is an array of messages
    };
}

export default withRouter(connect(mapStateToProps, {authUser, removeError})(Main));