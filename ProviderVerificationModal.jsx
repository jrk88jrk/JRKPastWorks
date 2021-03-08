import React from "react";
import { Button, Grid, DialogContent, InputLabel } from "@material-ui/core";
import PropTypes from "prop-types";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import debug from "sabio-debug";
import toastr from "toastr";

const ProviderVerificationModal = (props) => {
  function handleClose() {
    props.closeWindow();
  }
  function handleVerify() {
    props.verifyButton(props);
  }
  function handleReject() {
    props.rejectButton(props);
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
            Provider NPI Registry Details
          </div>
        </DialogTitle>
        <DialogContent style={{ overflow: "auto" }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6} lg={4}></Grid>
            <div className="d-flex align-items-center px-4 mb-3">
              <div className="my-2 font-size-lg p-2 mx-4 bg-secondary rounded-sm">
                <div className="mb-6" style={{ borderBottomStyle: "groove" }}>
                  <InputLabel
                    htmlFor="FullName"
                    labelPlacement="top"
                    margin="dense"
                  >
                    Full Name
                  </InputLabel>
                  <br></br>
                  <span className="text-black font-size-lg font-size-lg">
                    {props.user.basic && props.user.basic.namePrefix}{" "}
                    {props.user.basic && props.user.basic.firstName}{" "}
                    {props.user.basic && props.user.basic.middleName}{" "}
                    {props.user.basic && props.user.basic.lastName}
                  </span>
                </div>
                {/* ----------------------------------NEXT FIELD(NPI)-------------------------------------------- */}
                <div className="mb-6" style={{ borderBottomStyle: "groove" }}>
                  <InputLabel
                    htmlFor="categoryId"
                    labelPlacement="top"
                    margin="dense"
                  >
                    NPI
                  </InputLabel>
                  <br></br>
                  <span className="text-black font-size-lg font-size-lg">{`${props.user.number}`}</span>
                </div>
                {/* ----------------------------------NEXT FIELD/s Basic Info (Prefix)-------------------------------------------- */}
                <div className="mb-6" style={{ borderBottomStyle: "groove" }}>
                  <InputLabel
                    htmlFor="categoryId"
                    labelPlacement="top"
                    margin="dense"
                  >
                    Prefix
                  </InputLabel>
                  <br></br>
                  <span className="text-black font-size-lg">
                    {`${props.user.basic && props.user.basic.namePrefix}`}
                  </span>
                </div>
                {/* ----------------------------------NEXT FIELD Credential/License-------------------------------------------- */}{" "}
                <div className="mb-6" style={{ borderBottomStyle: "groove" }}>
                  <InputLabel
                    htmlFor="credential"
                    labelPlacement="top"
                    margin="dense"
                  >
                    Credential
                  </InputLabel>
                  <br></br>
                  <span className="text-black font-size-lg">
                    {`${props.user.basic && props.user.basic.credential}`}
                  </span>
                </div>
                {/* ----------------------------------NEXT FIELD Gender-------------------------------------------- */}{" "}
                <div className="mb-6" style={{ borderBottomStyle: "groove" }}>
                  <InputLabel
                    htmlFor="Gender"
                    labelPlacement="top"
                    margin="dense"
                  >
                    Gender
                  </InputLabel>
                  <br></br>
                  <span className="text-black font-size-lg">
                    {`${props.user.basic && props.user.basic.gender}`}
                  </span>
                </div>
                {/* ----------------------------------NEXT FIELD Addresses(countrycode)-------------------------------------------- */}{" "}
                <div className="mb-6" style={{ borderBottomStyle: "groove" }}>
                  <InputLabel
                    htmlFor="CountryCode"
                    labelPlacement="top"
                    margin="dense"
                  >
                    Country Code
                  </InputLabel>
                  <br></br>
                  <span className="text-black font-size-lg">
                    {`${
                      props.user.addresses &&
                      props.user.addresses[0].countryCode
                    }`}
                  </span>
                </div>
                {/* ----------------------------------NEXT FIELD country name-------------------------------------------- */}{" "}
                <div className="mb-6" style={{ borderBottomStyle: "groove" }}>
                  <InputLabel
                    htmlFor="CountryName"
                    labelPlacement="top"
                    margin="dense"
                  >
                    Country Name
                  </InputLabel>
                  <br></br>
                  <span className="text-black font-size-lg">
                    {`${
                      props.user.addresses &&
                      props.user.addresses[0].countryName
                    }`}
                  </span>
                </div>
                {/* ----------------------------------NEXT FIELD Address Purpose-------------------------------------------- */}{" "}
                <div className="mb-6" style={{ borderBottomStyle: "groove" }}>
                  <InputLabel
                    htmlFor="AddressPurpose"
                    labelPlacement="top"
                    margin="dense"
                  >
                    Address Purpose
                  </InputLabel>
                  <br></br>
                  <span className="text-black font-size-lg">
                    {`${
                      props.user.addresses &&
                      props.user.addresses[0].addressPurpose
                    }`}
                  </span>
                </div>
                {/* ----------------------------------NEXT FIELD address type-------------------------------------------- */}{" "}
                <div className="mb-6" style={{ borderBottomStyle: "groove" }}>
                  <InputLabel
                    htmlFor="addressType"
                    labelPlacement="top"
                    margin="dense"
                  >
                    Address Type
                  </InputLabel>
                  <br></br>
                  <span className="text-black font-size-lg">
                    {`${
                      props.user.addresses &&
                      props.user.addresses[0].addressType
                    }`}
                  </span>
                </div>
                {/* ----------------------------------NEXT FIELD City-------------------------------------------- */}{" "}
                <div className="mb-6" style={{ borderBottomStyle: "groove" }}>
                  <InputLabel
                    htmlFor="City"
                    labelPlacement="top"
                    margin="dense"
                  >
                    City
                  </InputLabel>
                  <br></br>
                  <span className="text-black font-size-lg">
                    {`${props.user.addresses && props.user.addresses[0].city}`}
                  </span>
                </div>
                {/* ----------------------------------NEXT FIELD State-------------------------------------------- */}{" "}
                <div className="mb-6" style={{ borderBottomStyle: "groove" }}>
                  <InputLabel
                    htmlFor="State"
                    labelPlacement="top"
                    margin="dense"
                  >
                    State
                  </InputLabel>
                  <br></br>
                  <span className="text-black font-size-lg">
                    {`${props.user.addresses && props.user.addresses[0].state}`}
                  </span>
                </div>
                {/* ----------------------------------NEXT FIELD postal code-------------------------------------------- */}{" "}
                <div className="mb-6" style={{ borderBottomStyle: "groove" }}>
                  <InputLabel
                    htmlFor="PostalCode"
                    labelPlacement="top"
                    margin="dense"
                  >
                    Postal Code
                  </InputLabel>
                  <br></br>
                  <span className="text-black font-size-lg">
                    {`${
                      props.user.addresses && props.user.addresses[0].postalCode
                    }`}
                  </span>
                </div>
                {/* ----------------------------------NEXT FIELD telephone Number-------------------------------------------- */}{" "}
                <div className="mb-6" style={{ borderBottomStyle: "groove" }}>
                  <InputLabel
                    htmlFor="TelephoneNumber"
                    labelPlacement="top"
                    margin="dense"
                  >
                    Telephone Number
                  </InputLabel>
                  <br></br>
                  <span className="text-black font-size-lg">
                    {`${
                      props.user.addresses &&
                      props.user.addresses[0].telephoneNumber
                    }`}
                  </span>
                </div>
                {/* ----------------------------------NEXT FIELD-------------------------------------------- */}{" "}
                <div className="mb-6" style={{ borderBottomStyle: "groove" }}>
                  <InputLabel
                    htmlFor="FaxNumber"
                    labelPlacement="top"
                    margin="dense"
                  >
                    Fax Number
                  </InputLabel>
                  <br></br>
                  <span className="text-black font-size-lg">
                    {`${
                      props.user.addresses && props.user.addresses[0].faxNumber
                    }`}
                  </span>
                </div>
                {/* ----------------------------------NEXT FIELD Taxonomies code-------------------------------------------- */}{" "}
                <div className="mb-6" style={{ borderBottomStyle: "groove" }}>
                  <InputLabel
                    htmlFor="taxonomyCode"
                    labelPlacement="top"
                    margin="dense"
                  >
                    Taxonomy Code
                  </InputLabel>
                  <br></br>
                  <span className="text-black font-size-lg">
                    {`${
                      props.user.taxonomies && props.user.taxonomies[0].code
                    }`}
                  </span>
                </div>
                {/* ----------------------------------NEXT FIELD tax description-------------------------------------------- */}{" "}
                <div className="mb-6" style={{ borderBottomStyle: "groove" }}>
                  <InputLabel
                    htmlFor="TaxonomyDesc"
                    labelPlacement="top"
                    margin="dense"
                  >
                    Taxonomy Description
                  </InputLabel>
                  <br></br>
                  <span className="text-black font-size-lg">
                    {`${
                      props.user.taxonomies && props.user.taxonomies[0].desc
                    }`}
                  </span>
                </div>
                {/* ----------------------------------NEXT FIELD tax primary-------------------------------------------- */}{" "}
                <div className="mb-6" style={{ borderBottomStyle: "groove" }}>
                  <InputLabel
                    htmlFor="TaxonomyPrimary"
                    labelPlacement="top"
                    margin="dense"
                  >
                    Taxonmy Primary
                  </InputLabel>
                  <br></br>
                  <span className="text-black font-size-lg">
                    {`${
                      props.user.taxonomies && props.user.taxonomies[0].primary
                    }`}
                  </span>
                </div>
                {/* ----------------------------------NEXT FIELD-------------------------------------------- */}{" "}
                <div className="mb-6" style={{ borderBottomStyle: "groove" }}>
                  <InputLabel
                    htmlFor="StateLicense"
                    labelPlacement="top"
                    margin="dense"
                  >
                    State of License
                  </InputLabel>
                  <br></br>
                  <span className="text-black font-size-lg">
                    {`${
                      props.user.taxonomies && props.user.taxonomies[0].state
                    }`}
                  </span>
                </div>
                {/* ----------------------------------NEXT FIELD license number-------------------------------------------- */}{" "}
                <div className="mb-6" style={{ borderBottomStyle: "groove" }}>
                  <InputLabel
                    htmlFor="LicenseNumber"
                    labelPlacement="top"
                    margin="dense"
                  >
                    License Number
                  </InputLabel>
                  <br></br>
                  <span className="text-black font-size-lg">
                    {`${
                      props.user.taxonomies && props.user.taxonomies[0].license
                    }`}
                  </span>
                </div>
                {/* ----------------------------------NEXT FIELD-------------------------------------------- */}{" "}
                <div className="mb-6" style={{ borderBottomStyle: "groove" }}>
                  <InputLabel
                    htmlFor="status"
                    labelPlacement="top"
                    margin="dense"
                  >
                    Status
                  </InputLabel>
                  <br></br>
                  <span className="text-black font-size-lg">
                    {`${props.user.basic && props.user.basic.status}`}
                  </span>
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
              className=" btn btn-primary"
              size="medium"
            >
              Close
            </Button>
            <Button
              onClick={handleVerify}
              variant="contained"
              color="primary"
              className=" btn btn-primary"
              autoFocus
              size="medium"
            >
              Verify
            </Button>
            <Button
              onClick={handleReject}
              variant="contained"
              color="secondary"
              className=" btn btn-primary"
              autoFocus
              size="medium"
            >
              Reject
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

ProviderVerificationModal.propTypes = {
  user: PropTypes.shape({
    number: PropTypes.number,
    basic: PropTypes.shape({
      firstName: PropTypes.string.isRequired,
      middleName: PropTypes.string,
      lastName: PropTypes.string.isRequired,
      namePrefix: PropTypes.string,
      credential: PropTypes.string,
      gender: PropTypes.string.isRequired,
      email: PropTypes.email,
      status: PropTypes.string,
    }),
    addresses: PropTypes.arrayOf({
      countryCode: PropTypes.string,
      countryName: PropTypes.string,
      addressPurpose: PropTypes.string,
      addressType: PropTypes.string,
      city: PropTypes.string,
      state: PropTypes.string,
      postalCode: PropTypes.int,
      telephoneNumber: PropTypes.string,
      faxNumber: PropTypes.string,
    }),
    taxonomies: PropTypes.arrayOf({
      code: PropTypes.string,
      desc: PropTypes.string,
      state: PropTypes.string.isRequired,
      license: PropTypes.string.isRequired,
    }),
    identifiers: PropTypes.string,
  }),
  id: PropTypes.int,
  closeWindow: PropTypes.func.isRequired,
  verifyButton: PropTypes.func.isRequired,
  rejectButton: PropTypes.func.isRequired,
  isViewOpen: PropTypes.bool.isRequired,
};
export default ProviderVerificationModal;
