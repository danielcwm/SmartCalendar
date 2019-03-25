import React, { Component} from "react";
import { Table, ButtonGroup,Form,Checkbox, Radio } from "semantic-ui-react";
import moment from 'moment';
import ModalUI from "../../components/UI/ModalUI";
class LeaveTableRow extends Component {

    state = {
        leavestatus: 'Pending',
       
    }

    handleleave = (e, { value}) => {
        var sts = value;
        var status = 'Pending';
        console.log(sts);
        debugger
        if (sts === 'Approved') {
            status = sts;
        }
        if (sts === 'Rejected') {
            status = sts;
        }
        //var id = id;
        this.setState({
            leavestatus: status
        }, () => {
            //var leaveId = 0;

            //if (this.props.leavedata.leavetype === 'Sick') {
            //    leaveId = 1;
            //}
            //if (this.props.leavedata.leavetype === 'Casual') {
            //    leaveId = 2;
            //}
            var updatedrow = {
                leaveRequestId:this.props.leavedata.leaveRequestId,
                startDate: this.props.leavedata.startDate,
                endDate:this.props.leavedata.endDate,
                leaveCategoryId: this.props.leavedata.leaveCategoryId,
                userId: this.props.leavedata.userId,
                isApproved: status,
                
            }
            this.props.updateleaverow(updatedrow);
            //this.props.leavedata.status = sts;
            });
        //console.log(sts);
    }
    //handlesubmit = (id) => {
    //   // console.log(this.state.leavestatus);
    //    var Id = id;
    //    var status = this.state.leavestatus;
    //    this.props.leavestatus(Id,status);
    //}

    render(){ 
    //let stdate, enddate;
        //let leavest = this.props.leavedata.status ? "Approved" : "Rejected";
        let leavest = 'Pending';
       // debugger
        console.log(this.props.leavedata.status);
        if (this.props.leavedata.status === 1) { leavest = "Approved" }
        if (this.props.leavedata.status === 2) { leavest = "Rejected" }

    let stdate = parseInt(moment(this.props.leavedata.startDate).format('DD MM YYYY'));
    let enddate = parseInt(moment(this.props.leavedata.endDate).format('DD MM YYYY'));
    //console.log(stdate, enddate);
    let days = enddate - stdate;
    var member = this.props.user;
    let user;
    //debugger
        if (member === 'Admin') {
           // debugger
            if (this.props.leavedata.status === 0) {
                user = <div>
                    <Form.Group>
                        <Form.Field
                            
                                id={this.props.leavedata.leaveRequestId}
                            control={Radio}
                                label='Approved'
                                name='check'
                                value='Approved'
                                checked={this.state.leavestatus === 'Approved'}
                                onChange={this.handleleave}
                            
                        />
                        <Form.Field
                                id={this.props.leavedata.leaveRequestId}
                            control={Radio}
                                label='Rejected'
                                name='check'
                                value='Rejected'
                                checked={this.state.leavestatus ==='Rejected'}
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
            <Table.Cell>
                <ButtonGroup >
                    <ModalUI icon="trash alternate outline"
                        header="Delete Leave Record"
                        deleteLeaveInfo={this.props.deleteLeaveinfo}
                        formvalid>  
                    </ModalUI>
                    
                </ButtonGroup>
                
            </Table.Cell>
        </Table.Row>
        );
    }
}

export default LeaveTableRow;