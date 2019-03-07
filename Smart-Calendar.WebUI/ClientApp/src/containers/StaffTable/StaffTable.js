import React, { Component } from "react";
import { Table, Loader, ButtonGroup } from "semantic-ui-react";
import TableRow from "../../components/Table/TableRow/TableRow";
import ModalUI from "../../components/UI/ModalUI";
import AddUserInfo from "../../components/UserInfo/AddUserInfo/AddUserInfo";
import axios from "axios";

class StaffTable extends Component {
    state = {
        users: null,
        accounts: null,
        selectedAccountId: null,
        firstName: "",
        lastName: "",
        selectedGender: "",
        selectedDept: "",
        selectedPos: "",
        updatedUser: null
    };

    componentDidMount() {
        axios
            .get("https://localhost:44314/api/calendar/user")
            .then(response => {
                this.setState({ users: response.data });
            })
            .catch(error => {
                console.log(error);
            });
        axios.get("https://localhost:44314/api/calendar/account")
            .then(response => {
                this.setState({ accounts: response.data });
            }).catch(error => {
                console.log(error);
            });
    }

    onFormChange = (e, { name, value }) => {
        this.setState({ [name]: value });
    };

    addUserInfo = () => {
        const userInfo = {
            accountId: this.state.selectedAccountId,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            gender: this.state.selectedGender,
            departmentId: this.state.selectedDept,
            positionId: this.state.selectedPos
        };
        axios.post("https://localhost:44314/api/calendar/user", userInfo).then(response => {
            this.setState({ users: response.data.value });
        }).catch(error => {
            console.log(error);
        });
    }

    deleteUserInfo = id => {
        axios
            .delete("https://localhost:44314/api/calendar/user/" + id)
            .then(response => {
                let newUsers = this.state.users.filter(user => user.id !== id);
                this.setState({ users: newUsers });
            })
            .catch(error => {
                console.log(error);
            });
    };

    getUpdatedUser = (updatedUser) => {
        this.setState({ updatedUser: updatedUser });
    }

    editUserInfo = (updatedUser) => {
        axios
            .put("https://localhost:44314/api/calendar/user/" + updatedUser.userId, updatedUser)
            .then(response => {
                this.setState({ users: response.data.value });
            }).catch(error => {
                console.log(error);
            });

        axios
            .delete("https://localhost:44314/api/calendar/userShifts/" + updatedUser.userId)
            .then(response => {
                axios.post("https://localhost:44314/api/calendar/userShifts/" + updatedUser.userId, updatedUser.userShifts)
                    .then(response => {
                    //console.log(response.data.value);
                    this.setState({ users: response.data.value });
                }).catch(error => {
                    console.log(error);
                });
            }).catch(error => {
                console.log(error);
            });
    }

    render() {
        let table = <Loader active inline="centered" size="massive" />;

        if (this.state.users && this.state.accounts) {
            const availableAccounts = this.state.accounts.filter(account => this.state.users.every(user => user.accountId !== account.accountId));

            table = (
                <Table celled striped size="large" color="grey">
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>
                                <h3>First Name</h3>
                            </Table.HeaderCell>
                            <Table.HeaderCell>
                                <h3>Last Name</h3>
                            </Table.HeaderCell>
                            <Table.HeaderCell>
                                <h3>Gender</h3>
                            </Table.HeaderCell>
                            <Table.HeaderCell>
                                <h3>Department</h3>
                            </Table.HeaderCell>
                            <Table.HeaderCell>
                                <h3>Position</h3>
                            </Table.HeaderCell>
                            <Table.HeaderCell>
                                <h3>Shift Info</h3>
                            </Table.HeaderCell>
                            <Table.HeaderCell>
                                <h3>Action
                                   <ButtonGroup>
                                        <ModalUI icon="add" header="Add User Info" addUserInfo={this.addUserInfo} formvalid>
                                            <AddUserInfo accounts={availableAccounts} onFormChange={this.onFormChange} />
                                        </ModalUI>
                                    </ButtonGroup>
                                </h3>
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {this.state.users.map(user => (
                            <TableRow
                                showForm={this.state.showForm}
                                key={user.id}
                                user={user}
                                deleteUserInfo={() => this.deleteUserInfo(user.id)}
                                onFormChange={this.onFormChange}
                                getUpdatedUser={this.getUpdatedUser}
                                editUserInfo={() => this.editUserInfo(this.state.updatedUser)}
                            />
                        ))}
                    </Table.Body>

                    {/* <Table.Footer>
            <Table.Row>
              <Table.HeaderCell>Total</Table.HeaderCell>
              <Table.HeaderCell>100 Staffs</Table.HeaderCell>
            </Table.Row>
              </Table.Footer> */}
                </Table>
            );
        }

        return <div>{table}</div>;
    }
}

export default StaffTable;