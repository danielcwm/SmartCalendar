import React, { Component
} from "react";
import { Form, Input, Select } from "semantic-ui-react";

const roles = [
    { key: 'a', text: 'Admin', value: '1'},
    { key: 'm', text: 'Member', value: '2' }
]
class AccountSettings extends Component {

    state = {
        email: '',
        password: '',
        role: '',
        phoneNumber:''
    }
    
    handleAccountInfo = (e, {name,value}) => {
        this.setState({
            [name]:value
        }, () => { console.log(this.state);});
    }
   
  render() {
    return (
      <div>
        <Form>
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
                name= "role"
                label="Role"
                placeholder="Select Role"
                options={roles}
                onChange={this.handleAccountInfo}
            />
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Field
                control={Input}
                type='email'
                label="Email"
                placeholder="Email"
                name="email"
                onChange={this.handleAccountInfo}
            />
            <Form.Field
                control={Input}
                type='password'
                label="Password"
                name="password"
                placeholder="Password"
                onChange={this.handleAccountInfo}
            />
            <Form.Field
                control={Input}
                label="Phone Number"
                name="phoneNumber"
                placeholder="Phone Number"
                onChange={this.handleAccountInfo}
            />
          </Form.Group>
        </Form>
      </div>
    );
  }
}

export default AccountSettings;
