import React from "react";
import classNames from "classnames";

import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
import Email from "@material-ui/icons/Email";
import People from "@material-ui/icons/People";
import Image from "@material-ui/icons/Image";
import Warning from "@material-ui/icons/Warning";

import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import SnackbarContent from "components/Snackbar/SnackbarContent.jsx";

import loginPageStyle from "assets/jss/material-kit-react/views/loginPage.jsx";

class SignCard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			username: "",
			email: "",
			password: "",
			img: ""
		};
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange = (event) => {
		this.setState({
			[event.target.id]: event.target.value
		})
	}

	render() {
		const { classes, errors, signUp, onSubmitBtnClick, cancelSubmit } = this.props;
		return (
			<div>
				<div className={classes.pageHeader}>
					<div className={classes.container}>
						<GridContainer justify="center">
							<GridItem xs={12} sm={12} md={6}>
								<Card>
									<form className={classes.form}>
										<CardHeader color="info" className={classes.cardHeader}>
											<Button color="white" simple size="lg" className={classes.exitBtn}
												onClick={() => {cancelSubmit()}}
											>
												&times;
											</Button>
											{signUp ? 
												(<h3 className={classes.title}>Sign Up</h3>):
												(<h3 className={classes.title}>Sign In</h3>)
											}
											<div className={classes.socialLine}>
												<Button
						                          justIcon
						                          href="#pablo"
						                          target="_blank"
						                          color="transparent"
						                          onClick={e => e.preventDefault()}
						                        >
						                          <i className={"fab fa-twitter"} />
						                        </Button>
						                        <Button
						                          justIcon
						                          href="#pablo"
						                          target="_blank"
						                          color="transparent"
						                          onClick={e => e.preventDefault()}
						                        >
						                          <i className={"fab fa-facebook"} />
						                        </Button>
						                        <Button
						                          justIcon
						                          href="#pablo"
						                          target="_blank"
						                          color="transparent"
						                          onClick={e => e.preventDefault()}
						                        >
						                          <i className={"fab fa-google-plus-g"} />
						                        </Button>
						                      </div>
										</CardHeader>
										<CardBody className={classes.cardBody}>
										{errors.message && (
											<SnackbarContent
										        message={
										          	<span>
										              <b>{errors.message}</b> 
										            </span>
										        }
										        close
										        color="warning"
										        icon={Warning}
									        />
										)}
										{signUp &&
											(<CustomInput 
												labelText="User Name"
												id="username"
												formControlProps={{
													fullWidth: true
												}}
												inputProps={{
													type: "text",
													endAdornment: (
														<InputAdornment position="end">
															<People className={classes.inputIconsColor} />
														</InputAdornment>
													),
													onChange: this.handleChange
												}}
											/>)
										}
											<CustomInput 
												labelText="Email"
												id="email"
												formControlProps={{
													fullWidth: true
												}}
												inputProps={{
													type: "email",
													endAdornment: (
														<InputAdornment position="end">
															<Email className={classes.inputIconsColor} />
														</InputAdornment>
													),
													onChange: this.handleChange
													
												}}
												
											/>
											<CustomInput 
												labelText="Password"
												id="password"
												formControlProps={{
													fullWidth: true
												}}
												inputProps={{
													type: "password",
													endAdornment: (
														<InputAdornment position="end">
															<Icon className={classes.inputIconsColor} >
																lock_outline
															</Icon>
														</InputAdornment>
													),
													onChange: this.handleChange
												}}
											/>
										{signUp &&
											(<CustomInput 
												labelText="Profile ImageURL"
												id="img"
												formControlProps={{
													fullWidth: true
												}}
												inputProps={{
													type: "text",
													endAdornment: (
														<InputAdornment position="end">
															<Image className={classes.inputIconsColor} />
														</InputAdornment>
													),
													onChange: this.handleChange
												}}
											/>)
										}
										</CardBody>
										<CardFooter className={classes.cardFooter}>
										{signUp ?
											(<Button round color="info"
												onClick={() => {onSubmitBtnClick(this.state)}}
											>
												Create
											</Button>):
											(<Button round color="info"
												onClick={() => {onSubmitBtnClick(this.state)}}
											>
												Sign In
											</Button>)
										}
										</CardFooter>
									</form>
								</Card>
							</GridItem>
						</GridContainer>
					</div>
				</div>
			</div>
		);
	}
}

export default withStyles(loginPageStyle)(SignCard);