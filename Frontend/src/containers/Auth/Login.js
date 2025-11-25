import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import "./Login.scss";
import "@fortawesome/fontawesome-free/css/all.min.css";
// import { FormattedMessage } from "react-intl";
import { handleLoginApi } from "../../services/userService";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      isShowPassword: false,
      errMessage: "",
    };
  }

  handleOnChangeInput = (event, fieldName) => {
    this.setState({
      [fieldName]: event.target.value,
    });
  };
  handleShowHidePassword = () => {
    this.setState({
      isShowPassword: !this.state.isShowPassword,
    });
  };

  handleLogin = async () => {
    this.setState({ errMessage: "" });
    try {
      let data = await handleLoginApi(
        this.state.username,
        this.state.password
      );
      console.log(data);
      if (data && data.errCode !== "LOGIN_SUCCESS") {
        this.setState({
          errMessage: data.errMessage,
        });
      }
      if (data && data.errCode === "LOGIN_SUCCESS") {
        this.props.userLoginSuccsess(data.user);
      }
    } catch (e) {
      if (e.response) {
        if (e.response.data) {
          this.setState({
            errMessage:
              e.response.data.errMessage ||
              "Something went wrong",
          });
        }
      }
    }
  };
  render() {
    return (
      <div className="login-background">
        <div className="login-container">
          <div className="login-content row">
            <div className="col-12 login-text">Login</div>
            <div className="col-12 form-group login-input">
              <label>Username: </label>
              <input
                type="type"
                className="form-control"
                placeholder="Enter your username"
                value={this.state.username}
                onChange={(event) =>
                  this.handleOnChangeInput(
                    event,
                    "username"
                  )
                }
              ></input>
            </div>
            <div className="col-12 form-group login-input">
              <label>Password: </label>
              <div className="custom-input-password">
                <input
                  type={
                    this.state.isShowPassword
                      ? "text"
                      : "password"
                  }
                  className="form-control"
                  placeholder="Enter your password"
                  value={this.state.password}
                  onChange={(event) =>
                    this.handleOnChangeInput(
                      event,
                      "password"
                    )
                  }
                ></input>
                <span
                  onClick={() => {
                    this.handleShowHidePassword();
                  }}
                >
                  <i
                    className={
                      this.state.isShowPassword
                        ? "far fa-eye"
                        : "far fa-eye-slash"
                    }
                  ></i>
                </span>
              </div>
            </div>
            <div className="col-12 err-message">
              {this.state.errMessage}
            </div>
            <div className="col-12">
              <button
                className="btn-login"
                onClick={() => this.handleLogin()}
              >
                Login
              </button>
            </div>
            <div className="col-12">
              <span className="forgot-password">
                Forgot your password?
              </span>
            </div>
            <div className="col-12 text-center">
              <span className="text-other-login">
                Or Login with:
              </span>
            </div>
            <div className="col-12 social-login">
              <i className="fa-brands fa-google google"></i>
              <i className="fa-brands fa-facebook facebook"></i>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    // userLoginFail: () => dispatch(actions.userLoginFail()),
    userLoginSuccsess: (userInfor) =>
      dispatch(actions.userLoginSuccsess(userInfor)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
