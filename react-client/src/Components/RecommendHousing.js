import React, {Component} from 'react';
import {fetchRecommendHousing} from "../store/actions/houses";
import SearchComponent from "./SearchComponent";
import connect from "react-redux/es/connect/connect";
import HousingItem from "./HousingItem";

class RecommendHousing extends Component{
    componentDidMount(){
        this.props.fetchRecommendHousing(this.props.currentUser.user.username)
    }

    render(){
        let {housings} = this.props;
        console.log(housings)

        let housingList = housings.map((h, index) => (
            <HousingItem
                key={index}
                housing_name={h.housing_name}
                housing_username={h.housing_username}
                housing_type={h.housing_type}
                img_url={h.img_url}
                housing_id={h.housing_id}
                overall_comment={h.overall_comment}
            />
        ));
        return (
            <div>
                <SearchComponent {...this.props}/>
                <div className="row text-center" id="housings">
                    {housingList}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        housings: state.housings,
        currentUser: state.currentUser
    };
}

export default connect(mapStateToProps, {fetchRecommendHousing})(RecommendHousing);