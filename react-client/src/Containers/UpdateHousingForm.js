import React, {Component} from "react";
import {connect} from "react-redux";
import {putHousings, fetchSingleHousing} from "../store/actions/houses";

class HousingForm extends Component {

    componentWillMount() {
        console.log("exe api!");
        this.props.fetchSingleHousing(this.props.match.params.username, this.props.match.params.housing_id);
    }

    componentWillUpdate(nextProps) {
        console.log("next props");
        console.log(nextProps);
        // this.setState(nextProps.housings[0]);
    }

    constructor(props){

        console.log("exe constructor!");

        super(props);
        this.state = {
            address: "",
            city: "",
            housing_name: "",
            description: "",
            img_url: ""
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleNewHousing = this.handleNewHousing.bind(this);
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    handleNewHousing = event => {
        event.preventDefault();
        this.props.putHousings(this.props.match.params.username, this.props.match.params.housing_id, this.state);
        if (this.props.errors.message === null)
            this.props.history.push("/");
        this.setState({});
    };

    render(){
        let {housings} = this.props;

        console.log(housings[0]);

        let {housing_name, address, city, description, img_url} = housings[0] || "";

        return (
            <form onSubmit={this.handleNewHousing}>
                {this.props.errors.message && (
                    <div className={"alert alert-danger"}>
                        {this.props.errors.message}
                    </div>
                )}
                <label htmlFor={"housing_name"}>Name:</label>
                <input
                    type="text"
                    name="housing_name"
                    className="form-control"
                    defaultValue={housing_name}
                    onChange={this.handleChange}
                />
                <label htmlFor={"address"}>Address:</label>
                <input
                    type="text"
                    name="address"
                    className="form-control"
                    defaultValue={address}
                    onChange={this.handleChange}
                />
                <label htmlFor={"city"}>City:</label>
                <input
                    type="text"
                    name="city"
                    className="form-control"
                    defaultValue={city}
                    onChange={this.handleChange}
                />
                <label htmlFor={"description"}>Description:</label>
                <input
                    type="text"
                    name="description"
                    className="form-control"
                    defaultValue={description}
                    onChange={this.handleChange}
                />
                <label htmlFor={"img_url"}>Image Url:</label>
                <input
                    type="text"
                    name="img_url"
                    className="form-control"
                    defaultValue={img_url}
                    onChange={this.handleChange}
                />
                <button type={"submit"} className={"btn btn-success"} style={{"marginTop": 10}}>
                    Modify a house
                </button>
            </form>
        )
    }
}

function mapStateToProps(state) {
    console.log(state);
    return {
        errors: state.errors,
        housings: state.housings
    }
}

export default connect(mapStateToProps, {putHousings, fetchSingleHousing})(HousingForm);