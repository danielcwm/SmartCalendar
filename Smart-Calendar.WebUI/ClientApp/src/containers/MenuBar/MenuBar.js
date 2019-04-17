import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import moment from "moment";
import { Menu, Icon, Header, Button, Dropdown } from "semantic-ui-react";
import ModalUI from "../../components/UI/ModalUI";
import SearchBox from "../../components/Search/SearchBox";
import AddAccount from "../../components/UserInfo/AddAccount/AddAccount";
import EditProfile from "../Profile/EditProfile";
import AccountSettings from "../Profile/AccountSettings";
import LeaveRequests from "../LeaveRequests/LeaveRequests";
import * as actions from "../../store/actions/index";
import { checkValidity } from "../../shared/validation";
import axios from "../../axios-api";

class Menubar extends Component {
    state = {
        email: {
            value: null,
            validation: {
                required: true,
                isEmail: true
            },
            error: "Please enter a valid email",
            valid: false
        },
        password: {
            value: null,
            validation: {
                required: true,
                minLength: 4
            },
            error: "Password must be greater than or equal to 4 digits",
            valid: false
        },
        roleId: {
            value: null,
            validation: null,
            error: "Please select a role",
            valid: false
        },
        updatedUser: {
            firstName: null,
            lastName: null
        },
        showFormNotice: false,
        duplicatedEmail: false,
        leaves: [],
        updatedLeaves: []
    }

    componentDidMount() {
        axios
            .get("calendar/LeaveRequest")
            .then(response => {
                this.setState({ leaves: response.data });
            })
            .catch(error => {
                console.log(error);
            });
    }

    handleFormChange = (e, { name, value }) => {
        this.setState({
            [name]: {
                ...this.state[name],
                value: value,
                valid: checkValidity(
                    value,
                    this.state[name].validation
                )
            },
            showFormNotice: false
        }, () => {
            if (!this.props.accounts.every(account => account.email !== this.state.email.value)) {
                this.setState({ duplicatedEmail: true });
            } else {
                this.setState({ duplicatedEmail: false });
            }
        });
    }

    addAccount = () => {
        let newAccount = {
            email: this.state.email.value,
            password: this.state.password.value,
            roleId: this.state.roleId.value
        };
        this.props.onAddAccount(newAccount);
    }

    getUpdatedUser = (updatedUser) => {
        this.setState({ updatedUser: updatedUser });
    }

    updateLeaveInfo = (updatedLeaves) => {
        this.setState({ updatedLeaves: updatedLeaves });
    }

    handleUpdateLeave = () => {
        if (this.state.updatedLeaves.length > 0) {
            axios
                .put("calendar/LeaveRequest", this.state.updatedLeaves)
                .then(response => {
                    this.setState({ leaves: response.data.value });
                })
                .catch(error => {
                    console.log(error);
                });
        }
        return null;
    }

    deleteLeaveInfo = (id) => {
        axios
            .delete("calendar/LeaveRequest/" + id)
            .then(response => {
                this.setState({ leaves: this.state.leaves.filter(leave => leave.leaveRequestId !== id) });
            })
            .catch(error => {
                console.log(error);
            });
    }

    addNewLeave = (value) => {
        axios.post("Calendar/LeaveRequest", value)
            .then(res => {
                if (this.props.roleId === "1") {
                    this.setState({ leaves: res.data.value });
                }
                else {
                    this.setState({ leaves: res.data.value.filter(leave => leave.userId === this.props.currentUser.userId) });
                }
            })
            .catch(error => {
                console.log(error);
            });
    }

    showNotice = () => {
        this.setState({ showFormNotice: true });
    }

    resetState = () => {
        this.setState({
            email: {
                value: null,
                validation: {
                    required: true,
                    isEmail: true
                },
                error: "Please enter a valid email",
                valid: false
            },
            password: {
                value: null,
                validation: {
                    required: true,
                    minLength: 4
                },
                error: "Password must be greater than or equal to 4 digits",
                valid: false
            },
            roleId: {
                value: null,
                validation: null,
                error: "Please select a role",
                valid: false
            },
            updatedUser: {
                firstName: null,
                lastName: null
            },
            showFormNotice: false,
            duplicatedEmail: false,
            leaves: [],
            updatedLeaves: []
        });
    }

