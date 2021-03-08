import React, { Fragment, Component } from "react";
import { WrapperSimple } from "../../layouts";
import MuiAlert from "@material-ui/lab/Alert";
import {
  FormControl,
  InputLabel,
  Button,
  FormHelperText,
  Select,
  MenuItem,
  Snackbar,
  TextField,
} from "@material-ui/core";
import { Formik, Form } from "formik";
import logger from "sabio-debug";
import adminDashService from "services/adminDash/adminDashService";
import UserEditConsole from "./UserEditConsole";
import PropTypes from "prop-types";

const _logger = logger.extend("AdminDashDropDown");

class AdminDashDropDown extends Component {
  state = {
    roleFormData: {
      pageIndex: 0,
      pageSize: 10,
      role: null,
    },
  };

  componentDidMount() {
    adminDashService
      .getAllRoles()
      .then(this.onGetSuccess)
      .catch(this.onGetError);
  }

  onGetSuccess = (response) => {
    _logger({ response: response.items });
    let role = response.items;

    this.setState(() => ({
      mappedRoleCategory: role.map(this.mapRolePanel),
    }));
  };

  mapRolePanel = (singleRole, index) => {
    _logger("mapRole", singleRole, index);
    return (
      <MenuItem value={singleRole} name={singleRole.name}>
        {singleRole.name}
      </MenuItem>
    );
  };

  onGetError = (response) => {
    _logger({ error: response });
  };

  handleRoles = (values) => {
    _logger(values.target.value.name);
    this.setState(
      (prevState) => {
        return {
          ...prevState,
          roleFormData: {
            ...prevState.roleFormData,
            role: values.target.value.name,
          },
        };
      },
      () => {
        _logger("TEST", this.state.roleFormData);
        adminDashService
          .getUsersByRole(this.state.roleFormData)
          .then(this.passToRoleDash)
          .catch(this.onGetUserRoleErr);
      }
    );
  };

  passToRoleDash = (response) => {
    _logger(response);
    this.props.passToMapper(response);
  };

  onGetUserRoleErr = (error) => {
    _logger({ error: error });
  };

  render() {
    return (
      <Fragment>
        <WrapperSimple sectionHeading="Select By Role">
          <Formik onSubmit={this.handleSubmit}>
            {(formikProps) => {
              const { values } = formikProps;
              return (
                <form validate autoComplete="off">
                  <FormControl fullWidth={"true"}>
                    <InputLabel htmlFor="role">Select</InputLabel>
                    <Select
                      id="role"
                      values={values}
                      onChange={this.handleRoles}
                    >
                      {this.state.mappedRoleCategory}
                    </Select>
                  </FormControl>
                </form>
              );
            }}
          </Formik>
        </WrapperSimple>
      </Fragment>
    );
  }
}
AdminDashDropDown.propTypes = {
  passToMapper: PropTypes.func,
};
export default AdminDashDropDown;
