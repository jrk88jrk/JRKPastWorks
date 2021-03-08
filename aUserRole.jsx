import React, { Fragment } from "react";
import { Avatar, Button, ListItem, Divider } from "@material-ui/core";
import "../../assets/styles/providerDashboard.css";
import PropTypes from "prop-types";
import debug from "sabio-debug";
const _logger = debug.extend("AUserRole");

const AUserRole = (props) => {
  const editUserData = () => {
    _logger(props.aUser);
    props.viewModal({ userToEdit: props.aUser });
  };

  return (
    <Fragment>
      <ListItem
        className=" justify-content-between  py-3"
        // style={{ backgroundColor: "#cfe8fc" }}
        divider={true}
      >
        <div className="d-flex align-items-center w-25">
          <div className="text-black">
            <Avatar alt="..." src={props.aUser.avatarUrl} className="mr-2" />
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
              props.aUser.userStatus === "Active"
                ? "badge badge-success"
                : "badge badge-danger"
            }
          >
            {props.aUser.userStatus}
          </span>
        </div>
        <div
          className="remove-for-mobile"
          style={({ minWidth: "150px" }, { textAlign: "match-parent" })}
        >
          {" "}
          <span
            className={
              props.aUser.roles[0] === "Customer"
                ? "badge badge-success"
                : "badge badge-primary"
            }
          >
            {props.aUser.roles}
          </span>
        </div>

        <Button
          size="small"
          variant="contained"
          color="secondary"
          className=" btn btn-primary"
          onClick={editUserData}
        >
          View User Data
        </Button>
      </ListItem>
      <Divider variant={"fullWidth"} />
    </Fragment>
  );
};

AUserRole.propTypes = {
  aUser: PropTypes.shape({
    id: PropTypes.number.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    mi: PropTypes.string,
    avatarUrl: PropTypes.string,
    email: PropTypes.string.isRequired,
    userStatusId: PropTypes.number.isRequired,
    roles: PropTypes.arrayOf(PropTypes.string).isRequired,
    userStatus: PropTypes.string.isRequired,
  }),
  viewModal: PropTypes.func,
};
export default AUserRole;
