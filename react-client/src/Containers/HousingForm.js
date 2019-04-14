import React, {Component} from "react";
import {connect} from "react-redux";
import {postHousings} from "../store/actions/houses";

class HousingForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            address: "",
            city: "",
            housing_name: "",
            description: "",
            img_url: "",
            housing_type: "",
            parking: 0,
            cooking: 0,
            large_bed: 0
        };
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    handleNewHousing = event => {
        event.preventDefault();
        this.props.postHousings(this.state)
            .then(res => {
                if (!res){
                    this.props.history.push("/");
                }
            })
    };

    handleCooking = () => {
        let origin = this.state.cooking;
        this.setState({
            cooking: 1-origin
        })
    };

    handleParking = () => {
        let origin = this.state.parking;
        this.setState({
            parking: 1-origin
        })
    };

    handleLargeBed = () => {
        let origin = this.state.large_bed;
        this.setState({
            large_bed: 1-origin
        })
    };

    render(){
        const {housing_name, address, city, description, img_url, housing_type,
            parking, cooking, large_bed} = this.state;

        let {history, removeError} = this.props;

        history.listen(() => {
            removeError();
        });

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
                    value={housing_name}
                    required={true}
                    onChange={this.handleChange}
                />
                <label htmlFor={"address"}>Address:</label>
                <input
                    type="text"
                    name="address"
                    className="form-control"
                    value={address}
                    required={true}
                    onChange={this.handleChange}
                />
                <label htmlFor={"city"}>City:</label>
                <input
                    type="text"
                    name="city"
                    className="form-control"
                    value={city}
                    required={true}
                    onChange={this.handleChange}
                />
                <label htmlFor={"housing_type"}>Type:</label>
                <select
                    name="housing_type"
                    className="form-control"
                    value={housing_type}
                    required={true}
                    onChange={this.handleChange}>
                    <option value=""/>
                    <option value="home stay">home stay</option>
                    <option value="hotel">hotel</option>
                </select>
                <div>
                    <label htmlFor={"parking"}>Parking:</label>
                    <input
                        type="checkbox"
                        name="parking"
                        value={parking}
                        onChange={this.handleParking}
                        style={{"marginLeft": 10}}
                        checked={parking === 1}
                    />
                    <label htmlFor={"cooking"} style={{"marginLeft": 10}}>Cooking:</label>
                    <input
                        type="checkbox"
                        name="cooking"
                        value={cooking}
                        onChange={this.handleCooking}
                        style={{"marginLeft": 10}}
                        checked={cooking === 1}
                    />
                    <label htmlFor={"large_bed"} style={{"marginLeft": 10}}>Large Bed:</label>
                    <input
                        type="checkbox"
                        name="large_bed"
                        value={large_bed}
                        onChange={this.handleLargeBed}
                        style={{"marginLeft": 10}}
                        checked={large_bed === 1}
                    />
                </div>
                <label htmlFor={"img_url"}>Image Url:</label>
                <input
                    type="url"
                    name="img_url"
                    className="form-control"
                    value={img_url}
                    required={true}
                    onChange={this.handleChange}
                />
                <label htmlFor={"description"}>Description:</label>
                <textarea
                    name="description"
                    className="form-control"
                    value={description}
                    required={true}
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
