import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Login from "./containers/LoginPage";
import ListItems from "./containers/ItemsPage";

import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import { store } from "./shared/store";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { PrivateRoute } from "./components/privateRouter";
import ItemPage from "./containers/ItemPage";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link
              to="/"
              onClick={(e) => {
                localStorage.clear();
              }}
            >
              Logout
            </Link>
          </li>
          <li>
            <Link to="/items">Items</Link>
          </li>
        </ul>

        <Switch>
          <PrivateRoute exact path="/items" Component={ListItems} />
          <PrivateRoute exact path="/item/:id" Component={ItemPage} />

          <Route path="/logout">
            <Login />
          </Route>
          <Route path="/">
            <Login />
          </Route>

          <Route path="/login">
            <Login />
          </Route>
        </Switch>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root"),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
