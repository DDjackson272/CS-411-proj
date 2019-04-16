import React from "react";
import {connect} from "react-redux";

import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Icon from "@material-ui/core/Icon";

import Search from "@material-ui/icons/Search";

import Header from "components/Header/Header.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import { fetchSearchHouses, fetchRecommendHouses } from "../../store/actions/houses";

import navbarsStyle from "assets/jss/material-kit-react/views/componentsSections/navbarsStyle.jsx";

class SearchSortMenu extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			searchValue: ""
		}
	} 

	handleSearchChange = (event) => {
		this.setState({
			searchValue: event.target.value
		});
		//this.props.fetchSearchHouses(event.target.value);
	}

	handleSearchClick = () => {
		this.props.fetchSearchHouses(this.state.searchValue);
	}

	handleRecommendClick = () => {
		this.props.fetchRecommendHouses(this.props.currentUser.user.username);
	}

	render() {
		const { classes, isSignedIn } = this.props;
		return (
			<Header
				brand=""
				color="info"
				leftLinks={
					<div>
						<CustomInput
							white
							inputRootCustomClasses={classes.inputRootCustomClasses}
							formControlProps={{
								className: classes.formControl
							}}
							inputProps={{
								placeholder: "Search By Name",
								inputProps: {
									"aria-label": "Search",
									className: classes.searchInput,
									onChange: this.handleSearchChange
								},
								endAdornment: (	<Button justIcon round color="white"
													onClick={this.handleSearchClick}
												>
													<Search className={classes.searchIcon} />
												</Button>)
							}}
						/>
					</div>
				}
				rightLinks={
					<List className={classes.list}>
						
						<ListItem className={classes.listItem}>
							{isSignedIn && 
								(<Button 
									href="#Recommendation"
									className={classes.navLink}
									onClick={this.handleRecommendClick}
									color="transparent"
								>
									Recommendation
								</Button>)
							}
						</ListItem>
						
					</List>
				}
			/>
		);
	}
}

function mapStateToProps(state) {
    return {
        houses: state.houses,
        currentUser: state.currentUser,
    };
}

export default withStyles(navbarsStyle)(connect(mapStateToProps, {fetchSearchHouses, fetchRecommendHouses})(SearchSortMenu));