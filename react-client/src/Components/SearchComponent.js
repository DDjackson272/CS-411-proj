import React, {Component} from 'react';
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

    handleSearch = event => {
        event.preventDefault();
        this.props.history.push(`/housing/${this.state.keyword}`)
    };

    render(){
        let {keyword} = this.state;
        return (
            <div>
                <form onSubmit={this.handleSearch}>
                    <label htmlFor={"search"}>Search for housing:</label>
                    <input
                        type="text"
                        name="keyword"
                        className="form-control"
                        value={keyword}
                        required={true}
                        onChange={this.handleChange}
                    />
                    <button type={"submit"} className={"btn btn-success"} style={{"margin": 10}}>
                        Feeling Lucky
                    </button>
                </form>
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