import React, {Component} from 'react';
import {fetchSingleHousing, removeHousings} from "../store/actions/houses";
import connect from "react-redux/es/connect/connect";
import {Link} from "react-router-dom";

class SingleHousing extends Component {
    componentDidMount(){
        this.props.fetchSingleHousing(this.props.match.params.username, this.props.match.params.housing_id);
    }

    render(){
        let {housings, currentUser, removeHousings} = this.props;
        let housingDetail = housings.map((h, index) => (
            <div key={index}>
                {index === 0 && (
                    <div>
                        <ul>
                            <li>{h.housing_name}</li>
                            <li>{h.address}</li>
                            <li>{h.city}</li>
                            <li>{h.housing_type}</li>
                            <li>{h.description}</li>
                            <img src={h.img_url} alt={h.housing_name} width="500"/>
                        </ul>
                        {currentUser.user.username === h.username && (
                            <div>
                                <div>
                                    <Link className={"btn btn-danger"}
                                    onClick={removeHousings.bind(this, h.username, h.housing_id)}
                                    to={"/"}>
                                    Delete
                                    </Link>
                                </div>
                                <div>
                                    <Link to={`/user/${h.username}/housing/${h.housing_id}/update`}
                                    className={"btn btn-warning"}
                                    style={{"marginTop": 10}}>
                                    Modify
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {h.content && (
                    <ul>
                        <li>{h.content}</li>
                        <li>{h.username}</li>
                    </ul>
                )}
            </div>
        ));
        return (
            <div>
                {housingDetail}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        housings: state.housings,
        currentUser: state.currentUser,
    };
}

export default connect(mapStateToProps, {fetchSingleHousing, removeHousings})(SingleHousing);