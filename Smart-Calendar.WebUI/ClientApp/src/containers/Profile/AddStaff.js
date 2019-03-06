import React, { Component } from "react";
import { Form, Input, Select } from "semantic-ui-react";
import './AddStaff.css';
const roleOptions = [
    { key: 'a', text: 'Admin', value: '1' },
    { key: 'm', text: 'Member', value: '2' }
]

class AddStaff extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <Form>
                    <Form.Group widths="equal">
                        <Form.Field
                            control={Input}

                            label="Email"
                            name="email"
                            placeholder="Email"
                            onChange={this.props.onFormChange}
                        />
                        <Form.Field
                            control={Input}
                            label="Password"
                            type="password"
                            name='password'
                            placeholder="Password"
                            onChange={this.props.onFormChange} />

                        <Form.Field
                            control={Select}
                            label="Role"
                            name='role'
                            options={roleOptions}
                            placeholder="Role Name"
                            onChange={this.props.onFormChange}
                        />
                    </Form.Group>
                    <Form.Group widths="equal">
                        <Form.Field className='errorMsg'>
                            {this.props.emailerror}
                        </Form.Field>
                        <Form.Field className='errorMsg'>
                            {this.props.pwderror}
                        </Form.Field>
                        <Form.Field className='errorMsg'>
                            {this.props.roleerror}
                        </Form.Field>
                        </Form.Group>
                </Form>
            </div>
        );
    }
}

export default AddStaff;
