import React, { Component } from "react";
import { Button, Modal } from "semantic-ui-react";

class ModalUI extends Component {
    state = { open: false };

    closeConfigShow = (closeOnEscape, closeOnDimmerClick) => () => {
        this.setState({ closeOnEscape, closeOnDimmerClick, open: true });
    };

    close = () => {
        this.setState({ open: false });
        this.props.header === "Delete Staff" ? this.props.deleteUser() : null;
        this.props.header === "Add User Info" ? this.props.addUserInfo() : null;

    };

    cancel = () => {
        this.setState({ open: false });
    };

    render() {
        const { open, closeOnEscape, closeOnDimmerClick } = this.state;

        return (
            <React.Fragment>
                <Button
                    basic
                    icon={this.props.icon}
                    onClick={this.closeConfigShow(false, false)}
                >
                    {this.props.category}
                </Button>

                <Modal
                    open={open}
                    closeOnEscape={closeOnEscape}
                    closeOnDimmerClick={closeOnDimmerClick}
                    onClose={this.close}
                >
                    <Modal.Header>{this.props.header}</Modal.Header>
                    <Modal.Content>
                        <Modal.Description>{this.props.children}</Modal.Description>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button onClick={this.cancel} negative>
                            Cancel
            </Button>
                        <Button
                            positive
                            icon="checkmark"
                            labelPosition="right"
                            content="Confirm"
                            onClick={this.close}
                        />
                    </Modal.Actions>
                </Modal>
            </React.Fragment>
        );
    }
}

export default ModalUI;
