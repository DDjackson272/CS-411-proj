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
                        Basic Information:
                        <ul>
                            <li>{h.housing_name}</li>
                            <li>{h.address}</li>
                            <li>{h.city}</li>
                            <li>{h.housing_type}</li>
                            <li>{h.description}</li>
                            {((h.parking === 1) || (h.cooking === 1) || (h.large_bed === 1)) && (
                                <li>
                                    Special features:
                                    <ul>
                                        {h.parking === 1 && (
                                            <li>parking</li>
                                        )}
                                        {h.cooking === 1 && (
                                            <li>cooking</li>
                                        )}
                                        {h.large_bed === 1 && (
                                            <li>large bed</li>
                                        )}
                                    </ul>
                                </li>
                            )}
                            <img src={h.img_url} alt={h.housing_name} width="500"/>
                            {currentUser.user.username === h.housing_username && (
                                <div style={{"marginTop": 10}}>
                                    <div>
                                        <Link className={"btn btn-danger"}
                                              onClick={removeHousings.bind(this, h.housing_username, h.housing_id)}
                                              to={"/"}>
                                            Delete
                                        </Link>
                                    </div>
                                    <div>
                                        <Link to={`/user/${h.housing_username}/housing/${h.housing_id}/update`}
                                              className={"btn btn-warning"}
                                              style={{"marginTop": 10}}>
                                            Modify
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </ul>
                        <div>
                            Analysis from comments:
                        </div>
                    </div>
                )}

                {h.content && (
                    <div>
                        {index === 0 && (
                            <div>
                                Comments:
                            </div>
                        )}
                        <ul>
                            {h.username}
                            <li>{h.content}</li>
                        </ul>
                    </div>
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