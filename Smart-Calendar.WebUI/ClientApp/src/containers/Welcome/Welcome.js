import React, { Component } from "react";
import { Container,Menu,Grid,Image} from 'semantic-ui-react';
import SignUp from './SignUp/SignUp.js';
import LogIn from '../../components/LogIn/LogIn.js';
import banner from './images/banner.jpg'; 
import Footer from '../../components/Footer/Footer';
class Welcome extends Component {
    constructor(){
        super();
        this.state={
            showLoginForm : false,
            showSignUpForm: false
        }

        this.handleLogIn = this.handleLogIn.bind(this);
        this.handleSignUp = this.handleSignUp.bind(this);
    }
    handleLogIn(login){
        this.setState({
            showLoginForm: login
        });
    }
    handleSignUp(signin){
        this.setState({
            showSignUpForm: signin
        });
    }
  render() {
    return (
      <div>
          <Grid.Row>
            <Menu size='large'>
              <Container>
                <Menu.Item position='right'>
                 <LogIn signUp = {this.handleSignUp}
                 login = {this.handleLogIn} 
                 loginstate = {this.state.showLoginForm}/>

                <SignUp login = {this.handleLogIn}
                signup = {this.handleSignUp}
                signupstate = {this.state.showSignUpForm} />
                </Menu.Item>
               
              </Container>
            </Menu>
            </Grid.Row>
            <Grid.Row>
            <div className="tagline-holder">
            <h1>Welcome to Smart-Calender</h1>
            <h2>A Smart Employee Management System</h2>
            </div>
            </Grid.Row>
            <Grid.Row><Image src={banner} fluid /></Grid.Row>
            <Grid.Row>
                <Footer />
            </Grid.Row>
                  
      </div>
    );
  }
}

export default Welcome;
