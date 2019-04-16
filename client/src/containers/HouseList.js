import React from "react";
import { connect } from "react-redux";
import { fetchHouses } from "../store/actions/houses";
import HouseCard from "../views/HouseCard/HouseCard.js";

class HouseList extends React.Component {

	componentDidMount() {
		this.props.fetchHouses();
		console.log("componentDidMount");
	}

	render() {
		//this.props.fetchHouses();
		const { houses, hotelFilter, homeStayFilter, parkingFilter, cookingFilter, largebedFilter } = this.props;
		let filterHouses = houses;
		if (hotelFilter) {
			filterHouses = filterHouses.filter(house => {
				return house.housing_type === "hotel";
			});
		}
		if (homeStayFilter) {
			filterHouses = filterHouses.filter(house => {
				return house.housing_type === "home stay";
			});
		}
		if (parkingFilter) {
			filterHouses = filterHouses.filter(house => {
				return house.parking === 1;
			});
		}
		if (cookingFilter) {
			filterHouses = filterHouses.filter(house => {
				return house.cooking === 1;
			});
		}
		if (largebedFilter) {
			filterHouses = filterHouses.filter(house => {
				return house.large_bed === 1;
			});
		}

		console.log(".....house......");
		console.log(filterHouses);
		// const filterHouses = houses.filter(house => {
		// 	return house.housing_name.toLowerCase().includes(searchValue.toLowerCase());
		// });
		// console.log(".....filter.....");
		// console.log(filterHouses);
		let houseList = filterHouses.map((h, index) => (
			<HouseCard 
				key={index}
				visited={h.visited}
				housing_name={h.housing_name}
				housing_type={h.housing_type}
				address={h.address}
				city={h.city}
				img_url={h.img_url}
				parking={h.parking}
				cooking={h.cooking}
				large_bed={h.large_bed}
				description={h.description}
				positive_comment={h.positive_comment}
				neutral_comment={h.neutral_comment}
				negative_comment={h.negative_comment}
				overall_comment={h.overall_comment}
				housing_username={h.housing_username}
				housing_id={h.housing_id}
			/>
		));
		return (
			<div>
				{houseList}
			</div>
		)
	}
}

function mapStateToProps(state) {
    return {
        houses: state.houses,
        currentUser: state.currentUser,
    };
}

export default connect(mapStateToProps, {fetchHouses})(HouseList);