    render() {
        const today = moment().format("DD MMMM YYYY, dddd");
        const currentWeek = moment().weeks();
        let isDisplay = this.props.roleId === "1";
        let leaves = this.props.currentUser ? isDisplay ? this.state.leaves : this.state.leaves.filter(leave => leave.userId === this.props.currentUser.userId) : null;
        let addAccountValid = this.state.email.value && this.state.password.value && this.state.roleId.value &&
            this.state.email.valid && this.state.password.valid && !this.state.duplicatedEmail;
        let accountSettingValid = isDisplay ? this.state.updatedUser.firstName && this.state.updatedUser.lastName : true;

        return (
            <React.Fragment>
                {!this.props.isAuthenticated && <Redirect to={this.props.authRedirectPath} />}
                <Menu secondary stackable>
                    <Menu.Item >
                        <Header as="h1" size="large">
                            <Icon name="calendar alternate outline" />
                            <Header.Content>
                                Smart Calendar
                            </Header.Content>
                        </Header>
                    </Menu.Item>
                    <Menu.Item position="right" style={{ "letterSpacing": "0.2em" }}>
                        THE NEXT GENERATION EMPLOYEE MANAGEMENT SYSTEM
                    </Menu.Item>
                </Menu>


                <Menu size="small" borderless stackable style={{ background: "rgba(47, 48, 47, 0.83)", width: "100%", borderRadius: "unset" }}>

                    <Menu.Item style={{ color: "white", fontSize: "1.3em" }}>
                        Current Week: {currentWeek}
                    </Menu.Item>
                    <Menu.Item style={{ color: "white", fontSize: "1.3em" }}>
                        {today}
                    </Menu.Item>
                    <Menu.Item position="right">
                        <SearchBox searchChange={this.props.onSearchChange} />
                    </Menu.Item>
                    <Menu.Item>
                        {isDisplay && <ModalUI icon="add user" circular inverted animated header="Create Account" category="Create Account" addAccount={this.addAccount} formvalid={addAccountValid} showNotice={this.showNotice} reset={this.resetState}>
                            <AddAccount onFormChange={this.handleFormChange} formControls={this.state} />
                        </ModalUI>
                        }

                        <ModalUI icon="plane" modalSize="large" circular inverted animated header="Leave Request List" category="Leave Requests" updateLeaveInfo={this.handleUpdateLeave} reset={() => null} formvalid>
                            <LeaveRequests leaves={leaves}
                                currentUser={this.props.currentUser}
                                deleteLeave={this.deleteLeaveInfo}
                                addNewLeave={this.addNewLeave}
                                updateLeaveInfo={this.updateLeaveInfo}
                                isDisplay={isDisplay}
                            />
                        </ModalUI>

                        <Dropdown floating icon={null} trigger={
                            <Button animated="vertical" circular inverted size="small">
                                <Button.Content visible>
                                    Personal Info
                                </Button.Content>
                                <Button.Content hidden>
                                    <Icon name="settings" />
                                </Button.Content>
                            </Button>
                        }
                        >
                            <Dropdown.Menu style={{ left: "auto", right: 0, fontSize: "1.3em" }}>
                                <Dropdown.Header icon="user" content={this.props.accountEmail} />
                                <Dropdown.Divider />
                                <Dropdown.Item>
                                    <ModalUI trigger="category" modalSize="tiny" header="Personal Profile" category="Profile" formvalid personalProfile={() => null} reset={() => null}>

                                        <EditProfile />
                                    </ModalUI>
                                </Dropdown.Item>
                                <Dropdown.Item>
                                    <ModalUI trigger="category" modalSize="tiny" header="Account Settings" category="Account Settings" accountSettings={() => this.props.onUpdateUserInfo(this.state.updatedUser)} formvalid={accountSettingValid} showNotice={this.showNotice} reset={this.resetState}>
                                        <AccountSettings currentUser={this.props.currentUser} accountEmail={this.props.accountEmail} getUpdatedUser={this.getUpdatedUser} showFormNotice={this.state.showFormNotice} />
                                    </ModalUI>
                                </Dropdown.Item>
                                <Dropdown.Item>
                                    <ModalUI trigger="category" modalSize="tiny" header="Sign Out" category="Sign Out" signout={() => this.props.onSignout()} reset={() => this.resetState()} formvalid>
                                        <h3>Do you want to sign out?</h3>
                                    </ModalUI>
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Menu.Item>
                </Menu>

            </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        roleId: state.auth.roleId,
        accountEmail: state.auth.email,
        isAuthenticated: state.auth.token !== null,
        authRedirectPath: state.auth.authRedirectPath,
        accounts: state.staffTable.accounts,
        currentUser: state.staffTable.currentUser
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onSignout: () => dispatch(actions.logout()),
        onAddAccount: newAccount => dispatch(actions.addAccount(newAccount)),
        onUpdateUserInfo: updatedUser => dispatch(actions.updateUserPartial(updatedUser)),
        onSearchChange: event => dispatch(actions.setSearchField(event.target.value))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Menubar);
