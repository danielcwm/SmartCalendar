import React, { Component } from "react";
import { Table, Message } from "semantic-ui-react";
import LeaveTableRow from "./LeaveTableRow";
import ModalUI from "../../components/UI/ModalUI";
import ApplyLeave from "./ApplyLeave";

class LeaveRequests extends Component {

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.leaves !== prevState.leaves) {
            return { leaves: nextProps.leaves };
        } else {
            return null;
        }
    }

    state = {
        leavetype: 1,
        startDate: new Date(),
        endDate: new Date(),
        updatedLeaveData: [],
        leaves:this.props.leaves
    };

    onStDateChange = (value) => {
        this.setState({ startDate: value });
    }

    onEndDateChange = (value) => {
        this.setState({ endDate: value });
    }

    onTypeChange = (value) => {
        this.setState({ leavetype: value });
    }

    addLeaveInfo = () => {
        let leaveData = {
            userId: this.props.currentUser.userId,
            startDate: this.state.startDate,
            endDate: this.state.endDate,
            isApproved: "Pending",
            leaveCategoryId: this.state.leavetype
        };
        this.props.addNewLeave(leaveData);
    }

    updateLeaveInfo = (updatedRow) => {
        let copyLeaveData = [...this.state.updatedLeaveData];
        if (copyLeaveData.length === 0 || copyLeaveData.filter(leave => leave.leaveRequestId === updatedRow.leaveRequestId).length === 0) {
            copyLeaveData.push(updatedRow);
        }
        let selectedRow = copyLeaveData.find(leave => leave.leaveRequestId === updatedRow.leaveRequestId);
        selectedRow.isApproved = updatedRow.isApproved;
        this.setState({ updatedLeaveData: copyLeaveData }, () => {
            this.props.updateLeaveInfo(this.state.updatedLeaveData);
        });
    }

    render() {
        return (
            <div>
                {this.props.currentUser ?
                    <Table celled striped singleLine size="large" color="grey">
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>
                                    Name
                            </Table.HeaderCell>
                                <Table.HeaderCell>
                                    Department
                            </Table.HeaderCell>
                                <Table.HeaderCell>
                                    Leave Type
                            </Table.HeaderCell>
                                <Table.HeaderCell>
                                    Start Date
                            </Table.HeaderCell>
                                <Table.HeaderCell>
                                    End Date
                            </Table.HeaderCell>
                                <Table.HeaderCell>
                                    No.of Days
                            </Table.HeaderCell>
                                <Table.HeaderCell>
                                    Status
                            </Table.HeaderCell>
                                {this.props.isDisplay && <Table.HeaderCell>Delete</Table.HeaderCell>}
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            {this.state.leaves.map(leave =>
                                (<LeaveTableRow
                                    key={leave.leaveRequestId}
                                    leaveData={leave}
                                    deleteLeaveInfo={() => this.props.deleteLeave(leave.leaveRequestId)}
                                    updateLeaveInfo={this.updateLeaveInfo}
                                    isDisplay={this.props.isDisplay}
                                />))}
                        </Table.Body>

                        <Table.Footer fullWidth>
                            <Table.Row>
                                <Table.HeaderCell colSpan="8">
                                    <ModalUI modalSize="small" header="Apply Leave" primary color="blue"
                                        formvalid
                                        category="Apply New Leave"
                                        floated="right"
                                        addLeaveInfo={this.addLeaveInfo}
                                        reset={() => null}
                                    >
                                        <ApplyLeave
                                            onTypeChange={this.onTypeChange}
                                            onStDateChange={this.onStDateChange}
                                            onEndDateChange={this.onEndDateChange}
                                            userinfo={this.props.currentuser}
                                        />
                                    </ModalUI>
                                </Table.HeaderCell>
                            </Table.Row>
                        </Table.Footer>
                    </Table> :
                    <Message warning size="big">
                        <Message.Header>Account not activated!</Message.Header>
                        <p>Please inform admin to activate your account, then try again.</p>
                    </Message>
                }
            </div>
        );
    }
}

export default LeaveRequests;
