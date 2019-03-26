import React from "react";
import { Form, Input, Select, Message } from "semantic-ui-react";

const AddAccount = props => {
    const roleOptions = [
        { key: 'a', text: 'Admin', value: '1' },
        { key: 'm', text: 'Member', value: '2' }
    ];
    
    return (
        <div>
            <Form>
                <Form.Group widths="equal">
                    <Form.Field
                        control={Input}
                        label="Email"
                        name="email"
                        type="email"
                        placeholder="Email"
                        onChange={props.onFormChange}
                    />
                    <Form.Field
                        control={Input}
                        label="Password"
                        name='password'
                        type="password"
                        placeholder="Password"
                        onChange={props.onFormChange}
                    />
                    <Form.Field
                        control={Select}
                        label="Role"
                        name='roleId'
                        options={roleOptions}
                        placeholder="Role Name"
                        onChange={props.onFormChange}
                    />
                </Form.Group>
                {props.formControls.showFormNotice && 
                    <Form.Group widths="equal">
                        <Form.Field>
                            { !props.formControls.email.valid && <Message size="small" negative>{props.formControls.email.error}</Message> }
                            {props.formControls.duplicatedEmail && <Message size="small" negative >Email already registered</Message>}
                        </Form.Field>
                        <Form.Field>
                            { !props.formControls.password.valid && <Message size="small" negative>{props.formControls.password.error}</Message>}
                        </Form.Field>
                        <Form.Field>
                            {!props.formControls.roleId.value && <Message size="small" negative>{props.formControls.roleId.error}</Message>}
                        </Form.Field>
                    </Form.Group>}
            </Form>
        </div>
    );
};


export default AddAccount;
