import React, { Component } from "react";
import { Table, Checkbox, ButtonGroup } from "semantic-ui-react";
import axios from "axios";
import LeaveTableRow from "./LeaveTableRow";
import ModalUI from "../../components/UI/ModalUI";
import ApplyLeave from './ApplyLeave';
import moment from 'moment';
class LeaveRequests extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dept: '',
            leavetype:'',
            startdate:null,
            enddate: null,
            sick: '',
            casual: '',
            user: 'Admin',
            firstName: '',
            Dept: '',
            rawstdate: '',
            rawenddate: '',
            updateleavedata: this.props.leaves,
            newleavedata:null
        }
    }
   
    onStDateChange = (value) => {
        
        var date = moment(value).toDate();
        var datefr = moment(date).format("DD/MM/YYYY");
        this.setState({
            startdate: datefr,
            rawstdate: value
        });
    };
    onEndDateChange = (value) => {
        
        var rawenddate = value;
        var date = moment(value).toDate();
        var datefr = moment(date).format("DD/MM/YYYY");
        this.setState({
            enddate: datefr,
            rawenddate: value
        });
    };
    onLeaveChange = (value) => {
        
        this.setState({ leavetype: value });
    };
    onInputChange = (e, {name, value}) => {
        this.setState({ [name]: value });
    }
    handleleaveInfo = () => { 
        var data = null;
        let leaveId = parseInt(this.state.leavetype);
        let srtdate = moment(this.state.startdate).format("YYYY-MM-DD");
        
        let leavedata = {
            userId: "f9a6eea1-1d7d-4eca-9906-a3ef76a0de4a",
            startDate: this.state.rawstdate,
            endDate: this.state.rawenddate,
            isApproved: "Pending",
            leaveCategoryId: leaveId
        }
        console.log(leavedata);
        this.props.newleavedata(leavedata);
    }
    handleleavest = (data) => {
       
        this.setState({
            newleavedata: [...this.state.newleavedata,data]
        }, () => {
           
            this.props.updateleavest(this.state.newleavedata);
        });
      
    }
    
    componentDidMount() {
        axios
            .get("https://localhost:44314/api/calendar/LeaveRequest")
            .then(response => {
                this.setState({ leaves: response.data }, () => { console.log(this.state.leaves); });
            })
            .catch(error => {
                console.log(error);
            });
    }
    render() {
        console.log(this.props.leaves);
        
    return (
      <div>
        <Table celled striped size="large" color="grey" collapsing>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>
                <h3>Employee Name</h3>
              </Table.HeaderCell>
              <Table.HeaderCell>
                <h3>Department</h3>
              </Table.HeaderCell>
              <Table.HeaderCell>
                <h3>Leave Type</h3>
              </Table.HeaderCell>
              <Table.HeaderCell>
                <h3>Start Date</h3>
              </Table.HeaderCell>
              <Table.HeaderCell>
                <h3>End Date</h3>
              </Table.HeaderCell>
              <Table.HeaderCell>
                <h3>No.of Days</h3>
              </Table.HeaderCell>
              <Table.HeaderCell>
                <h3>Status</h3>
                </Table.HeaderCell>
                <Table.HeaderCell>
                    <h3>Action
                        <ButtonGroup>
                                    <ModalUI icon="add" header="ApplyLeave"
                                        formvalid
                                        addleaveInfo={this.handleleaveInfo}>
                                        <ApplyLeave onLeaveChange={this.onLeaveChange}
                                            onStDateChange={this.onStDateChange}
                                            onEndDateChange={this.onEndDateChange}
                                            onInputChange={this.onInputChange}
                                        />
                                </ModalUI>
                    </ButtonGroup>
                    </h3>
                </Table.HeaderCell>
            </Table.Row>
                </Table.Header>

                <Table.Body>{this.props.leaves.map(leave =>
                    (<LeaveTableRow
                        key={leave.leaveRequestId}
                        leavedata={leave}
                        user={this.props.user}
                        deleteLeaveinfo={() => this.props.dltleave(leave.leaveRequestId)}
                        updateleaverow={this.handleleavest}
                    />))   
                } 
                </Table.Body>
        </Table>
      </div>
    );
  }
}

export default LeaveRequests;
