import React, { Component } from "react";
import { Table, Loader, ButtonGroup} from "semantic-ui-react";
import { connect } from "react-redux";
import TableRow from "../../components/Table/TableRow/TableRow";
import ModalUI from "../../components/UI/ModalUI";
import AddUserInfo from "../../components/UserInfo/AddUserInfo/AddUserInfo";
import * as actions from "../../store/actions/index";
import { checkValidity } from "../../shared/validation";

class StaffTable extends Component {
    state = {
        selectedAccountId: {
            value: null,
            validation: null,
            error: "Please select an user email",
            valid: false
        },
        firstName: {
            value: null,
            validation: {
                required: true
            },
            error: "Please enter first name",
            valid: false
        },
        lastName: {
            value: null,
            validation: {
                required: true
            },
            error: "Please enter last name",
            valid: false
        },
        selectedGender: {
            value: null,
            validation: null,
            error: "Please select gender",
            valid: false
        },
        selectedDept: {
            value: null,
            validation: null,
            error: "Please select Department",
            valid: false
        },
        selectedPos: {
            value: null,
            validation: null,
            error: "Please select position",
            valid: false
        },
        updatedUser: {
            firstName: null,
            lastName: null
        },
        showFormNotice: false
    };

    componentDidMount() {
        this.props.onInitTable();
    }

    onFormChange = (e, { name, value }) => {
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
        });
    };

    showNotice = () => {
        this.setState({ showFormNotice: true });
    }

    addUserInfo = () => {
        const userInfo = {
            accountId: this.state.selectedAccountId.value,
            firstName: this.state.firstName.value,
            lastName: this.state.lastName.value,
            gender: this.state.selectedGender.value,
            departmentId: this.state.selectedDept.value,
            positionId: this.state.selectedPos.value
        };
        this.props.onAddUserInfo(userInfo);
    }

    resetUserInfo = () => {
        this.setState({
            selectedAccountId: {
                value: null,
                validation: null,
                error: "Please select an user email",
                valid: false
            },
            firstName: {
                value: null,
                validation: {
                    required: true
                },
                error: "Please enter first name",
                valid: false
            },
            lastName: {
                value: null,
                validation: {
                    required: true
                },
                error: "Please enter last name",
                valid: false
            },
            selectedGender: {
                value: null,
                validation: null,
                error: "Please select gender",
                valid: false
            },
            selectedDept: {
                value: null,
                validation: null,
                error: "Please select Department",
                valid: false
            },
            selectedPos: {
                value: null,
                validation: null,
                error: "Please select position",
                valid: false
            },
            updatedUser: {
                firstName: null,
                lastName: null
            },
            showFormNotice: false
        });
    }

    getUpdatedUser = (updatedUser) => {
        this.setState({ updatedUser: updatedUser });
    }

    render() {
        let table = <Loader active inline="centered" size="massive" />;
        let isDisplay = this.props.roleId === "1";
        let addUserValid = this.state.selectedAccountId.value && this.state.selectedGender.value &&
            this.state.firstName.valid && this.state.lastName.valid &&
            this.state.selectedDept.value && this.state.selectedPos.value;
        let editUserValid = this.state.updatedUser.firstName && this.state.updatedUser.lastName;

        if (this.props.users && this.props.accounts) {
            const availableAccounts = this.props.accounts.filter(account => this.props.users.every(user => user.accountId !== account.accountId));

            table = (
                <React.Fragment>

                    <Table celled striped size="large" >
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
                                    <h3>Email</h3>
                                </Table.HeaderCell>
                                <Table.HeaderCell>
                                    <h3>Shift Info</h3>
                                </Table.HeaderCell>
                                {isDisplay && <Table.HeaderCell>
                                    <h3>Action
                                   <ButtonGroup>
                                            <ModalUI basic icon="add" header="Add User Info" addUserInfo={this.addUserInfo} formvalid={addUserValid} showNotice={this.showNotice} reset={this.resetUserInfo}>
                                                <AddUserInfo accounts={availableAccounts} onFormChange={this.onFormChange} formControls={this.state} />
                                            </ModalUI>
                                        </ButtonGroup>
                                    </h3>
                                </Table.HeaderCell>}
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            {this.props.users.map(user => (
                                <TableRow
                                    key={user.id}
                                    user={user}
                                    isDisplay={isDisplay}
                                    deleteUserInfo={() => this.props.onDeleteUserInfo(user.id)}
                                    onFormChange={this.onFormChange}
                                    getUpdatedUser={this.getUpdatedUser}
                                    editUserValid={editUserValid}
                                    showNotice={this.showNotice}
                                    showFormNotice={this.state.showFormNotice}
                                    editUserInfo={() => this.props.onUpdateUserInfo(this.state.updatedUser)}
                                    reset={this.resetUserInfo}
                                />
                            ))}
                        </Table.Body>
                    </Table>
                </React.Fragment>
            );
        }

        return <div>{table}</div>;
    }
}

const mapStateToProps = state => {
    return {
        users: state.staffTable.users,
        accounts: state.staffTable.accounts,
        roleId: state.auth.roleId,
        accountId: state.auth.accountId
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onInitTable: () => dispatch(actions.initTable()),
        onDeleteUserInfo: id => dispatch(actions.deleteUserInfo(id)),
        onAddUserInfo: userInfo => dispatch(actions.addUserInfo(userInfo)),
        onUpdateUserInfo: updatedUser => dispatch(actions.updateUserInfo(updatedUser))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StaffTable);