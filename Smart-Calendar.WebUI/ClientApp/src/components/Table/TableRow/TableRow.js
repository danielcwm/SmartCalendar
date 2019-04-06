import React from "react";
import { Table, ButtonGroup } from "semantic-ui-react";
import ModalUI from "../../UI/ModalUI";
import Shift from "../../Shift/Shift";
import EditUserInfo from "../../UserInfo/EditUserInfo/EditUserInfo";

const TableRow = props => {
    return (
        <Table.Row style={props.user.accountId === props.accountId ? { color: "blue" } : null}>
            <Table.Cell>{props.user.firstName}</Table.Cell>
            <Table.Cell>{props.user.lastName}</Table.Cell>
            <Table.Cell>{props.user.gender}</Table.Cell>
            <Table.Cell>{props.user.department}</Table.Cell>
            <Table.Cell>{props.user.position}</Table.Cell>
            <Table.Cell>{props.user.email}</Table.Cell>
            <Table.Cell negative={props.user.userShifts.length === 0}>
                <Shift editable={false} userShifts={props.user.userShifts} />
            </Table.Cell>
            {props.isDisplay && <Table.Cell>
                <ButtonGroup>
                    <ModalUI basic inverted={false} icon="edit" header="Edit Employee Info" editEmployeeInfo={props.editUserInfo} showNotice={props.showNotice} formvalid={props.editUserValid} reset={props.reset}>
                        <EditUserInfo user={props.user} getUpdatedUser={props.getUpdatedUser} showFormNotice={props.showFormNotice}/>
                    </ModalUI>
                    <ModalUI basic inverted={false} modalSize="tiny" icon="remove user" header="Delete Employee Info" deleteEmployeeInfo={props.deleteUserInfo} reset={() => null} formvalid>
                        <h3>Delete all information about {props.user.firstName} {props.user.lastName}?</h3>
                    </ModalUI>
                </ButtonGroup>
            </Table.Cell>}
        </Table.Row>
    );
};

export default TableRow;
