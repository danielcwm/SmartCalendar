import React, { Component } from "react";
import moment from "moment";
import { Menu, Icon, Header, Input, Button } from "semantic-ui-react";
import ModalUI from "../../components/UI/ModalUI";
import DropdownUI from "../../components/UI/DropdownUI";
import AddStaff from "../Profile/AddStaff";
import EditProfile from "../Profile/EditProfile";
import AccountSettings from "../Profile/AccountSettings";
import LeaveRequests from "../LeaveRequests/LeaveRequests";
import axios from "axios";


export default class Menubar extends Component {
    
    state = {
        email: '',
        password: '',
        role: '',
        emailerror: '',
        pwderror: '',
        roleerror: '',
        formvalid: false,
        leaves: null,
        user: 'Admin',
        newleaves:null
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

    validateForm = () => {

        let formisvalid = false;
        let error, perror, rolemsg;
        let emailflg = true;
        let pwdflg = true;
        let roleflg = true;
        error = '';
        perror = '';
        rolemsg = '';
        var email = this.state.email;
        var pwd = this.state.password;
        var role = this.state.role;
        debugger
        if (!email) {
            emailflg = false;
            error = 'Please Enter Valid Email-ID';
        }
        else {
            var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (!pattern.test(email)) {
                emailflg = false;
                error = "*Please enter valid email-ID.";
            }
        }
        if (!pwd) {
            pwdflg = false;
            perror = 'Please Enter Password';
        }
        if (!role) {
            roleflg = false;
            rolemsg = 'Please Select Role';
        }
        if (emailflg && pwdflg && roleflg) { formisvalid = true; }
        else { formisvalid = false; }
        this.setState({
            emailerror: error,
            pwderror: perror,
            roleerror: rolemsg,
            formvalid: formisvalid
        });
        return formisvalid;
    }

    render() {
        const today = moment().format("DD MMMM YYYY, dddd");
        const currentWeek = moment().weeks();
        return (
            <Menu secondary>
                <Menu.Item>
                    <Header as="h1" size="large">
                        <Icon name="calendar alternate outline" />
                        <Header.Content>
                            Smart Calendar
              <Header.Subheader>
                                The Next Generation HR Management System
              </Header.Subheader>
                        </Header.Content>
                    </Header>
                </Menu.Item>
                <Menu.Item style={{ margin: "auto" }}>
                    <h3>
                        Current Week: {currentWeek} <br />
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