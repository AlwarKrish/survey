import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom"; //BrowserROuter is the brains behind react, Route is used to specify some rules
import { connect } from "react-redux"; //hoock up app component to an action-creator
import * as actions from "../actions"; //all action creators

import Header from "./Header";

import Landing from "./Landing";

const Dashboard = () => <h2>Dashboard</h2>;
const SurveyNew = () => <h2>SurveyNew</h2>;


class App extends Component {
  componentDidMount() {
    //componentWillMount is not used because of specificity...both are the same
    this.props.fetchUser();
  }

  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <div>
            <Header />
            <Route exact={true} path="/" component={Landing} />
            <Route exact path="/surveys" component={Dashboard} />
            <Route path="/surveys/new" component={SurveyNew} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}
//exact uses the routes only if the particular url component is rendered
export default connect(
  null,
  actions
)(App); //first argument for mount state prop function
//
