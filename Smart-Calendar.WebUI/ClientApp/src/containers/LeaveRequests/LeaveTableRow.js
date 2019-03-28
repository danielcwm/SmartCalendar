import React, { Component} from "react";
import { Table, ButtonGroup,Form, Radio } from "semantic-ui-react";
import moment from 'moment';
import ModalUI from "../../components/UI/ModalUI";

class LeaveTableRow extends Component {

    state = {
        leavestatus: 'Pending',
    }

    handleleave = (e, { value}) => {
        var sts = value;
        var status = 'Pending';
       //console.log(sts);
       
        if (sts === 'Approved') {
            status = sts;
        }
        if (sts === 'Rejected') {
            status = sts;
        }
        
        this.setState({
            leavestatus: status
        }, () => {
            
            var updatedrow = {
                leaveRequestId:this.props.leavedata.leaveRequestId,
                startDate: this.props.leavedata.startDate,
                endDate:this.props.leavedata.endDate,
                leaveCategoryId: this.props.leavedata.leaveCategoryId,
                userId: this.props.leavedata.userId,
                isApproved: status, 
            }
            this.props.updateleaverow(updatedrow);
            });
    }
    

    render(){ 
    
        let leavest = 'Pending';
        let isDisplay = this.props.roleId === "1";
      
        console.log(this.props.roleId);
        if (this.props.leavedata.status === 1) { leavest = "Approved" }
        if (this.props.leavedata.status === 2) { leavest = "Rejected" }

    let stdate = parseInt(moment(this.props.leavedata.startDate).format('DD MM YYYY'));
    let enddate = parseInt(moment(this.props.leavedata.endDate).format('DD MM YYYY'));
    
    let days = enddate - stdate + 1;
    //var member = this.props.user;
    let user;
    
        if (isDisplay) {
           
            if (this.props.leavedata.status === 0) {
                user = <div>
                    <Form.Group>
                        <Form.Field  
                            control={Radio}
                            label='Approved'
                            name='check'
                            value='Approved'
                            //checked={this.state.leavestatus === 'Approved'}
                            onChange={this.handleleave} 
                        />
                        <Form.Field
                            control={Radio}
                            label='Rejected'
                            name='check'
                            value='Rejected'
                            //checked={this.state.leavestatus ==='Rejected'}
                            onChange={this.handleleave}
                            />
                    </Form.Group>
                </div>
            }
            else {
                user = leavest;
            }
    }
    else {
        user = <p>{leavest}</p>;
    }
   
    return (
        <Table.Row>
            <Table.Cell>{this.props.leavedata.userName}</Table.Cell>
            <Table.Cell>{this.props.leavedata.dept}</Table.Cell>
            <Table.Cell>{this.props.leavedata.leavetype}</Table.Cell>
            <Table.Cell>{moment(this.props.leavedata.startDate).format('DD/MM/YYYY')}</Table.Cell>
            <Table.Cell>{moment(this.props.leavedata.endDate).format('DD/MM/YYYY')}</Table.Cell>
            <Table.Cell>{days}</Table.Cell>
            <Table.Cell>{user}</Table.Cell>  
            {isDisplay && <Table.Cell>
                <ButtonGroup >
                    <ModalUI icon="trash alternate outline"
                        header="Delete Leave Record"
                        deleteLeaveInfo={this.props.deleteLeaveinfo}
                        formvalid>
                        <h3>Do you want to Delete the Leave Record?</h3>
                    </ModalUI>
                </ButtonGroup>
            </Table.Cell>}
        </Table.Row>
        );
    }
}

export default LeaveTableRow;