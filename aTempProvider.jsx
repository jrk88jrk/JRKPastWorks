import React, { Fragment } from "react";
import { Button, ListItem, Divider } from "@material-ui/core";
import "../../assets/styles/providerDashboard.css";
import PropTypes from "prop-types";
import debug from "sabio-debug";
const _logger = debug.extend("ATempProvider");

const ATempProvider = (props) => {
  const verifyProvider = () => {
    _logger(props.aUser);
    props.verifyNPI({ providerToEdit: props.aUser });
  };

  return (
    <Fragment>
      <ListItem className=" justify-content-between  py-3">
        <div className="d-flex align-items-center w-25">
          <div className="text-black">
            {`${props.aUser.firstName} ${props.aUser.lastName}`}
          </div>
        </div>
        <div
          className="padding-for-mobile-text pr-5 mr-5"
          style={({ minWidth: "150px" }, { textAlign: "match-parent" })}
        >
          {" "}
          <span
            className={
              props.aUser.userStatusId === "3"
                ? "badge badge-success"
                : "badge badge-warning"
            }
            style={{ textAlign: "match-parent" }}
          >
            {props.aUser.userStatusId ? "Pending" : "Error"}
          </span>
        </div>
        <div
          className="remove-for-mobile"
          style={{ textAlign: "match-parent" }}
        >
          {" "}
          <span
            className={
              props.aUser.roles === "null"
                ? "badge badge-primary"
                : "badge badge-primary"
            }
          >
            {props.aUser.userStatusId ? "Provider" : "Error"}
          </span>
          <div></div>
        </div>

        <Button
          size="small"
          variant="contained"
          color="secondary"
          className=" btn btn-primary"
          value={props.aUser}
          onClick={verifyProvider}
        >
          Run NPI Number
        </Button>
      </ListItem>
      <Divider variant={"fullWidth"} />
    </Fragment>
  );
};

ATempProvider.propTypes = {
  aUser: PropTypes.shape({
    id: PropTypes.number.isRequired,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    mi: PropTypes.string,
    avatarUrl: PropTypes.string,
    email: PropTypes.string,
    userStatusId: PropTypes.number.isRequired,
    roles: PropTypes.arrayOf(PropTypes.string),
    userStatus: PropTypes.string.isRequired,
  }),
  verifyNPI: PropTypes.func,
};
export default ATempProvider;
