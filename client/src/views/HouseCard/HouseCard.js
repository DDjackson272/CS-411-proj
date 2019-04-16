import React from "react";
import ReactCardFlip from "react-card-flip";
import classNames from "classnames";
import {connect} from "react-redux";

import withStyles from "@material-ui/core/styles/withStyles";
import Checkbox from "@material-ui/core/Checkbox";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Check from "@material-ui/icons/Check";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
import Backup from "@material-ui/icons/RotateLeftRounded";

import CustomLinearProgress from "components/CustomLinearProgress/CustomLinearProgress.jsx";
import Clearfix from "components/Clearfix/Clearfix.jsx";
import Badge from 'components/Badge/Badge.jsx';
import CustomInput from "components/CustomInput/CustomInput.jsx";
import houseCardStyle from "assets/jss/material-kit-react/components/houseCardStyle.jsx";
import { removeHouses, putHouses, changeHistory } from "../../store/actions/houses";
import LocationOn from "@material-ui/icons/LocationOn";
import Star from "@material-ui/icons/StarRounded";

class HouseCard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isFlipped: false,
			visited: false,
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
		};
		this.handleClick = this.handleClick.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.onHouseTypeChange = this.onHouseTypeChange.bind(this);
		this.onParkingToggle = this.onParkingToggle.bind(this);
		this.onCookingToggle = this.onCookingToggle.bind(this);
		this.onLargebedToggle = this.onLargebedToggle.bind(this);
	}

	componentDidMount() {
		console.log("------------house card did mount");
		this.setState({
			visited: this.props.visited,
			address: this.props.address,
			city: this.props.city,
			housing_name: this.props.housing_name,
			img_url: this.props.img_url,
			housing_type: this.props.housing_type,
			parking: this.props.parking,
			cooking: this.props.cooking,
			large_bed: this.props.large_bed,
			description: this.props.description,
			positive_comment: this.props.positive_comment,
			neutral_comment: this.props.neutral_comment,
			negative_comment: this.props.negative_comment,
			overall_comment: this.props.overall_comment
		});
	}

	componentWillReceiveProps(nextProp) {
		console.log("------componentWillReceiveProps my props");
		console.log(nextProp);
		this.setState({
			visited: nextProp.visited,
			address: nextProp.address,
			city: nextProp.city,
			housing_name: nextProp.housing_name,
			img_url: nextProp.img_url,
			housing_type: nextProp.housing_type,
			parking: nextProp.parking,
			cooking: nextProp.cooking,
			large_bed: nextProp.large_bed,
			description: nextProp.description,
			positive_comment: nextProp.positive_comment,
			neutral_comment: nextProp.neutral_comment,
			negative_comment: nextProp.negative_comment,
			overall_comment: nextProp.overall_comment
		});
	}

	handleClick(e) {
		e.preventDefault();
		this.setState(prevState => ({
			isFlipped: !prevState.isFlipped
		}))
	}

	handleChange(event) {
		this.setState({
			[event.target.id]: event.target.value
		});
	}

	onHouseTypeChange(event) {
		this.setState({
			housing_type: event.target.value
		});
	}

	onParkingToggle() {
		this.setState(prevState => ({
			parking: 1 - prevState.parking
		}))
	}

	onCookingToggle() {
		this.setState(prevState => ({
			cooking: 1 - prevState.cooking
		}))
	}

	onLargebedToggle() {
		this.setState(prevState => ({
			large_bed: 1 - prevState.large_bed
		}))
	}

	handleUpdateHouse = () => {
		this.setState(prevState => ({
			isFlipped: !prevState.isFlipped
		}));
		this.props.putHouses(this.props.currentUser.user.username, 
			this.props.housing_id, this.state);
	}

	onLikeBtnClick = () => {
		this.setState({
			visited: true
		});
		console.log("likeit");
		this.props.changeHistory(this.props.currentUser.user.username, this.props.housing_id);
	}

	render() {
		const { classes, removeHouses } = this.props;
		let starLevel = null;
		switch (this.state.overall_comment) {
			case "Excellent" :
				starLevel = <div><Star/><Star/><Star/><Star/><Star/></div>;
				break;
			case "Great":
				starLevel = <div><Star/><Star/><Star/><Star/></div>;
				break;
			case "Good":
				starLevel = <div><Star/><Star/><Star/></div>;
				break;
			case "Average":
				starLevel = <div><Star/><Star/></div>;
				break;
			case "Terrible":
				starLevel = <div><Star/></div>;
				break;
			default:
				starLevel = <div><Star/><Star/></div>;
				break;
		}
		return (
			<div className={classes.houseCard}>
				<ReactCardFlip isFlipped={this.state.isFlipped}>
					<div className={classes.card} key="front">
						<div className={classes.imgContainer}>
							<img src={this.state.img_url} alt="img" className={classes.img}/>
						</div>
						<div className={classes.content}>
							<h2>{this.state.housing_name}</h2>
							<h3>{this.state.housing_type}</h3>
							<div>
								{(this.state.parking === 1 ? true : false) && (<Badge color="success">parking accessible</Badge>)}
								{(this.state.cooking === 1 ? true : false) && (<Badge color="warning">cooking allowed</Badge>)}
								{(this.state.large_bed === 1 ? true : false) && (<Badge color="rose">large bed</Badge>)}
							</div>
							<h4>
								<LocationOn />
								{this.state.address}, {this.state.city}
							</h4>
							<p>{this.state.description}</p>
						</div>
						<div className={classes.comment}>
							<div className={classes.star}>
								{starLevel}
							</div>
							<div>
								Positive 
								<CustomLinearProgress
									variant="determinate"
									color="success"
									value={this.state.positive_comment * 10}
								/>
								Neutral 
								<CustomLinearProgress
									variant="determinate"
									color="info"
									value={this.state.neutral_comment * 10}
								/>
								Negative 
								<CustomLinearProgress
									variant="determinate"
									color="warning"
									value={this.state.negative_comment * 10}
								/>
							</div>
							{this.props.currentUser.user.username !== undefined && 
								(<div className={classes.btnContainer}>
									{this.state.visited ? 
										(<button className={classNames(classes.cardBtn, classes.warning, classes.disable)}
											>
										LIKE
										</button>):
										(<button className={classNames(classes.cardBtn, classes.warning)}
											onClick={this.onLikeBtnClick}
											disabled={this.state.visited}
										>
										LIKE
										</button>)
									}
								</div>)
							}
							{this.props.currentUser.user.username === this.props.housing_username &&
								(<div className={classes.btnContainer}>
									<button className={classNames(classes.cardBtn, classes.info)} onClick={this.handleClick}>
										edit
									</button>
									<button className={classNames(classes.cardBtn, classes.danger)}
											onClick={removeHouses.bind(this, this.props.housing_username, this.props.housing_id)}
									>
										delete
									</button>
								</div>)
							}	
						</div>
						<Clearfix />
					</div>

					<div className={classes.backCard} key="back">
						<div className={classes.halfGrid}>
							<CustomInput 
								id="housing_name"
								labelText="Name"
								formControlProps={{
									fullWidth: true
								}}
								inputProps={{
									type: "text",
									onChange: this.handleChange
								}}
							/>
						</div>
						<div className={classes.halfGrid}>
							<div>
								
								<button className={classNames(classes.cardBtn, classes.info, classes.backBtn)} onClick={this.handleUpdateHouse}>
									<Backup />
								</button>
							</div>
						</div>
						<div className={classes.halfGrid}>
							<div className={classNames(classes.checkboxAndRadio, classes.checkboxAndRadioHorizontal)}>
								<FormControlLabel
									control={
										<Radio
											checked={this.state.housing_type === "hotel"}
											onChange={this.onHouseTypeChange}
											value="hotel"
											name="radio button hotel"
											aria-label="A"
											icon={
												<FiberManualRecord className={classes.radioUnchecked}/>
											}
											checkedIcon={
												<FiberManualRecord className={classes.radioChecked}/>
											}
											classes={{
												checked: classes.radio
											}}
										/>
									}
									classes={{
										label: classes.label
									}}
									label="Hotel"
								/>
							</div>
							<div className={classNames(classes.checkboxAndRadio, classes.checkboxAndRadioHorizontal)}>
								<FormControlLabel
									control={
										<Radio
											checked={this.state.housing_type === "home stay"}
											onChange={this.onHouseTypeChange}
											value="home stay"
											name="radio button homestay"
											aria-label="B"
											icon={
												<FiberManualRecord className={classes.radioUnchecked}/>
											}
											checkedIcon={
												<FiberManualRecord className={classes.radioChecked}/>
											}
											classes={{
												checked: classes.radio
											}}
										/>
									}
									classes={{
										label: classes.label
									}}
									label="Home Stay"
								/>
							</div>
							<div>
								<CustomInput 
									id="city"
									labelText="City"
									formControlProps={{
										fullWidth: false
									}}
									inputProps={{
										type: "text",
										onChange: this.handleChange
									}}
								/>
								<CustomInput 
									id="address"
									labelText="Address"
									formControlProps={{
										fullWidth: false
									}}
									inputProps={{
										type: "text",
										onChange: this.handleChange
									}}
								/>
							</div>
						</div>
						<div className={classes.halfGrid}>
							<div className={classNames(classes.checkboxAndRadio, classes.checkboxAndRadioHorizontal)}>
								<FormControlLabel
									control={
										<Checkbox
											tabIndex={-1}
											onClick={this.onParkingToggle}
											checked={this.state.parking === 1 ? true : false}
											checkedIcon={<Check className={classes.checkedIcon}/>}
											icon={<Check className={classes.uncheckedIcon}/>}
											classes={{checked: classes.checked}}
										/>
									}
									classes={{label: classes.label}}
									label="PARKING ACCESSIBLE"
								/>
							</div>
							<div className={classNames(classes.checkboxAndRadio, classes.checkboxAndRadioHorizontal)}>
								<FormControlLabel
									control={
										<Checkbox
											tabIndex={-1}
											onClick={this.onCookingToggle}
											checked={this.state.cooking === 1 ? true : false}
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
											onClick={this.onLargebedToggle}
											checked={this.state.large_bed === 1 ? true : false}
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
						
						<div className={classes.halfGrid}>
							<CustomInput 
								id="img_url"
								labelText="ImageURL"
								formControlProps={{
									fullWidth: true
								}}
								inputProps={{
									type: "text",
									onChange: this.handleChange
								}}
							/>
						</div>
						<div className={classes.halfGrid}>
							<CustomInput 
								id="description"
								labelText="Description"
								formControlProps={{
									fullWidth: true
								}}
								inputProps={{
									type: "text",
									onChange: this.handleChange
								}}
							/>
						</div>
					</div>
				</ReactCardFlip>
			</div>
		);
	}
}

function mapStateToProps(state) {
    return {
        houses: state.houses,
        currentUser: state.currentUser,
    };
}

export default withStyles(houseCardStyle)(connect(mapStateToProps, {removeHouses, putHouses, changeHistory})(HouseCard));