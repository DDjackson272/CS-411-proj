import React from "react";
import {connect} from "react-redux";
import BackgroundSlider from 'react-background-slider';

import withStyles from "@material-ui/core/styles/withStyles";

import image1 from "assets/img/slide1.jpg";
import image2 from "assets/img/slide2.jpeg";
import image3 from "assets/img/slide3.jpg";
import image4 from "assets/img/slide4.jpeg";
import mainPage from "assets/jss/material-kit-react/views/mainPage.jsx";

import WelcomeWord from "./Sections/WelcomeWord.js";
import NavAccount from "../NavBar/NavAccount.js";
import NavSignedIn from "../NavBar/NavSignedIn.js";
import SignCard from "../SignCard/SignCard.js";
import {authUser, logout} from "../../store/actions/auth";
import {removeError} from "../../store/actions/errors";

class MainPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			signUp: false,
			isSignedIn: false,
			signCard: false,
		};
	}

	componentDidMount() {
		if (this.props.currentUser.isAuthenticated) {
			this.setState({
				isSignedIn: true
			})
		}
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
				console.log(authType);
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
	}

	cancelSubmit = () => {
		this.setState({
			signCard: false
		});
		this.props.removeError();
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
					/>;
		}
		return (
			<div>
				{navBar}
				<WelcomeWord />
				{this.state.signCard && 
					(<SignCard
						errors={errors}
						signUp={this.state.signUp} 
						signAnimation={this.state.signAnimation} 
						onSubmitBtnClick={this.onSubmitBtnClick}
						cancelSubmit={this.cancelSubmit}
					/>)
				}
				<footer className={classes.footer}>
        			<div className={classes.right}>
          				&copy; {1900 + new Date().getYear()} , made by teamdb
        			</div>
        		</footer>
				<BackgroundSlider
          			images={[image1, image2, image3, image4]}
          			duration={5}
          			transition={2}
        		/>
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

export default withStyles(mainPage)(connect(mapStateToProps, {authUser, logout, removeError})(MainPage));