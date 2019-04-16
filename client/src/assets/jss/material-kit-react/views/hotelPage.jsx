import {
  primaryColor,
} from "assets/jss/material-kit-react.jsx";

const hotelPage = {
  container: {
    boxSizing: "border-box",
    display: "flex",
    flexWarp: "wrap",
    padding: "1.5rem 1.5rem 0 0",
  },

  filterContainer: {
    padding: "1.5rem",
    width: "calc(25% - 1.5rem)"
  },

  cardContainer: {
    padding: "1.5rem",
    width: "calc(75% - 1.5rem)",
    minWidth: "580px"
  },

  footer: {
    fontSize: "24px",
    fontWeight: "400",
    color: "black",
    textAlign: "right",
    zIndex: "2",
    padding: "2rem",
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
      color: "rgba(0, 0, 0, 0.7)",
      fontSize: "18px",
      lineHeight: "1.428571429",
      fontWeight: "400",
      display: "inline-flex",
      transition: "0.3s ease all"
  },

};

export default hotelPage;