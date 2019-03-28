import React, {Component} from 'react';
import {fetchSearchHousing} from "../store/actions/houses";
import SearchComponent from "./SearchComponent";
import connect from "react-redux/es/connect/connect";
import HousingItem from "./HousingItem";

class SearchHousing extends Component{
    constructor(props){
        super(props);
        this.state = {
            housings: []
        }
    }

    componentDidMount(){
        this.props.fetchSearchHousing(this.props.match.params.keyword)
    }

    componentWillReceiveProps(nextProp) {
        if (this.props.match.params.keyword !== nextProp.match.params.keyword)
            this.props.fetchSearchHousing(nextProp.match.params.keyword)
    }

    render(){
        let {housings} = this.props;

        let housingList = housings.map((h, index) => (
            <HousingItem
                key={index}
                housing_name={h.housing_name}
                username={h.username}
                housing_type={h.housing_type}
                img_url={h.img_url}
                housing_id={h.housing_id}
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

export default connect(mapStateToProps, {fetchSearchHousing})(SearchHousing);