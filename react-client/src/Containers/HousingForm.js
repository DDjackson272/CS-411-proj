import React, {Component} from "react";
import {connect} from "react-redux";
import {postHousings} from "../store/actions/houses";

class HousingForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            address: "",
            city: ""
        };
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    handleNewHousing = event => {
        event.preventDefault();
        this.props.postHousings(this.state);
        this.setState({});
        this.props.history.push("/");
    };

    render(){
        const {address, city} = this.state;
        return (
            <form onSubmit={this.handleNewHousing}>
                {this.props.errors.message && (
                    <div className={"alert alert-danger"}>
                        {this.props.errors.message}
                    </div>
                )}
                <label htmlFor={"address"}>Address:</label>
                <input
                    type="text"
                    name="address"
                    className="form-control"
                    value={address}
                    onChange={this.handleChange}
                />
                <label htmlFor={"city"}>City:</label>
                <input
                    type="text"
                    name="city"
                    className="form-control"
                    value={city}
                    onChange={this.handleChange}
                />
                <button type={"submit"} className={"btn btn-success"} style={{"marginTop": 10}}>
                    Add a house
                </button>
            </form>
        )
    }
}

function mapStateToProps(state) {
    return {
        errors: state.errors
    }
}

export default connect(mapStateToProps, {postHousings})(HousingForm);
