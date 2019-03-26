import React, { Component } from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import SmartCalendar from "./containers/SmartCalendar/SmartCalendar";
import Welcome from './containers/Welcome/Welcome';
import * as actions from "./store/actions/index";

class App extends Component {
    componentDidMount() {
        this.props.onTryAutoSignin();
    }

    render() {
        let routes = (
            <Switch>
                <Route path="/" exact component={Welcome} />
                <Redirect to="/" />
            </Switch>
        );

        if (this.props.isAuthenticated) {
            routes = (
                <Switch>
                    <Route path="/SmartCalendar" exact component={SmartCalendar} />
                    <Redirect to="/SmartCalendar" />
                </Switch>
            );
        }

        return (
            <div>
                {routes}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignin: () => dispatch(actions.authCheckState())
    };
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(App));


