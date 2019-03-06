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
    handleItemClick = () => { };


  handleChange = e => {
    e.preventDefault();
  };

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
                    formvalid={this.state.formvalid}>
                <AddStaff onFormChange={this.handleFormChange}
                emailerror={this.state.emailerror}
                pwderror={this.state.pwderror}
                roleerror={this.state.roleerror} />
                </ModalUI>
                <ModalUI icon="bell outline" header="Leave Request List">
                  <LeaveRequests />
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
