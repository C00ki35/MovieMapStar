import React, { Component } from "react";
import Dashboard from "./Components/Dashboard";
import Home from "./Components/Home";
import Verify from "./Components/Verify";
import Register from "./Components/Register";
import Login from "./Components/Login";
import Gallery from "./Components/Gallery";
import Usercamera from "./Components/Usercamera";
import Genres from "./Components/Genres";
import Profile from "./Components/Profile";
import Navbar from "./Components/Navbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Auth } from "aws-amplify";
import ViewToggler from "./Components/ViewToggler";

class App extends Component {
  state = {
    isAuthenticated: false,
    isAuthenticating: true,
    user: null,
    movieId: null,
    genres: "",
    username: "",
    menuVisible: false,
  };

  setAuthStatus = (authenticated) => {
    this.setState({ isAuthenticated: authenticated });
  };

  setUser = (user) => {
    this.setState({ user: user });
  };

  setUsername = (username) => {
    this.setState({ username: username });
  };

  async componentDidMount() {
    try {
      await Auth.currentSession();
      this.setAuthStatus(true);
      const user = await Auth.currentAuthenticatedUser();
      this.setUser(user);
    } catch (error) {
      console.log(error);
    }
    this.setState({ isAuthenticating: false });
  }

  setGenres = (genres) => {
    this.setState({ genres: genres }, () => {
      console.log("Genres are now set:", this.state.genres);
    });
  };

  hideMenu = (menu) => {
    this.setState({ menuVisible: true });
  };

  render() {
    const authProps = {
      isAuthenticated: this.state.isAuthenticated,
      user: this.state.user,
      isNavBarHidden: this.state.isNavBarHidden,
      setAuthenticated: this.setAuthStatus,
      userInfo: this.setUser,
      userGenres: this.setGenres,
      verifyUsername: this.setUsername,
      genres: this.state.genres,
      username: this.state.username,
      menuToggle: this.hideMenu,
      menuVisible: this.state.menuVisible,
    };

    return (
      !this.state.isAuthenticating && (
        <div className={"App"}>
          <Router>
            <div>
              {this.state.menuVisible ? (
                <ViewToggler>
                  <Navbar auth={authProps} />
                </ViewToggler>
              ) : null}

              <Switch primary={false}>
                <Route
                  exact
                  path="/"
                  render={(props) => <Login {...props} auth={authProps} />}
                />
                <Route
                  exact
                  path="/register"
                  render={(props) => (
                    <Register
                      auth={authProps}
                      {...props}
                      userProps={this.props}
                    />
                  )}
                />
                <Route
                  exact
                  path="/verify"
                  render={(props) => <Verify {...props} auth={authProps} />}
                />
                <Route
                  exact
                  path="/home"
                  render={(props) => <Home auth={authProps} {...props} />}
                />
                <Route
                  exact
                  path="/userCamera"
                  render={(props) => <Usercamera auth={authProps} {...props} />}
                />
                <Route
                  exact
                  path="/gallery"
                  render={(props) => <Gallery auth={authProps} {...props} />}
                />
                <Route
                  exact
                  path="/maps"
                  render={(props) => <Dashboard auth={authProps} {...props} />}
                />
                <Route
                  exact
                  path="/profile"
                  render={(props) => <Profile auth={authProps} {...props} />}
                />
                <Route
                  exact
                  path="/profile/genres"
                  render={(props) => <Genres auth={authProps} {...props} />}
                />
              </Switch>
            </div>
          </Router>
        </div>
      )
    );
  }
}
export default App;
