import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Menu, Header, Form, Input, Container, Divider, Loader, Message } from 'semantic-ui-react';
import ModalUI from "../../components/UI/ModalUI";
import Footer from '../../components/Footer/Footer';
import banner from "./images/banner.jpg";
import * as actions from "../../store/actions/index";
import { checkValidity } from "../../shared/validation";

class Welcome extends Component {
    state = {
        email: {
            value: null,
            validation: {
                required: true,
                isEmail: true
            },
            error: "Please enter a valid email",
            valid: false
        },
        password: {
            value: null,
            validation: {
                required: true,
                minLength: 4
            },
            error: "Password must be greater than or equal to 4 digits",
            valid: false
        },
        showFormNotice: false
    }

    handleFormChange = (e, { name, value }) => {
        this.setState({
            [name]: {
                ...this.state[name],
                value: value,
                valid: checkValidity(
                    value,
                    this.state[name].validation
                )
            },
            showFormNotice: false
        });
    }

    showNotice = () => {
        this.setState({ showFormNotice: true });
    }

    resetSignIn = () => {
        this.setState({
            email: {
                value: null,
                validation: {
                    required: true,
                    isEmail: true
                },
                error: "Please enter a valid email",
                valid: false
            },
            password: {
                value: null,
                validation: {
                    required: true,
                    minLength: 4
                },
                error: "Password must be greater than or equal to 4 digits",
                valid: false
            },
            showFormNotice: false
        });
    }

    render() {

        let form = (<React.Fragment>
            <Form>
                <Form.Field
                    control={Input}
                    name="email"
                    type="email"
                    label="Email"
                    placeholder="Email Address"
                    onChange={this.handleFormChange}
                />
                {this.state.showFormNotice && !this.state.email.valid && <Message size="small" negative>{this.state.email.error}</Message>}

                <Form.Field
                    control={Input}
                    type="password"
                    name="password"
                    label="Password"
                    placeholder="Password"
                    onChange={this.handleFormChange}
                />
                {this.state.showFormNotice && !this.state.password.valid && <Message size="small" negative>{this.state.password.error}</Message>}
            </Form>
            <div className="text center form-footer">
                <a>Forgot your Password?</a>
            </div>
        </React.Fragment>);

        let errorMessage = this.props.error &&
            <Message
                attached
                negative
                size="big"
                header="Credentials not valid"
            />;

        let formValid = this.state.email.valid && this.state.password.valid;

        return (
            <React.Fragment>
                {this.props.isAuthenticated && <Redirect to={this.props.authRedirectPath} />}
                <Menu fluid secondary>
                    <Menu.Item position="right">
                        <Header as="h1" size="large">
                            <Header.Content>
                                Welcome to Smart Calendar
                            <Header.Subheader>
                                    The Next Generation EMS
                            </Header.Subheader>
                            </Header.Content>
                        </Header>
                    </Menu.Item>
                    <Menu.Item position="right">
                        <ModalUI category="Sign In"
                            header="Sign In"
                            color="blue"
                            signin={() => this.props.onAuth(this.state.email.value, this.state.password.value)}
                            basic={false}
                            inverted
                            formvalid={formValid}
                            showNotice={this.showNotice}
                            reset={this.resetSignIn}
                        >
                            {form}
                        </ModalUI>
                    </Menu.Item>
                </Menu>

                {errorMessage}
                {this.props.loading ?
                    <Loader active inline="centered" size="massive" /> :
                    <ModalUI header="Sign In"
                        trigger="image"
                        image={banner}
                        signin={() => this.props.onAuth(this.state.email.value, this.state.password.value)}
                        formvalid={formValid}
                        showNotice={this.showNotice}
                        reset={this.resetSignIn}
                    >
                        {form}
                    </ModalUI>}
                <Divider hidden />
                <Container>
                    <Footer />
                </Container>
            </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        authRedirectPath: state.auth.authRedirectPath
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password) => dispatch(actions.auth(email, password))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Welcome);




