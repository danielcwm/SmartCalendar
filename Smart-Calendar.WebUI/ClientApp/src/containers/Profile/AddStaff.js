import React, { Component } from "react";
import { Form, Input, Select } from "semantic-ui-react";

class AddStaff extends Component {
    render() {
        return (
            <div>
                <Form>
                    <Form.Group widths="equal">
                        <Form.Field control={Input} label="Email" placeholder="Email" />
                        <Form.Field
                            control={Input}
                            label="Password"
                            placeholder="Password"
                        />
                    </Form.Group>
                    <Form.Group widths="equal">
                        <Form.Field
                            control={Input}
                            label="First name"
                            placeholder="First Name"
                        />
                        <Form.Field
                            control={Input}
                            label="Last name"
                            placeholder="Last Name"
                        />
                        <Form.Field
                            control={Select}
                            label="Gender"
                            // options={Male, Female}
                            placeholder="Gender"
                        />
                    </Form.Group>
                    <Form.Group widths="equal">
                        <Form.Field
                            control={Select}
                            label="Role"
                            // options={Admin or General Staff}
                            placeholder="Role Name"
                        />
                        <Form.Field
                            control={Select}
                            label="Department"
                            //options={Departments}
                            placeholder="Department Name"
                        />
                        <Form.Field
                            control={Select}
                            label="Position"
                            // options={Positions} this option list is based on the selected department
                            placeholder="Position Name"
                        />
                    </Form.Group>
                </Form>
            </div>
        );
    }
}

export default AddStaff;
