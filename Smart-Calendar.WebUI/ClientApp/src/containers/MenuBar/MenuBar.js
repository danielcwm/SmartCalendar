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
import axios from 'axios';


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
        leaves: null,
        user: '',
        newleaves: null
    }
    
    componentDidMount() {

        this.props.onGetUser(this.props.accountId);

        axios
            .get("https://localhost:44314/api/calendar/LeaveRequest")
            .then(response => {
                if (this.props.roleId === '1') {
                    this.setState({ leaves: response.data },
                        () => { console.log(this.state.leaves); });
                }
                else {
                    var Allleaves = response.data;
                    var userleaves = Allleaves.filter(leave => leave.userId === this.props.currentUser.userId);
                    console.log(Allleaves, userleaves);
                    this.setState({ leaves: userleaves },
                        () => { console.log(this.state.leaves); });
                }
            })
            .catch(error => {
                console.log(error);
            });
    }

    updateLeaveInfo = (updatedleaves) => {
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
                    this.setState({ leaves: response.data.value });
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
       
        axios({
            method: 'post',
            url: 'https://localhost:44314/api/Calendar/LeaveRequest',
            data: value
        }).then(res => {
            //debugger
            if(this.props.roleId === '1') {
                console.log(res.data.value);
                //this.setState({ leaves: res.data.value });
            }
            else {
                var Allleaves = res.data.value;
            var userleaves = Allleaves.filter(leave => leave.userId === this.props.currentUser.userId);
            console.log(userleaves);
            this.setState({ leaves: userleaves });
            }
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
        //debugger
        //let user = '';
        const today = moment().format("DD MMMM YYYY, dddd");
        const currentWeek = moment().weeks();
        let isDisplay = this.props.roleId === "1";
        let addAccountValid = this.state.email.value && this.state.password.value && this.state.roleId.value &&
            this.state.email.valid && this.state.password.valid && !this.state.duplicatedEmail;
        let accountSettingValid = this.state.updatedUser.firstName && this.state.updatedUser.lastName;
        //if (isDisplay) { user = 'Admin'}

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
                    </Menu.Item>
                    <Menu.Item position="right">
                        <Input
                            icon="users"
                            iconPosition="left"
                            placeholder="Search Staff..."
                        />
                    </Menu.Item>
                    <Menu.Item>
                            {isDisplay && <ModalUI icon="add user" circular inverted header="Add Account" addAccount={this.addAccount} formvalid={addAccountValid} showNotice={this.showNotice} reset={this.resetState}>
                                <AddAccount onFormChange={this.handleFormChange} formControls={this.state} />
                            </ModalUI>
                            }
                        <ModalUI icon="male" inverted circular header="Leave Request List"
                            updateLeaveInfo={this.handleupdateleave} reset={() => null} formvalid>
                            <LeaveRequests leaves={this.state.leaves}
                                dltleave={this.deleteLeaveInfo}
                                newleavedata={this.handlenewleavedata}
                                updateleavest={this.updateLeaveInfo}
                                roleId={this.props.roleId}
                                currentuser={this.props.currentUser}
                                />
                            </ModalUI>

                        <Dropdown trigger={<Button icon="settings" inverted circular size="tiny" />} floating icon={null}>
                            <Dropdown.Menu style={{ left: "auto", right: 0, fontSize: "1.3em" }}>
                                <Dropdown.Header icon="user" content={this.props.accountEmail} />
                                <Dropdown.Divider />
                                <Dropdown.Item>
                                    <ModalUI trigger="category" header="Personal Profile" category="Profile" reset={() => null}>
                                        <EditProfile />
                                    </ModalUI>
                                </Dropdown.Item>
                                <Dropdown.Item>
                                    <ModalUI trigger="category" header="Account Settings" category="Account" accountSettings={() => this.props.onUpdateUserInfo(this.state.updatedUser)} formvalid={accountSettingValid} showNotice={this.showNotice} reset={this.resetState}>
                                        <AccountSettings currentUser={this.props.currentUser} accountEmail={this.props.accountEmail} getUpdatedUser={this.getUpdatedUser} showFormNotice={this.state.showFormNotice} />
                                    </ModalUI>
                                </Dropdown.Item>
                                <Dropdown.Item>
                                    <ModalUI trigger="category" header="Sign Out" category="Sign Out" signout={() => this.props.onSignout()} reset={() => null} formvalid>
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
