import React, { Fragment } from "react";
import { withRouter } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import { Grid, CardContent, Button } from "@material-ui/core";
import debug from "sabio-debug";

const _logger = debug.extend("AdminButtons");

class AdminPanel extends React.Component {
  goToBlogs = () => {
    _logger(this.props);
    this.props.history.push("/BlogSection");
  };
  goToFAQ = () => {
    this.props.history.push("/FAQs/new");
  };
  goToDemo = () => {
    this.props.history.push("/demo");
  };

  render() {
    return (
      <Fragment>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6} lg={4}>
            <div className="card card-box-alt card-box-hover-rise card-box-hover mb-4">
              <Button
                className="mt-1"
                variant="contained"
                title="Click to Manage Blogs"
                onClick={this.goToBlogs}
              >
                <CardContent className="p-3">
                  <div className="bg-deep-blue text-white display-4 card-icon-wrapper rounded-circle">
                    <FontAwesomeIcon icon={["far", "hospital"]} />
                  </div>
                  <h3 className="heading-6 mt-4 mb-4">Manage Blog Posts</h3>
                  <p className="card-text mb-4">
                    Update and Delete Blog Posts Here
                  </p>
                </CardContent>
              </Button>
            </div>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <div className="card card-box-alt card-box-hover-rise card-box-hover mb-4">
              <Button
                className="mt-1"
                variant="contained"
                title="Click to Manage FAQs"
                onClick={this.goToFAQ}
              >
                <CardContent className="p-3">
                  <div className="bg-sunny-morning text-white display-4 card-icon-wrapper rounded-circle">
                    <FontAwesomeIcon icon={["far", "address-card"]} />
                  </div>
                  <h3 className="heading-6 mt-4 mb-4">Manage FAQ Posts</h3>
                  <p className="card-text mb-4">
                    Update your Frequently Asked Questions Here
                  </p>
                </CardContent>
              </Button>
            </div>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <div className="card card-box-alt card-box-hover-rise card-box-hover mb-4">
              <Button
                className="mt-1"
                variant="contained"
                title="Click to Manage Demos"
                onClick={this.goToDemo}
              >
                <CardContent className="p-3">
                  <div className="bg-grow-early text-white display-4 card-icon-wrapper rounded-circle">
                    <FontAwesomeIcon icon={["far", "calendar-alt"]} />
                  </div>
                  <h3 className="heading-6 mt-4 mb-4">Demo</h3>
                  <p className="card-text mb-4">
                    Place Holder for Demos or Other Function
                  </p>
                </CardContent>
              </Button>
            </div>
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}
AdminPanel.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
  providerId: PropTypes.number,
};
export default withRouter(AdminPanel);
