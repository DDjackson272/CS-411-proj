import React from "react";
import {connect} from "react-redux";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";

import Header from "components/Header/Header.jsx";
import CustomDropdown from "components/CustomDropdown/CustomDropdown.jsx";
import Button from "components/CustomButtons/Button.jsx";
import { fetchHouses } from "../../store/actions/houses";

import navbarsStyle from "assets/jss/material-kit-react/views/componentsSections/navbarsStyle.jsx";

class NavSignedIn extends React.Component {

	render() {
		const { classes, onLogOutBtnClick, handleNewHousing, fetchHouses } = this.props;
		return (
			<Header 
				brand="Travel In Chambana"
				color="info"
				rightLinks={
					<List className={classes.list}>
						<ListItem className={classes.listItem}>
							<Link to={"/"} className={classes.link}>
								<Button className={classes.navLink} color="transparent">
									Home
								</Button>
							</Link>
						</ListItem>
						<ListItem className={classes.listItem}>
							<Link to={"/hotel"} className={classes.link}>
								<Button className={classes.navLink} color="transparent"
								onClick={fetchHouses}>
									Hotels
								</Button>
							</Link>
						</ListItem>
						
						<ListItem className={classes.listItem}>
							<CustomDropdown
								dropup
								hoverColor="black"
								buttonText={
									this.props.currentUser.user.username
								}
								buttonProps={{
									className: classes.navLink,
									color: "transparent"
								}}
								dropdownList={[
									"Profile",
									"New Housing",
									"New Activities",
									"Log Out"
								]}
								onClick={(event)=> {
									if(event === "Log Out") {
										onLogOutBtnClick();
									}
									else if(event === "New Housing") {
										handleNewHousing();
									}
								}}
							/>
						</ListItem>
					</List>
				}
			/>
		);
	}
}

function mapStateToProps(state) {
	return {
		currentUser: state.currentUser
	}
}

export default withStyles(navbarsStyle)(connect(mapStateToProps, {fetchHouses})(NavSignedIn));