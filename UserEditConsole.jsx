import "../../assets/styles/providerDashboard.css";
import debug from "sabio-debug";
import adminDashService from "../../services/adminDash/adminDashService";
import AUserRole from "./aUserRole";
import React, { Fragment } from "react";
import PropTypes from "prop-types";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Grid, Card, List, ListItem } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import AdminDashDropDown from "./AdminDashDropDown";

const _logger = debug.extend("UserEditConsole");

class UserEditConsole extends React.Component {
  state = {
    page: {
      pageIndex: 0,
      pageSize: 10,
      totalCount: 0,
      totalPages: 0,
    },
  };

  componentDidMount() {
    _logger("component did mount firing");
    this.getAdminDashRoles();
  }

  getAdminDashRoles = () => {
    _logger(this.state);

    let payload = {
      pageIndex: this.state.page.pageIndex,
      pageSize: this.state.page.pageSize,
    };
    _logger("firing", payload);

    adminDashService
      .getAllUserRoles(payload)
      .then(this.onGetAllSuccess)
      .catch(this.onGetAllError);
  };

  onGetAllSuccess = (response) => {
    _logger(this.response);
    let userArray = response.item.pagedItems;
    if (userArray !== null) {
      this.setState((prevState) => {
        return {
          ...prevState,
          mappedUser: userArray.map(this.mapUser),
          page: {
            pageIndex: response.item.pageIndex,
            pageSize: response.item.pageSize,
            totalCount: response.item.totalCount,
            totalPages: response.item.totalPages,
          },
          //  {
          //   ...prevState,
          //   totalCount: response.totalCount,
          //   totalPages: response.totalPages,
          // },
        };
      }, _logger("setState finished render for all users"));
    }
  };
  onGetAllError = (error) => {
    _logger({ error: error });
    this.setState((prevState) => {
      return {
        ...prevState,
      };
    });
  };

  mapUser = (aUser) => {
    if (aUser.firstName !== null) {
      return (
        <AUserRole
          viewModal={this.props.viewUser}
          aUser={aUser}
          key={aUser.userId}
        />
      );
    }
  };

  pageChange = (event, page) => {
    _logger(page);
    this.setState(
      (prevState) => {
        return {
          ...prevState,
          page: {
            ...prevState.page,
            pageIndex: page + 0,
          },
        };
      },
      () => {
        _logger(this.state);
        this.getAdminDashRoles();
      }
    );
  };
  render() {
    return (
      <Grid item xs={12}>
        <Card className="card-box overflow-hidden  text-dark">
          <div
            className=" text-black card-header--title py-2 font-size-lg font-weight-bold"
            style={{ textAlignLast: "center" }}
          >
            {" "}
            Admin Dashboard
          </div>
          <div className="scroll-area" style={{ height: "400px" }}>
            <PerfectScrollbar>
              <List className="py-0">
                <ListItem
                  className="d-flex justify-content-between align-items-left py-2 bg-brand-facebook "
                  style={{ borderBottomStyle: "groove" }}
                >
                  <div className="d-flex align-items-left">
                    <div className="font-size-lg pb-1 text-white d-block mb-4">
                      User Name
                    </div>
                  </div>

                  <div className="padding-for-mobile-title">
                    {" "}
                    <span
                      className="font-size-lg pb-1  text-white d-block mb-4"
                      style={{ paddingLeft: "60%" }}
                    >
                      User Status
                    </span>
                  </div>
                  <span style={{ paddingLeft: "25%" }}>
                    <AdminDashDropDown passToMapper={this.onGetAllSuccess}>
                      {" "}
                      Select By User Role
                    </AdminDashDropDown>
                  </span>
                  <Pagination
                    total={this.state.page.totalCount}
                    // pageIndexTest={this.state.page.pageIndex}
                    //className={styles.pagination}
                    count={this.state.page.totalPages}
                    variant="outlined"
                    color="secondary"
                    onChange={this.pageChange}
                    page={this.state.page.pageIndex}
                  />
                  <div></div>
                </ListItem>
                <div>
                  {this.state.mappedUser ? (
                    this.state.mappedUser
                  ) : (
                    <ListItem className="d-flex justify-content-between align-items-center py-3">
                      <div>
                        {" "}
                        <span className="text-black d-block mt-2 font-size-lg pb-1">
                          No Users Found
                        </span>
                      </div>
                    </ListItem>
                  )}
                </div>
              </List>
            </PerfectScrollbar>
          </div>
        </Card>
      </Grid>
    );
  }
}
UserEditConsole.propTypes = {
  viewUser: PropTypes.func.isRequired,
};
export default UserEditConsole;
