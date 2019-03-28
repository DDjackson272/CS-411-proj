import React, {Component} from 'react';
import {connect} from 'react-redux';
import {removeError} from "../store/actions/errors";

export function withAuth(ComponentToBeRendered) {
    class Authenticate extends Component {
        componentWillMount() {
            if (this.props.isAuthenticated === false) {
                this.props.history.push("/signin");
            }
        }

        componentWillUpdate(nextProps) {
            if (nextProps.isAuthenticated === false) {
                this.props.history.push("/signin");
            }
        }

        render() {
            return <ComponentToBeRendered
                removeError={removeError}
                {...this.props}
            />
        }
    }

    function mapStateToProps(state) {
        return {
            isAuthenticated: state.currentUser.isAuthenticated
        }
    }

    return connect(mapStateToProps, {removeError})(Authenticate);
}