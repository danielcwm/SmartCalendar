import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Menu, Header, Icon, Form, Input, Container, Divider, Loader, Label, Message } from "semantic-ui-react";
import ModalUI from "../../components/UI/ModalUI";
import LandingFooter from "../../components/Footer/LandingFooter";
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
        showFormNotice: false,
        duplicatedEmail: false
    }

    componentDidMount() {
        this.props.onInitAccounts();
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
        }, () => {
            if (!this.props.accounts.every(account => account.email !== this.state.email.value)) {
                this.setState({ duplicatedEmail: true });
            } else {
                this.setState({ duplicatedEmail: false });
            }
        });
    }

    showNotice = () => {
        this.setState({ showFormNotice: true });
    }

    addAccount = () => {
        let newAccount = {
            email: this.state.email.value,
            password: this.state.password.value,
            roleId: 2
        };
        this.props.onAddAccount(newAccount);
    }

    resetState = () => {
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
            showFormNotice: false,
            duplicatedEmail: false
        });
    }

    render() {

        let regForm = (<React.Fragment>
            <Form>
                <Form.Field
                    control={Input}
                    type="email"
                    name="email"
                    label="Email"
                    icon="mail"
                    iconPosition='left'
                    placeholder="Email Address"
                    onChange={this.handleFormChange}
                />
                {this.state.showFormNotice && !this.state.email.valid && <Label basic color="red" pointing>{this.state.email.error}</Label>}
                {this.state.duplicatedEmail && <Label basic color="red" pointing>Email already registered</Label>}
                <Divider hidden />
                <Form.Field
                    control={Input}
                    type="password"
                    name="password"
                    label="Password"
                    icon="lock"
                    iconPosition='left'
                    placeholder="Password"
                    onChange={this.handleFormChange}
                />
                {this.state.showFormNotice && !this.state.password.valid && <Label basic color="red" pointing>{this.state.password.error}</Label>}
            </Form>
        </React.Fragment>);

        let signInForm = (<React.Fragment>
            <Form>
                <Form.Field
                    control={Input}
                    type="email"
                    name="email"
                    label="Email"
                    icon="mail"
                    iconPosition='left'
                    placeholder="Email Address"
                    onChange={this.handleFormChange}
                />
                {this.state.showFormNotice && !this.state.email.valid && <Label basic color="red" pointing>{this.state.email.error}</Label>}
                <Divider hidden />
                <Form.Field
                    control={Input}
                    type="password"
                    name="password"
                    label="Password"
                    icon="lock"
                    iconPosition='left'
                    placeholder="Password"
                    onChange={this.handleFormChange}
                />
                {this.state.showFormNotice && !this.state.password.valid && <Label basic color="red" pointing>{this.state.password.error}</Label>}
            </Form>
        </React.Fragment>);

        let errorMessage = this.props.error &&
            <Message
                attached
                negative
                size="big"
                header="Credentials not valid"
            />;

        let signInValid = this.state.email.valid && this.state.password.valid;
        let registerValid = this.state.email.valid && this.state.password.valid && !this.state.duplicatedEmail;

        return (
            <React.Fragment>
                {this.props.isAuthenticated && <Redirect to={this.props.authRedirectPath} />}
                <div style={{ height: "100vh" }}>
                    <Menu fluid secondary>
                        <Menu.Item >
                            <Header as="h1" size="large">
                                <Icon name="calendar alternate outline" />
                                <Header.Content>
                                    Smart Calendar
                            </Header.Content>
                            </Header>
                        </Menu.Item>

                        <Menu.Item position="right" style={{ fontSize: "1.3em" }}>
                            <ModalUI trigger="category" category="Sign In"
                                header="Sign In"
                                signin={() => this.props.onAuth(this.state.email.value.toLowerCase(), this.state.password.value)}
                                formvalid={signInValid}
                                showNotice={this.showNotice}
                                reset={this.resetState}
                                modalSize="tiny"
                            >
                                {signInForm}
                            </ModalUI>
                        </Menu.Item>
                    </Menu>

                    {errorMessage}
                    <Container style={{ marginTop: "7%" }}>
                        <Header as="h1"
                            content="Welcome to Smart Calendar"
                            style={{
                                fontSize: "4em",
                                fontWeight: "normal",
                                marginBottom: 0,
                                marginTop: "1em"
                            }}
                        />
                        <Header as="h2"
                            content="The Next Generation Employee Management System"
                            style={{
                                fontSize: "1.7em",
                                fontWeight: "normal",
                                marginTop: "1.5em",
                                marginBottom: "1em"
                            }}
                        />
                        {this.props.loading ?
                            <Loader active inline="centered" size="massive" /> :
                            <div>
                                <ModalUI header="Create Account"
                                    category="New Account"
                                    color="blue"
                                    size="huge"
                                    modalSize="tiny"
                                    addAccount={this.addAccount}
                                    formvalid={registerValid}
                                    showNotice={this.showNotice}
                                    reset={this.resetState}
                                >
                                    {regForm}
                                </ModalUI>
                                <ModalUI header="Sign In"
                                    signin={() => this.props.onAuth(this.state.email.value.toLowerCase(), this.state.password.value)}
                                    formvalid={signInValid}
                                    showNotice={this.showNotice}
                                    reset={this.resetState}
                                    category="Existing User"
                                    size="huge"
                                    modalSize="tiny"
                                    color="black"
                                    basic
                                >
                                    {signInForm}
                                </ModalUI>
                            </div>
                        }
                    </Container>
                    <Divider hidden />
                    <LandingFooter />
                </div>
            </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        authRedirectPath: state.auth.authRedirectPath,
        accounts: state.staffTable.accounts
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password) => dispatch(actions.auth(email, password)),
        onInitAccounts: () => dispatch(actions.initAccounts()),
        onAddAccount: newAccount => dispatch(actions.addAccount(newAccount))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Welcome);




