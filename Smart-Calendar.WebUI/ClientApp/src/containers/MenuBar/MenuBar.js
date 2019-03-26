import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import moment from "moment";
import { Menu, Icon, Header, Input, Button, Dropdown } from "semantic-ui-react";
import ModalUI from "../../components/UI/ModalUI";
import AddAccount from "../../components/UserInfo/AddAccount/AddAccount";
import EditProfile from "../Profile/EditProfile";
import AccountSettings from "../Profile/AccountSettings";
import LeaveRequests from "../LeaveRequests/LeaveRequests";
import * as actions from "../../store/actions/index";
import { checkValidity } from "../../shared/validation";

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
        duplicatedEmail: false
    }
    handleItemClick = () => { };
    componentDidMount() {
        axios
            .get("https://localhost:44314/api/calendar/LeaveRequest")
            .then(response => {
                this.setState({ leaves: response.data }, () => { console.log(this.state.leaves);  });
            })
            .catch(error => {
                console.log(error);
            });
    }

    componentDidMount() {
        this.props.onGetUser(this.props.accountId);
    handleChange = e => {
        e.preventDefault();
    };
    handleFormChange = (e, { name, value }) => {
        this.setState({ [name]: value }, () => { console.log(this.state); });
    }
    updateLeaveInfo = (updatedleaves) => {
        //console.log(id);

        this.setState({ newleaves: updatedleaves });
        
    }
    handleupdateleave = () => {
        var leaves = this.state.newleaves;
        debugger
        console.log(leaves);
        
            axios
                .put("https://localhost:44314/api/calendar/LeaveRequest", leaves)
                .then(response => {
                    debugger
                    console.log(response.data.value);
                    this.setState({ leaves: response.data .value});
                    console.log("Updated");
                })
    }

    deleteLeaveInfo = (id) => {
        console.log(id);
        axios
            .delete("https://localhost:44314/api/calendar/LeaveRequest/" + id)
            .then(response => {
                let newUsers = this.state.leaves.filter(leave => leave.leaveRequestId !== id);
                this.setState({ leaves: newUsers });
                console.log("Leave Deleted");
            })
            .catch(error => {
                console.log(error);
            });
    }
    handlenewleavedata = (value) => {
        //debugger
        //console.log(value);
        axios({
            method: 'post',
            url: 'https://localhost:44314/api/Calendar/LeaveRequest',
            data: value
        }).then(res => {
            //debugger
            //console.log(res.data.value);
            this.setState({ leaves: res.data.value });
        });
      
    }


    addStaffInfo = (e) => {
        // e.preventDefault();
        let userInfo = {
            email: this.state.email,
            password: this.state.password,
            roleId: this.state.role
        }
        console.log(userInfo.email);
        axios({
            method: 'post',
            url: 'https://localhost:44314/api/Account/Register',
            data: userInfo
        }).then(function (res) {

            if (res.status === 200) {
                alert('Account Created');
            }
            else {
                alert('Account already Exists');
            }
            // debugger
            this.setState({
                email: '',
                password: '',
                role: ''
            });
        }.bind(this));
        //console.log("Staff info is added");
    }
    clearStaffInfo = () => {
        this.setState({
            email: '',
            password: '',
            role: '',
            emailerror: '',
            pwderror: '',
            roleerror: '',
            formvalid: false
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
            duplicatedEmail: false
        });
    }

    render() {
        const today = moment().format("DD MMMM YYYY, dddd");
        const currentWeek = moment().weeks();
        let isDisplay = this.props.roleId === "1";
        let addAccountValid = this.state.email.value && this.state.password.value && this.state.roleId.value &&
            this.state.email.valid && this.state.password.valid && !this.state.duplicatedEmail;
        let accountSettingValid = this.state.updatedUser.firstName && this.state.updatedUser.lastName;

        return (
            <React.Fragment>
                {!this.props.isAuthenticated && <Redirect to={this.props.authRedirectPath} />}
                <Menu secondary>
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

                <Menu inverted size="tiny" borderless>
                    <Menu.Item style={{ "fontSize": "1.3em" }}>
                        Current Week: {currentWeek}
                    </Menu.Item>
                    <Menu.Item style={{ "fontSize": "1.3em" }}>
                        {today}
                    </h3>
                </Menu.Item>
                <Menu.Item position="right">
                    <Menu compact secondary>
                        <Menu.Item>
                            <Input
                                icon="users"
                                iconPosition="left"
                                placeholder="Search Staff..."
                            />
                        </Menu.Item>
                        <Menu.Item>
                            <Button.Group>
                                <ModalUI icon="add user" header="Create New Account"
                                    addStaffInfo={this.addStaffInfo}
                                    validateForm={this.validateForm}
                                    clearStaffInfo={this.clearStaffInfo}
                                    >
                                    <AddStaff onFormChange={this.handleFormChange}
                                        emailerror={this.state.emailerror}
                                        pwderror={this.state.pwderror}
                                        roleerror={this.state.roleerror} />
                                </ModalUI>
                                <ModalUI icon="bell outline" header="Leave Request List"
                                    updateLeaveInfo={this.handleupdateleave} formvalid>
                                    <LeaveRequests leaves={this.state.leaves}
                                        dltleave={this.deleteLeaveInfo}
                                        newleavedata={this.handlenewleavedata}
                                        user={this.state.user}
                                        updateleavest={this.updateLeaveInfo}
                                        />
                                </ModalUI>
                                <DropdownUI
                                    icon="settings"
                                    headerIcon="user"
                                    content="Staff Name"
                                >
                                    <Button.Group vertical>
                                        <ModalUI header="Personal Profile" category="Profile">
                                            <EditProfile />
                                        </ModalUI>
                                        <ModalUI header="Account Settings" category="Account">
                                            <AccountSettings />
                                        </ModalUI>
                                        <ModalUI header="Signout Confirmation" category="Sign out">
                                            <h3>Do you want to sign out?</h3>
                                        </ModalUI>
                                    </Button.Group>
                                </DropdownUI>
                            </Button.Group>
                        </Menu.Item>
                    </Menu>
                </Menu.Item>
            </Menu>
        );
    }

}

const mapStateToProps = state => {
    return {
        roleId: state.auth.roleId,
        accountId: state.auth.accountId,
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
        onGetUser: id => dispatch(actions.getUserInfo(id)),
        onUpdateUserInfo: updatedUser => dispatch(actions.updateUserPartial(updatedUser))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Menubar);
