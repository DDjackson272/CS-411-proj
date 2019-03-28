import React, {Component} from 'react';
import {Link} from "react-router-dom";
import connect from "react-redux/es/connect/connect";

class SearchComponent extends Component{
    constructor(props) {
        super(props);
        this.state = {
            keyword:""
        };
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    render(){
        let {keyword} = this.state;
        return (
            <div>
                <label htmlFor={"search"}>Search for housing:</label>
                <input
                    type="text"
                    name="keyword"
                    className="form-control"
                    value={keyword}
                    required={true}
                    onChange={this.handleChange}
                />
                <Link to={`/housing/${keyword}`} className={"btn btn-primary"}>
                    Feeling Lucky
                </Link>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        keyword: state.keyword
    }
}

export default connect(mapStateToProps, null)(SearchComponent);