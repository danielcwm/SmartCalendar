import React, { Component } from "react";
import { Form, Input, Header, Message } from "semantic-ui-react";

class AccountSettings extends Component {

    state = {
        userId: this.props.currentUser.userId,
        accountId: this.props.currentUser.accountId,
        firstName: this.props.currentUser.firstName,
        lastName: this.props.currentUser.lastName,
        gender: this.props.currentUser.gender,
        departmentId: this.props.currentUser.departmentId,
        positionId: this.props.currentUser.positionId
    }

    onFormChange = (e, { name, value }) => {
        this.setState({ [name]: value }, () => this.props.getUpdatedUser(this.state));
    };

    render() {
        return (
            <div>
                <Header>Your Email: {this.props.accountEmail}</Header>
                {this.props.currentUser.userId ?
                    <Form>
                        <Form.Group widths="equal">
                            <Form.Field
                                control={Input}
                                label="First name"
                                name="firstName"
                                value={this.state.firstName}
                                onChange={this.onFormChange}
                            />
                            <Form.Field
                                control={Input}
                                label="Last name"
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
                    </Form> :
                    <Message warning size="big">
                        <Message.Header>Account not activated!</Message.Header>
                        <p>Please inform admin to activate your account, then try again.</p>
                    </Message>
                }
            </div>
        );
    }
}

export default AccountSettings;
