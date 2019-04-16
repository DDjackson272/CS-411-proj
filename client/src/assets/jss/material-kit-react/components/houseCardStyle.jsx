import {
  grayColor,
  roseColor,
  primaryColor,
  infoColor,
  successColor,
  warningColor,
  dangerColor
} from "assets/jss/material-kit-react.jsx";

const houseCardStyle = {
	houseCard: {
		paddingTop: "2rem"
	},

	card: {
		backgroundColor: "#fff",
  		boxShadow: "0 10px 35px rgba(50,50,93,.1),0 2px 15px rgba(0,0,0,.07)",
  		width: "100%",
  		//height: "300px",
  		borderRadius: "10px",
  		display: "flex",
  		//flexWrap: "wrap"
	},

	backCard: {
		backgroundColor: "#fff",
  		boxShadow: "0 10px 35px rgba(50,50,93,.1),0 2px 15px rgba(0,0,0,.07)",
  		width: "100%",
  		//height: "300px",
  		borderRadius: "10px",
  		display: "flex",
  		flexWrap: "wrap"
	},

	imgContainer: {
		paddingRight: "1em",
		width: "calc(33%)",
	},

	content: {
		padding: "0 1em 0 1em",
		width: "calc(45%)"
	},

	comment: {
		paddingRight: "1.5em",
		width: "calc(22%)",
	},

	star: {
		marginTop: "1.5rem",
		textAlign: "center"
	},

	img: {
		width: "100%",
		height: "100%",
		borderRadius: "10px",
		objectFit: "cover"
	},

	btnContainer: {
		display: "flex",
		flexWrap: "wrap",
		justifyContent: "center",
	},

	halfGrid: {
		padding: "0 1.5rem 0 1.5rem",
		width: "calc(50%)"
	},

	checkboxAndRadio: {
	    position: "relative",
	    display: "block",
	    marginTop: "10px",
	    marginBottom: "10px"
  	},
  	checkboxAndRadioHorizontal: {
	    position: "relative",
	    display: "block",
	    "&:first-child": {
	      marginTop: "10px"
	    },
	    "&:not(:first-child)": {
	      marginTop: "-14px"
	    },
	    marginTop: "0",
	    marginBottom: "0"
  	},
	checked: {
	    color: primaryColor + "!important"
	},
	checkedIcon: {
	    width: "20px",
	    height: "20px",
	    border: "1px solid rgba(0, 0, 0, .54)",
	    borderRadius: "3px"
	},
	uncheckedIcon: {
	    width: "0px",
	    height: "0px",
	    padding: "9px",
	    border: "1px solid rgba(0, 0, 0, .54)",
	    borderRadius: "3px"
	},
	disabledCheckboxAndRadio: {
	    opacity: "0.45"
	},
	label: {
	    cursor: "pointer",
	    paddingLeft: "0",
	    color: "rgba(0, 0, 0, 0.6)",
	    fontSize: "14px",
	    lineHeight: "1.428571429",
	    fontWeight: "400",
	    display: "inline-flex",
	    transition: "0.3s ease all"
	},
	radio: {
    	color: primaryColor + "!important"
  	},
  	radioChecked: {
    	width: "16px",
    	height: "16px",
    	border: "1px solid " + primaryColor,
    	borderRadius: "50%"
  	},
	radioUnchecked: {
	    width: "0px",
	    height: "0px",
	    padding: "7px",
	    border: "1px solid rgba(0, 0, 0, .54)",
	    borderRadius: "50%"
	},

	cardBtn: {
		minHeight: "auto",
    	minWidth: "auto",
    	padding: "12px 30px",
    	margin: ".3125rem 1px",
    	borderRadius: "30px",
    	cursor: "pointer",
    	color: "#FFFFFF",
    	fontSize: "12px",
    	fontWeight: "600",
  		transition: "background-color .25s ease-in, box-shadow .25s ease-in",
	},

	backBtn: {
		padding: "3px 5px",
		margin: "1.5rem 0.5rem",
		float: "right"
	},

	info: {
	    backgroundColor: infoColor,
	    boxShadow:
	      "0 2px 2px 0 rgba(0, 188, 212, 0.14), 0 3px 1px -2px rgba(0, 188, 212, 0.2), 0 1px 5px 0 rgba(0, 188, 212, 0.12)",
	    "&:hover,&:focus": {
	      backgroundColor: infoColor,
	      boxShadow:
	        "0 14px 26px -12px rgba(0, 188, 212, 0.42), 0 4px 23px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 188, 212, 0.2)"
	    }
  	},
  	danger: {
	    backgroundColor: dangerColor,
	    boxShadow:
	      "0 2px 2px 0 rgba(244, 67, 54, 0.14), 0 3px 1px -2px rgba(244, 67, 54, 0.2), 0 1px 5px 0 rgba(244, 67, 54, 0.12)",
	    "&:hover,&:focus": {
	      backgroundColor: dangerColor,
	      boxShadow:
	        "0 14px 26px -12px rgba(244, 67, 54, 0.42), 0 4px 23px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(244, 67, 54, 0.2)"
	    }
  	},
  	warning: {
	    backgroundColor: warningColor,
	    boxShadow:
	      "0 2px 2px 0 rgba(255, 152, 0, 0.14), 0 3px 1px -2px rgba(255, 152, 0, 0.2), 0 1px 5px 0 rgba(255, 152, 0, 0.12)",
	    "&:hover,&:focus": {
	      backgroundColor: warningColor,
	      boxShadow:
	        "0 14px 26px -12px rgba(255, 152, 0, 0.42), 0 4px 23px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(255, 152, 0, 0.2)"
	    }
	},
	disable: {
		opacity: "0.45",
    	pointerEvents: "none"   
	}
}

export default houseCardStyle;