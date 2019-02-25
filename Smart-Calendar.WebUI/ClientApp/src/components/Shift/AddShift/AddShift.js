import React from "react";
import { Form, Select, Input } from "semantic-ui-react";


const AddShift = props => {
    const genderOptions = [
        { key: 'm', text: 'Male', value: 'm' },
        { key: 'f', text: 'Female', value: 'f' }
    ];
    const deptOptions = [
        { key: 'it', text: 'IT', value: '1' },
        { key: 'marketing', text: 'Marketing', value: '2' },
        { key: 'accounting', text: 'Accounting', value: '3' }
    ];
    const posOptions = [
        { key: 'manager', text: 'Manager', value: '1' },
        { key: 'lead', text: 'Lead', value: '2' },
        { key: 'member', text: 'Member', value: '3' }
    ];
    return (
        <div>
            <Form>
                <Form.Group widths="equal">
                    <Form.Field
                        control={Select}
                        name="selectedAccountId"
                        label="Staff Email"
                        options={props.accounts.map(acc => ({ key: acc.accountId, text: acc.email, value: acc.accountId }))}
                        placeholder="Select a staff"
                        onChange={props.onFormChange}
                    />
                    <Form.Field
                        control={Input}
                        name="firstName"
                        label="First name"
                        placeholder="First Name"
                        onChange={props.onFormChange}
                    />
                    <Form.Field
                        control={Input}
                        name="lastName"
                        label="Last name"
                        placeholder="Last Name"
                        onChange={props.onFormChange}
                    />
                </Form.Group>
                <Form.Group widths="equal">
                    <Form.Field
                        control={Select}
                        name="selectedGender"
                        label="Gender"
                        options={genderOptions}
                        placeholder="Gender"
                        onChange={props.onFormChange}
                    />
                    <Form.Field
                        control={Select}
                        name="selectedDept"
                        label="Department"
                        options={deptOptions}
                        placeholder="Department Name"
                        onChange={props.onFormChange}
                    />
                    <Form.Field
                        control={Select}
                        name="selectedPos"
                        label="Position"
                        options={posOptions}
                        placeholder="Position Name"
                        onChange={props.onFormChange}
                    />
                </Form.Group>
                
            </Form>
        </div>
    );
};

export default AddShift;
