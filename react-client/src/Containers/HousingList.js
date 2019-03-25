import React, {Component} from 'react';
import {connect} from "react-redux";
import {fetchHousings, fetchGroupByHousing} from "../store/actions/houses";
import HousingItem from "../Components/HousingItem"
import {Link} from 'react-router-dom';

class HousingList extends Component {
    componentDidMount() {
        this.props.fetchHousings();
        this.props.fetchGroupByHousing();
    }

    render() {
        const {groupbyHousings, housings} = this.props;

        let groupbyList = groupbyHousings.map((g, index) => (
            <li key={index}>{g.city}: {g.housing_number}</li>
        ));

        let housingList = housings.map((h, index) => (
            <HousingItem
                key={index}
                housing_name={h.housing_name}
                username={h.username}
                img_url={h.img_url}
                housing_id={h.housing_id}
            />
        ));

        return (
            <div>
                <div>
                    { housingList.length > 0 && <h4> Housing distribution </h4>}
                    <ul>
                        {groupbyList}
                    </ul>
                </div>
                <div className={"row col-sm-8"}>
                    <div className="offset-1 com-sm-10">
                        <ul className="list-group" id="housings">
                            {housingList}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        housings: state.housings,
        currentUser: state.currentUser,
        groupbyHousings: state.groupbyHousings
    };
}

export default connect(mapStateToProps,
    {fetchHousings, fetchGroupByHousing})(HousingList);