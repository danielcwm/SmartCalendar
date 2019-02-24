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
    
    handleRole = (e, { value}) => {
        console.log("select role");
        //this.setstate({
        //    role: value
        //});
    }
    handleEmail = (e) => {
        this.setState({
            email: e.target.value
        }, () => { console.log(this.state.email); });
    }
    handlePassword = (e) => {
        this.setState({
            password: e.target.value
        }, () => { console.log(this.state.password); });
    }
    handleNumber = (e) => {
        this.setState({
            phoneNumber: e.target.value
        }, () => { console.log(this.state.phoneNumber); });
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
                label="Role"
                placeholder="Select Role"
                options={roles}
                onClick={this.handleRole.bind(this)}
            />
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Field
                        control={Input}
                        type='email'
                        label="Email"
                        placeholder="Email"
                        onChange={this.handleEmail}
            />
            <Form.Field
                        control={Input}
                        type='password'
                        label="Password"
                        placeholder="Password"
                        onChange={this.handlePassword}
            />
            <Form.Field
                        control={Input}
                        label="Phone Number"
                        placeholder="Phone Number"
                        onChange={this.handleNumber}
            />
          </Form.Group>
        </Form>
      </div>
    );
  }
}

export default AccountSettings;
