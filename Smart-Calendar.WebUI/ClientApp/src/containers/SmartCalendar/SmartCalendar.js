import React, { Component } from "react";
import { connect } from "react-redux";
import { Divider, Container, Loader, Message } from "semantic-ui-react";
import Menubar from "../MenuBar/MenuBar";
import StaffTable from "../StaffTable/StaffTable";
import Footer from "../../components/Footer/Footer";
import * as actions from "../../store/actions/index";

class SmartCalender extends Component {
    componentDidMount() {
        this.props.onInitUsers();
        this.props.onInitAccounts();
        this.props.onGetUser(this.props.accountId);
    }

    render() {
        return (
            <React.Fragment>
                {this.props.users && this.props.accounts ?
                    <div>
                        <Menubar />
                        <Divider hidden />
                        <Container>
                            {!this.props.currentUser && <Message attached warning size="big" >
                                <Message.Header>Account not activated!</Message.Header>
                                <p>Please inform admin to activate your account.</p>
                            </Message>}
                            <StaffTable users={this.props.users} />
                        </Container>
                        <Divider hidden />
                        <Footer /> 
                    </div>
                    : <Loader active inline="centered" size="massive" />}
            </React.Fragment >
        );
    }
}

const mapStateToProps = state => {
    return {
        users: state.staffTable.users,
        accounts: state.staffTable.accounts,
        currentUser: state.staffTable.currentUser,
        accountId: state.auth.accountId
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onInitUsers: () => dispatch(actions.initUsers()),
        onInitAccounts: () => dispatch(actions.initAccounts()),
        onGetUser: id => dispatch(actions.getUserInfo(id))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SmartCalender);
