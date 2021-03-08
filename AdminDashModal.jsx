import React from "react";
import {
  Button,
  Grid,
  DialogContent,
  Avatar,
  InputLabel,
} from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import debug from "sabio-debug";
import adminDashService from "../../services/adminDash/adminDashService";
const _logger = debug.extend("Modal");

const AdminDashModal = (props) => {
  function handleClose() {
    props.closeWindow();
  }
  const changeStatus = () => {
    _logger(props);
    let payload = {
      ...props,
    };
    if (payload.user.userStatusId === 1) {
      payload.user.userStatusId = 2;
    } else if (payload.user.userStatusId === 2) {
      payload.user.userStatusId = 1;
    }
    _logger(payload);

    adminDashService
      .changeUserStatusId(payload)
      .then(onChangeSuccess)
      .catch(onChangeFailure);
  };
  function onChangeSuccess() {
    props.refreshPage();
    props.closeWindow();
  }
  function onChangeFailure() {
    props.fireFailure();
  }
  return (
    <React.Fragment>
      <Dialog
        open={props.isViewOpen}
        onClose={handleClose}
        style={({ alignContent: "center" }, { overscrollBehavior: "none" })}
      >
        <DialogTitle
          id="alert-dialog-title"
          className=" card-box mb-4 bg-royal text-white border-0"
        >
          <div
            className=" text-white card-header--title py-0 font-size-lg "
            style={{ textAlignLast: "center" }}
          >
            {" "}
            User Details
          </div>
        </DialogTitle>
        <DialogContent style={{ overflow: "auto" }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6} lg={4}></Grid>
            <Avatar alt="..." src={props.user.avatarUrl} className="mr-2" />
            <div className="d-flex align-items-center px-4 mb-3">
              <div className="my-2 font-size-lg p-2 mx-4 bg-secondary rounded-sm">
                <InputLabel htmlFor="FullName">Name</InputLabel>
                <div
                  className="d-flex p-2"
                  style={{ borderBottomStyle: "groove" }}
                >
                  <FontAwesomeIcon
                    icon={["fas", "user"]}
                    style={{ marginRight: "20px" }}
                    title="User Name"
                  />
                  <span className="text-black">{`${props.user.firstName} ${props.user.lastName}`}</span>
                </div>
                <InputLabel htmlFor="Email">Email</InputLabel>
                <div
                  className="d-flex p-2"
                  style={{ borderBottomStyle: "groove" }}
                >
                  <FontAwesomeIcon
                    icon={["fas", "envelope"]}
                    style={{ marginRight: "20px" }}
                    title="UserEmail"
                  />
                  <span className="text-black">{`${props.user.email}`}</span>
                </div>
                <InputLabel htmlFor="UserId">UserId</InputLabel>
                <div
                  className="d-flex  p-2"
                  style={{ borderBottomStyle: "groove" }}
                >
                  <FontAwesomeIcon
                    icon={["fa", "barcode"]}
                    style={{ marginRight: "20px" }}
                    title="Service"
                  />
                  <span className="text-black">{`${props.user.id}`}</span>
                </div>
                <InputLabel htmlFor="UserStatus">UserStatus</InputLabel>
                <div
                  className="d-flex  p-2"
                  style={{ borderBottomStyle: "groove" }}
                >
                  <FontAwesomeIcon
                    icon={["fas", "chart-line"]}
                    style={{ marginRight: "20px" }}
                    title="UserStatus"
                  />
                  <span className="text-black">
                    {`${props.user.userStatus}`}
                  </span>
                </div>
                <InputLabel htmlFor="userRole">UserRole</InputLabel>
                <div
                  className="d-flex p-2"
                  style={{ borderBottomStyle: "groove" }}
                >
                  <FontAwesomeIcon
                    icon={["fas", "user-md"]}
                    style={{ marginRight: "20px" }}
                    title="UserRoles"
                  />
                  <span className="text-black text-uppercase">{`${props.user.roles}`}</span>
                </div>
              </div>
            </div>
          </Grid>
          <DialogActions>
            <Button
              onClick={handleClose}
              color="primary"
              variant="outlined"
              autoFocus
            >
              Close
            </Button>
            <Button
              onClick={changeStatus}
              color="primary"
              variant="contained"
              autoFocus
            >
              Change User Status
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

AdminDashModal.propTypes = {
  user: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    userStatus: PropTypes.string.isRequired,
    userStatusId: PropTypes.number.isRequired,
    email: PropTypes.email,
    avatarUrl: PropTypes.string,
    roles: PropTypes.string.isRequired,
  }),
  closeWindow: PropTypes.func.isRequired,
  refreshPage: PropTypes.func.isRequired,
  fireFailure: PropTypes.func,
  isViewOpen: PropTypes.bool.isRequired,
};
export default AdminDashModal;
