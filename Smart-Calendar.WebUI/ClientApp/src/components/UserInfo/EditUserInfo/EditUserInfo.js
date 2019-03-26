import React, { Component } from "react";
import { Form, Select, Input, Message } from "semantic-ui-react";
import Shift from "../../Shift/Shift";


class EditUserInfo extends Component {
    state = {
        userId: this.props.user.id,
        accountId: this.props.user.accountId,
        firstName: this.props.user.firstName,
        lastName: this.props.user.lastName,
        gender: this.props.user.gender,
        departmentId: this.props.user.departmentId,
        positionId: this.props.user.positionId,
        userShifts: this.props.user.userShifts
    }

    addShift = (newShift) => {
        this.setState({ userShifts: [...this.state.userShifts, newShift] }, () => this.props.getUpdatedUser(this.state));
    }

    removeShift = (day) => {
        let newShifts = this.state.userShifts.filter(shift => shift.day !== day);
        this.setState({ userShifts: newShifts }, () => this.props.getUpdatedUser(this.state));
    }

    onFormChange = (e, { name, value }) => {
        this.setState({ [name]: value }, ()=> this.props.getUpdatedUser(this.state));
    };

    render() {
        const deptOptions = [
            { key: 'it', text: 'IT', value: 1 },
            { key: 'marketing', text: 'Marketing', value: 2 },
            { key: 'accounting', text: 'Accounting', value: 3 }
        ];
        const posOptions = [
            { key: 'manager', text: 'Manager', value: 1 },
            { key: 'lead', text: 'Lead', value: 2 },
            { key: 'member', text: 'Member', value: 3 }
        ];
        return (
            
            <div>
                <Form>
                    <Form.Group widths="equal">
                        <Form.Field
                            control={Input}
                            label='First Name'
                            name="firstName"
                            value={this.state.firstName}
                            onChange={this.onFormChange}
                        />
                        <Form.Field
                            control={Input}
                            label='Last Name'
                            name="lastName"
                            value={this.state.lastName}
                            onChange={this.onFormChange}
                        />
                    </Form.Group>
                    {this.props.showFormNotice &&
                        <Form.Group widths="equal">
                            <Form.Field>
                                {!this.state.firstName && <Message size="small" negative>Please enter first name</Message>}
                            </Form.Field>
                            <Form.Field>
                                {!this.state.lastName && <Message size="small" negative>Please enter last name</Message>}
                            </Form.Field>
                        </Form.Group>
                    }
                    <Form.Group widths="equal">
                        <Form.Field
                            control={Select}
                            name="departmentId"
                            label="Department"
                            options={deptOptions}
                            defaultValue={this.state.departmentId}
                            onChange={this.onFormChange}
                        />
                        <Form.Field
                            control={Select}
                            name="positionId"
                            label="Position"
                            options={posOptions}
                            defaultValue={this.state.positionId}
                            onChange={this.onFormChange}
                        />
                    </Form.Group>
                    <h4>User Shifts</h4>
                    <Shift editable userId={this.props.user.id} userShifts={this.state.userShifts} addShift={this.addShift} removeShift={this.removeShift}/>
                </Form>
            </div>
        );
    }
}


export default EditUserInfo;
