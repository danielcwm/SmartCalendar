import React, { Component } from "react";
import { Button, Modal } from "semantic-ui-react";

class ModalUI extends Component {
    state = { open: false };

    closeConfigShow = (closeOnEscape, closeOnDimmerClick) => () => {
        this.setState({ closeOnEscape, closeOnDimmerClick, open: true });
    };

    close = () => {
        console.log(this.props.formvalid);
        this.props.header === 'Create New Account' ? this.props.validateForm() : null;
        
        if (this.props.formvalid) { 
            //this.setState({ open: false });

            switch (this.props.header) {
                case "Delete Staff":
                    return this.props.deleteUser();
                case "Add User Info":
                    return this.props.addUserInfo();
                case "Create New Account":
                    return this.props.addStaffInfo();
                default:
                    return null;
            }
            this.setState({ open: false });
        }

    };

    cancel = () => {
        this.props.header === 'Create New Account' ? this.props.clearStaffInfo() : null;
        this.setState({ open: false });
    };

    render() {
        const { open, closeOnEscape, closeOnDimmerClick } = this.state;

        return (
            <React.Fragment>
                <Button
                    basic
                    icon={this.props.icon}
                    onClick={this.closeConfigShow(false, false)}>
                    {this.props.category}
                </Button>

                <Modal
                    open={open}
                    closeOnEscape={closeOnEscape}
                    closeOnDimmerClick={closeOnDimmerClick}
                    onClose={this.close}>
                    <Modal.Header>{this.props.header}</Modal.Header>
                    <Modal.Content>
                        <Modal.Description>{this.props.children}</Modal.Description>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button onClick={this.cancel} negative>
                        Cancel</Button> 
                        <Button
                        positive
                        icon="checkmark"
                        labelPosition="right"
                        content="Confirm"
                        onClick={this.close}/>
                    </Modal.Actions>
                </Modal>
            </React.Fragment>
        );
    }
}

export default ModalUI;
