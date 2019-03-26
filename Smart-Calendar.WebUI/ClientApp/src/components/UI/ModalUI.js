import React, { Component } from "react";
import { Button, Modal, Image } from "semantic-ui-react";

class ModalUI extends Component {
    state = { open: false };

    closeConfigShow = (closeOnEscape, closeOnDimmerClick) => () => {
        this.setState({ closeOnEscape, closeOnDimmerClick, open: true });
    };

    confirm = () => {
        if (this.props.formvalid) {
            this.setState({ open: false });
            switch (this.props.header) {
                case "Delete User Info":
                    return this.props.deleteUser();
                case "Add User Info":
                    return this.props.addUserInfo();
                case "Edit User Info":
                    return this.props.editUserInfo();
                case "Create New Account":
                    return this.props.addStaffInfo();
                case "Delete Leave Record":
                    return this.props.deleteLeaveInfo();
                case "ApplyLeave":
                    return this.props.addleaveInfo();
                case "Leave Request List":
                    return this.props.updateLeaveInfo();
                case "Edit User Info":
                    return this.props.editUserInfo();
                case "Add Account":
                    return this.props.addAccount();
                case "Account Settings":
                    return this.props.accountSettings();
                case "Sign In":
                    return this.props.signin();
                case "Sign Out":
                    return this.props.signout();
                default:
                    return null;
            }
        }
        this.props.showNotice();
    };

    cancel = () => {
        this.setState({ open: false });
        this.props.reset();
    };

    render() {
        const { open, closeOnEscape, closeOnDimmerClick } = this.state;
        let trigger =
            this.props.trigger === "image" ?
                <Image src={this.props.image} onClick={this.closeConfigShow(false, false)} fluid />
                : this.props.trigger === "category" ?
                    <span onClick={this.closeConfigShow(false, false)}>{this.props.category}</span>
                    : <Button
                        basic={this.props.basic}
                        inverted={this.props.inverted}
                        color={this.props.color}
                        icon={this.props.icon}
                        circular={this.props.circular}
                        onClick={this.closeConfigShow(false, false)}
                    >{this.props.category}
                    </Button>;

        return (
            <React.Fragment>
                {trigger}
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
                        <Button onClick={this.cancel} inverted color="red">
                            Cancel</Button>
                        <Button
                            inverted
                            color="blue"
                            onClick={this.confirm}
                        >
                            Done
                        </Button>
                    </Modal.Actions>
                </Modal>
            </React.Fragment>
        );
    }
}

export default ModalUI;