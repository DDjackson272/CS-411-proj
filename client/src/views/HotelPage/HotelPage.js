import React from "react";
import {connect} from "react-redux";
import classNames from "classnames";

import withStyles from "@material-ui/core/styles/withStyles";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Check from "@material-ui/icons/Check";

import hotelPage from "assets/jss/material-kit-react/views/hotelPage.jsx";

import NavAccount from "../NavBar/NavAccount.js";
import NavSignedIn from "../NavBar/NavSignedIn.js";
import SignCard from "../SignCard/SignCard.js";
import SearchSortMenu from "../Menu/SearchSortMenu.js";
import HouseCard from "../HouseCard/HouseCard.js";
import HouseList from "../../containers/HouseList.js";
import {logout, authUser} from "../../store/actions/auth";
import {removeError} from "../../store/actions/errors";
import { fetchHouses, postNewHouse } from "../../store/actions/houses";

class HotelPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			signUp: false,
			isSignedIn: false,
			signCard: false,
			hotelFilter: false,
			homeStayFilter: false,
			parkingFilter: false,
			cookingFilter: false,
			largebedFilter: false,
		};
	}

	componentDidMount() {
		if (this.props.currentUser.isAuthenticated) {
			this.setState({
				isSignedIn: true
			})
		}
	}

	handleNewHousing = () => {
		const newHouse = {
			address: "Detail Address",
			city: "City",
			housing_name: "House Name",
			img_url: "ImageURL",
			housing_type: "House Type",
			parking: false,
			cooking: false,
			large_bed: false,
			description: "Description",
			positive_comment: 0,
			neutral_comment: 0,
			negative_comment: 0,
			overall_comment: ""
		}
		this.props.postNewHouse(newHouse)
			.then(res => {
				if (!res) {
					this.props.fetchHouses();
				}
			})
	}

	onAccountBtnClick = (signUp) => {
		this.setState({
			signUp: signUp,
			signCard: true
		});
	}

	onSubmitBtnClick = (user) => {
		const authType = this.state.signUp ? "signup" : "signin";
		this.props.authUser(authType, user)
			.then(() => {
				this.setState({
					signCard: false,
					isSignedIn: true
				});
				console.log(this.props.currentUser);
			})
			.catch(() => {
				console.log("error");
				return
			});
	}

	onLogOutBtnClick = () => {
		this.setState({
			isSignedIn: false
		});
		this.props.logout();
		this.props.removeError();
	}

	cancelSubmit = () => {
		this.setState({
			signCard: false
		});
		this.props.removeError();
	}

	hotelTypeFilter = () => {
		this.setState(prevState => ({
			hotelFilter: !prevState.hotelFilter
		}));
	}

	homeStayTypeFilter = () => {
		this.setState(prevState => ({
			homeStayFilter: !prevState.homeStayFilter
		}));
	}

	parkingLabelFilter = () => {
		this.setState(prevState => ({
			parkingFilter: !prevState.parkingFilter
		}));
	}

	cookingLabelFilter = () => {
		this.setState(prevState => ({
			cookingFilter: !prevState.cookingFilter
		}));
	}

	largebedLabelFilter = () => {
		this.setState(prevState => ({
			largebedFilter: !prevState.largebedFilter
		}));
	}

	render() {
		const { classes, currentUser, errors } = this.props;
		let navBar = null;
		if(this.state.isSignedIn === false) {
			navBar = <NavAccount 
						onAccountBtnClick={this.onAccountBtnClick}
					/>;
		}
		else {
			navBar = <NavSignedIn 
						onLogOutBtnClick={this.onLogOutBtnClick}
						handleNewHousing={this.handleNewHousing}
					/>;
		}
		return (
			<div>
				{navBar}
				<SearchSortMenu isSignedIn={this.state.isSignedIn}/>
				<div className={classes.container}>
					<div className={classes.filterContainer}>
						<div>
							<div className={classNames(classes.checkboxAndRadio, classes.checkboxAndRadioHorizontal)}>
								<FormControlLabel
									control={
										<Checkbox
											tabIndex={-1}
											onClick={this.hotelTypeFilter}
											checked={this.state.hotelFilter}
											checkedIcon={<Check className={classes.checkedIcon}/>}
											icon={<Check className={classes.uncheckedIcon}/>}
											classes={{checked: classes.checked}}
										/>
									}
									classes={{label: classes.label}}
									label="HOTEL"
								/>
							</div>
							<div className={classNames(classes.checkboxAndRadio, classes.checkboxAndRadioHorizontal)}>
								<FormControlLabel
									control={
										<Checkbox
											tabIndex={-1}
											onClick={this.homeStayTypeFilter}
											checked={this.state.homeStayFilter}
											checkedIcon={<Check className={classes.checkedIcon}/>}
											icon={<Check className={classes.uncheckedIcon}/>}
											classes={{checked: classes.checked}}
										/>
									}
									classes={{label: classes.label}}
									label="HOME STAY"
								/>
							</div>
						</div>
						<div>
							<div className={classNames(classes.checkboxAndRadio, classes.checkboxAndRadioHorizontal)}>
								<FormControlLabel
									control={
										<Checkbox
											tabIndex={-1}
											onClick={this.parkingLabelFilter}
											checked={this.state.parkingFilter}
											checkedIcon={<Check className={classes.checkedIcon}/>}
											icon={<Check className={classes.uncheckedIcon}/>}
											classes={{checked: classes.checked}}
										/>
									}
									classes={{label: classes.label}}
									label="PARKING ALLOWED"
								/>
							</div>
							<div className={classNames(classes.checkboxAndRadio, classes.checkboxAndRadioHorizontal)}>
								<FormControlLabel
									control={
										<Checkbox
											tabIndex={-1}
											onClick={this.cookingLabelFilter}
											checked={this.state.cookingFilter}
											checkedIcon={<Check className={classes.checkedIcon}/>}
											icon={<Check className={classes.uncheckedIcon}/>}
											classes={{checked: classes.checked}}
										/>
									}
									classes={{label: classes.label}}
									label="COOKING ALLOWED"
								/>
							</div>
							<div className={classNames(classes.checkboxAndRadio, classes.checkboxAndRadioHorizontal)}>
								<FormControlLabel
									control={
										<Checkbox
											tabIndex={-1}
											onClick={this.largebedLabelFilter}
											checked={this.state.largebedFilter}
											checkedIcon={<Check className={classes.checkedIcon}/>}
											icon={<Check className={classes.uncheckedIcon}/>}
											classes={{checked: classes.checked}}
										/>
									}
									classes={{label: classes.label}}
									label="LARGE BED"
								/>
							</div>
						</div>
					</div>
					<div className={classes.cardContainer}>
						<HouseList hotelFilter={this.state.hotelFilter}
								homeStayFilter={this.state.homeStayFilter}
								parkingFilter={this.state.parkingFilter}
								cookingFilter={this.state.cookingFilter}
								largebedFilter={this.state.largebedFilter}
						/>
					</div>
				</div>
				<footer className={classes.footer}>
    				<div>
      					&copy; {1900 + new Date().getYear()} , made by teamdb
    				</div>
        		</footer>
				{this.state.signCard && 
					(<SignCard
					errors={errors}
					signUp={this.state.signUp} 
					onSubmitBtnClick={this.onSubmitBtnClick}
					cancelSubmit={this.cancelSubmit}
					/>) 
				}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		currentUser: state.currentUser,
		errors: state.errors
	};
}

export default withStyles(hotelPage)(connect(mapStateToProps, {authUser, removeError, logout, postNewHouse, fetchHouses})(HotelPage));