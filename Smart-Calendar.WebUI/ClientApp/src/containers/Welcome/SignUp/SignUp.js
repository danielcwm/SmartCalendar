import React, { Component } from "react";
import { Button, Modal, Form } from 'semantic-ui-react';
import axios from 'axios';


class SignUp extends Component {
  constructor(props){
    super(props);
    this.state={
        modalOpen: false,
        email: '',
        password: ''
    };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleloginopen = this.handleloginopen.bind(this);
  }
   // state = { modalOpen: false }

   handleOpen = () => {
     //this.setState({ modalOpen: true });
     this.props.signup(true);
    }
  
  handleClose = () => {
   // this.setState({ modalOpen: false });
      let signupdata = {
          email: this.state.email,
          password: this.state.password,
          roleId: 1
      }
      console.log(signupdata);
      axios({
          method: 'post',
          url: 'https://localhost:44314/api/Account/Register',
          data: signupdata
      }).then(function (res) {
          console.log("Added");
          console.log(res);
      });

   this.props.signup(false);
  }

  handleloginopen = () => {
    this.props.signup(false);
    this.props.login(true);
    }
    handleemail = (e) => {
        this.setState({
            email: e.target.value
        });
    }
    handlepassword = (e) => {
        this.setState({
            password: e.target.value
        });
    }
  render() {
    return (
      <div>
        <Modal
        trigger={<Button inverted color='blue' onClick={this.handleOpen}>Sign Up</Button>}
        open={this.props.signupstate}
        onClose={this.handleClose}
        size='small' >
        <Modal.Content>
        <Form>
        <Form.Field>
            <input placeholder='First Name' />
        </Form.Field>
        <Form.Field>
        <input placeholder='Last Name' />
        </Form.Field>
        <Form.Field>
        <input type='email' placeholder='Email Address' onChange={this.handleemail}/>
        </Form.Field>
        <Form.Field>
        <input type='password' placeholder='Passowrd' onChange={this.handlepassword} />
        </Form.Field>
        <Form.Field>
        <input type = 'password' placeholder='Confirm Passowrd' />
        </Form.Field>
        <Form.Field>
        <Button onClick={this.handleClose} inverted type="submit" className="fluid ui blue button">
            Sign Up</Button>
        </Form.Field>
        <Form.Field className='center'>
        <p>Already have an Account?<a onClick= {this.handleloginopen}>LogIn</a></p>
        </Form.Field>
        </Form>
        </Modal.Content>
        <Modal.Actions>
         
        </Modal.Actions>
      </Modal>
      </div>
    );
  }
}

export default SignUp;