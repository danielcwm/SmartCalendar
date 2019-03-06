import React from "react";
import { Table, ButtonGroup } from "semantic-ui-react";
import ModalUI from "../../UI/ModalUI";
import Shift from "../../Shift/Shift";
import EditUserInfo from "../../UserInfo/EditUserInfo/EditUserInfo";

const TableRow = props => {
    return (
        <Table.Row>
            <Table.Cell>{props.user.firstName}</Table.Cell>
            <Table.Cell>{props.user.lastName}</Table.Cell>
            <Table.Cell>{props.user.gender}</Table.Cell>
            <Table.Cell>{props.user.department}</Table.Cell>
            <Table.Cell>{props.user.position}</Table.Cell>
            <Table.Cell>
                <Shift editable={false} userShifts={props.user.userShifts}/>
            </Table.Cell>
            <Table.Cell>
                <ButtonGroup>
                    <ModalUI icon="edit" header="Edit User Info" editUserInfo={props.editUserInfo}>
                        <EditUserInfo user={props.user} getUpdatedUser={props.getUpdatedUser}/>
                    </ModalUI>
                    <ModalUI icon="remove user" header="Delete User Info" deleteUser={props.deleteUserInfo}>
                        <h3>Delete all information about {props.user.firstName} {props.user.lastName}?</h3>
                    </ModalUI>
                </ButtonGroup>
            </Table.Cell>
        </Table.Row>
    );
};

export default TableRow;
