import React, {Component} from 'react';
import {connect} from "react-redux";
import {fetchHousings} from "../store/actions/houses";
import HousingItem from "../Components/HousingItem"

class HousingList extends Component {
    componentDidMount() {
        this.props.fetchHousings();
    }

    render(){
        const {housings} = this.props;
        let housingList = housings.map(h => (
            <HousingItem
                key={h.housing_id}
                address={h.address}
                username={h.username}
            />
        ));

        return (
            <div className={"row col-sm-8"}>
                <div className="offset-1 com-sm-10">
                    <ul className="list-group" id="housings">
                        {housingList}
                    </ul>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        housings: state.housings
    };
}

export default connect(mapStateToProps, {fetchHousings})(HousingList);