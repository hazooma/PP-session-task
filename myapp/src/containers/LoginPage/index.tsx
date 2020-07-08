import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { actions } from "../../shared/store";

import { Dispatch, bindActionCreators } from "redux";
interface LoginProps {
  login: (username: string, password: string) => void;
  logout: () => void;
  username?: string;
  password?: string;
  loggingIn?: boolean;
}

interface LoginState {
  username: string;
  password: string;
  submitted: boolean;
}

class LoginPage extends React.Component<LoginProps, LoginState> {
  constructor(props: LoginProps) {
    super(props);

    // reset login status
    this.props.logout();

    this.state = {
      username: "",
      password: "",
      submitted: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e: any) {
    const { name, value } = e.target;
    if (name === "username") {
      this.setState({ username: value });
    }
    if (name === "password") {
      this.setState({ password: value });
    }
  }

  handleSubmit(e: any) {
    e.preventDefault();

    this.setState({ submitted: true });
    const { username, password } = this.state;
    if (username && password) {
      this.props.login(username, password);
    }
  }

  render() {
    const { loggingIn } = this.props;

    const { username, password, submitted } = this.state;
    if (submitted && loggingIn) {
      return <Redirect to={{ pathname: "/items" }} />;
    }
    return (
      <div className="col-md-6 col-md-offset-3">
        <h2>Login</h2>
        <form name="form" onSubmit={this.handleSubmit}>
          <div
            className={
              "form-group" + (submitted && !username ? " has-error" : "")
            }
          >
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className="form-control"
              name="username"
              value={username}
              onChange={this.handleChange}
            />
            {submitted && !username && (
              <div className="help-block">Username is required</div>
            )}
          </div>
          <div
            className={
              "form-group" + (submitted && !password ? " has-error" : "")
            }
          >
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={password}
              onChange={this.handleChange}
            />
            {submitted && !password && (
              <div className="help-block">Password is required</div>
            )}
          </div>
          <div className="form-group">
            <button className="btn btn-primary">Login</button>
          </div>
        </form>
      </div>
    );
  }
}
const mapStateToProps = (state: any) => {
  const { loggingIn } = state?.App || false;

  return { loggingIn };
};

interface OwnProps {
  userName?: string;
  password?: string;
}
const mapDispatchToProps = (dispatch: Dispatch, props: OwnProps) => {
  return bindActionCreators(
    {
      login: (username: string, password: string) =>
        actions.logInAction(username, password),
      logout: () => actions.fetchItemsAction(),
    },
    dispatch,
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
