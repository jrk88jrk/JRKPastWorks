import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Grid, Card, List, ListItem, Snackbar } from "@material-ui/core";
import debug from "sabio-debug";
import tempProviderService from "../../services/adminDash/tempProviderService";
import ATempProvider from "./aTempProvider";
import Alert from "../../assets/components/Alert";
import ProviderVerificationModal from "./ProviderVerificationModal";
const _logger = debug.extend("ProviderVerification");

class ProviderVerification extends React.Component {
  state = {
    snackBarShow: false,
    severity: "success",
    barMessage: "",
    isViewOpen: false,
    singleProvider: {},
    currentProvider: 0,
  };

  componentDidMount() {
    this.getProviders();
  }

  getProviders = () => {
    tempProviderService
      .getTempProviders()
      .then(this.onGetSuccess)
      .catch(this.onGetError);
  };

  onGetSuccess = (response) => {
    _logger(response);
    let userArray = response.items;
    if (userArray !== null) {
      this.setState((prevState) => {
        return {
          ...prevState,
          singleProvider: {},
          mappedUser: userArray.map(this.mapProvider),
        };
      });
    }
  };

  onGetError = (response) => {
    _logger({ error: response });
    this.setState((prevState) => {
      return {
        ...prevState,
        snackBarShow: true,
        barMessage:
          "NPI number does not correspond to an NPI in the NPI Registry database.",
        severity: "error",
      };
    });
  };

  mapProvider = (aUser) => {
    _logger(aUser);
    return (
      <ATempProvider
        verifyNPI={this.verifyProvider}
        aUser={aUser}
        key={aUser.Id}
      />
    );
  };

  verifyProvider = (response) => {
    _logger(response.providerToEdit);
    let newProvider = response.providerToEdit;
    tempProviderService
      .verifyProvider(newProvider)
      .then((response) => this.onSuccessfulCallReg(response, newProvider))
      .catch(this.onGetError);
  };

  onSuccessfulCallReg = (response, providerId) => {
    _logger(response.item.results[0]);
    _logger("PROVIDERID", providerId);

    const providers = response.item.results;

    if (providers.length > 0) {
      const namedProviders = providers.map((provider) => {
        if (provider.basic) {
          this.mapNames(provider.basic);
        }
        if (provider.addresses.length > 0) {
          provider.addresses.map((address) => this.mapNames(address));
        }

        return provider;
      });

      this.setState((prevState) => {
        return {
          ...prevState,
          singleProvider: namedProviders[0],
          currentProvider: { id: providerId.id, email: providerId.email },
          isViewOpen: true,
        };
      });
    } else if (providers.length === 0) {
      this.onGetError();
      return {};
    }
  };
  closeViewModal = () => {
    this.getProviders(),
      this.setState((prevState) => {
        return {
          ...prevState,
          isViewOpen: false,
        };
      });
  };
  closeVerifiedModal = () => {
    this.getProviders(),
      this.setState((prevState) => {
        return {
          ...prevState,
          isViewOpen: false,
          snackBarShow: true,
          severity: "success",
          barMessage:
            "An verification email has been sent to the Provider's inbox with log in instructions.",
        };
      });
  };

  handleClose = () => {
    // _logger("trying to close");
    this.setState((prevState) => {
      return {
        ...prevState,
        snackBarShow: false,
      };
    });
  };

  mapNames = (objName) => {
    for (const key in objName) {
      let name = key.replace("_", "");
      objName[name] = objName[key];
    }
  };

  validateProvider = (response) => {
    _logger(response);
    tempProviderService
      .validateProvider(response)
      .then(this.closeVerifiedModal)
      .catch(this.onGetError);
  };

  rejectProviderVerification = (response) => {
    _logger(this.state);
    this.setState(() => {
      return {
        isViewOpen: false,
        snackBarShow: true,
        barMessage:
          "You have rejected a providers verification. This means that it is possible the `provider` has an NPI but is not active or does not have a license number.",
        severity: "error",
      };
    });
    () => {
      _logger(this.state);
    };
  };

  render() {
    return (
      <Grid item xs={6}>
        <Card className="card-box overflow-hidden  text-dark">
          <div
            className=" text-black card-header--title py-2 font-size-lg font-weight-bold"
            style={{ textAlignLast: "center" }}
          >
            {" "}
            Provider Verification Dash
          </div>
          <div className="scroll-area" style={{ height: "400px" }}>
            <List className="py-0">
              <ListItem
                className="d-flex justify-content-between align-items-left py-2 bg-brand-facebook"
                style={{ borderBottomStyle: "groove" }}
              >
                <div className="d-flex align-items-left">
                  <div className="font-size-lg pb-1 text-white d-block mb-1">
                    User Name
                  </div>
                </div>
                <br />

                <div className="padding-for-mobile-title">
                  {" "}
                  <span
                    className="font-size-lg pb-1  text-white d-block mb-1"
                    style={{ alignContent: "left" }}
                  >
                    User Status
                  </span>
                </div>
                <span style={{ alignContent: "center" }}></span>
                <div className="padding-for-mobile-title">
                  {" "}
                  <span
                    className="font-size-lg pb-1  text-white d-block mb-1"
                    style={
                      ({ alignContent: "center" }, { paddingRight: "25%" })
                    }
                  >
                    User Role
                  </span>
                </div>
                <span
                  style={({ paddingLeft: "25%" }, { alignContent: "right" })}
                ></span>

                <div></div>
              </ListItem>
              <Snackbar
                open={this.state.snackBarShow}
                autoHideDuration={6000}
                onClose={this.handleClose}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
              >
                <Alert severity={this.state.severity}>
                  {this.state.barMessage}
                </Alert>
              </Snackbar>
              <ProviderVerificationModal //modal dialog
                isViewOpen={this.state.isViewOpen}
                user={this.state.singleProvider}
                userId={this.state.currentProvider}
                closeWindow={this.closeViewModal}
                rejectButton={this.rejectProviderVerification}
                verifyButton={this.validateProvider}
              />
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
            </List>
          </div>
        </Card>
      </Grid>
    );
  }
}
ProviderVerification.propTypes = {
  verifyProvider: PropTypes.func,
};
export default ProviderVerification;
