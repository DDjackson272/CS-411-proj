import React from "react";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";

import Header from "components/Header/Header.jsx";
import CustomDropdown from "components/CustomDropdown/CustomDropdown.jsx";
import Button from "components/CustomButtons/Button.jsx";

import navbarsStyle from "assets/jss/material-kit-react/views/componentsSections/navbarsStyle.jsx";

class NavAccount extends React.Component {
	render() {
		const { classes, onAccountBtnClick } = this.props;
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
								<Button className={classes.navLink} color="transparent">
									Hotels
								</Button>
							</Link>
						</ListItem>
						
						<ListItem className={classes.listItem}>
							<CustomDropdown
								dropup
								hoverColor="black"
								buttonText="Account"
								buttonProps={{
									className: classes.navLink,
									color: "transparent"
								}}
								dropdownList={[
									"Sign In",
									"Create New Account"
								]}
								onClick={(event)=> {
									if(event === "Sign In") {
										onAccountBtnClick(false);
									}
									else if(event === "Create New Account") {
										onAccountBtnClick(true);
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

export default withStyles(navbarsStyle)(NavAccount);