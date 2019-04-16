import { container } from "assets/jss/material-kit-react.jsx";

const signupPageStyle = {
  container: {
    ...container,
    zIndex: "300",
    position: "relative",
    paddingTop: "2vh",
    color: "#FFFFFF"
  },
  cardBody: {
    padding: "0.4rem 1.875rem"
  },

  pageHeader: {
    zIndex: "200",
    minHeight: "100vh",
    height: "auto",
    width: "100%",
    display: "inherit",
    position: "fixed",
    top: "0",
    alignItems: "center",
    "&:before": {
      background: "rgba(0, 0, 0, 0.5)"
    },
    "&:before,&:after": {
      position: "absolute",
      zIndex: "1",
      width: "100%",
      height: "100%",
      display: "block",
      left: "0",
      top: "0",
      content: '""'
    },
    "& footer li a,& footer li a:hover,& footer li a:active": {
      color: "#FFFFFF"
    },
    "& footer": {
      position: "absolute",
      bottom: "0",
      width: "100%"
    }
  },
  form: {
    margin: "0"
  },
  cardHeader: {
    width: "auto",
    textAlign: "center",
    marginLeft: "20px",
    marginRight: "20px",
    // marginTop: "-40px",
    // padding: "20px 0",
    // marginBottom: "15px"
  },
  socialIcons: {
    maxWidth: "24px",
    marginTop: "0",
    width: "100%",
    transform: "none",
    left: "0",
    top: "0",
    height: "100%",
    lineHeight: "41px",
    fontSize: "20px"
  },
  divider: {
    marginTop: "30px",
    marginBottom: "0px",
    textAlign: "center"
  },
  cardFooter: {
    paddingTop: "0rem",
    border: "0",
    borderRadius: "6px",
    justifyContent: "center !important"
  },
  socialLine: {
    marginTop: "1rem",
    textAlign: "center",
    padding: "0"
  },
  inputIconsColor: {
    color: "#495057"
  },
  title: {
    fontWeight: "450",
    textAlign: "center"
  },
  exitBtn: {
    position: "absolute",
    right: 0,
    fontSize: "25px",
  }
};

export default signupPageStyle;
