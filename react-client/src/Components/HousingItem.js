import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import connect from "react-redux/es/connect/connect";
import {changeHistory} from "../store/actions/houses";

class HousingItem extends Component {
    handleLike = event => {
        event.preventDefault();
        this.props.changeHistory(this.props.currentUser.user.username, this.props.housing_id)
    };

    render () {
        let {housing_id, housing_name, visited,
            housing_username, img_url, overall_comment} = this.props;
        return (
            <div className={"col-md-3 col-sm-6"}>
                <div className="img-thumbnail housing-item">
                    <img src={img_url} style={{"width": "100%"}} alt={housing_name}/>
                    <div className={"caption"}>
                        {housing_name}, {overall_comment || "Average"}
                    </div>
                    <div style={{"padding": "10px 20px 10px 20px"}}>
                        <Link to={`/user/${housing_username}/housing/${housing_id}`}
                              className={"btn btn-primary"}>
                            Read
                        </Link>
                        <form onSubmit={this.handleLike}>
                            <button type={"submit"}
                                    className={"btn btn-success"}
                                    style={{"marginTop": 10}}
                                    disabled={visited}
                            >
                                Like it!
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        currentUser: state.currentUser,
    };
}

export default connect(mapStateToProps, {changeHistory})(HousingItem);