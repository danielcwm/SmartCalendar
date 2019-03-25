import React, { Component } from "react";
import { Form, Select, Input,Checkbox } from "semantic-ui-react";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";


class AddLeave extends Component{
    state = {
        startdate: new Date(),
        enddate: new Date(),
        leave: '',
        firstName: '',
        Dept:''
    }

    handlestdate = (date) => {
       // debugger
        this.setState({
            startdate: date
        }, () => this.props.onStDateChange(this.state.startdate));
    }
    handleEnddate = (date) => {
        //debugger
        this.setState({
            enddate: date
        }, () => this.props.onEndDateChange(this.state.enddate));
    }
    onFormChange = (e, { value }) => {
        this.setState({ leave: value }, () => this.props.onLeaveChange(this.state.leave));
    };
    //onInputChange = (e, { name,value }) => {
    //    this.setState({ name: value }, () => this.props.onInputChange(this.state));
    //}
    render() {
        return (
            <div>
                <Form>
                        <Form.Field
                        control={Input}
                        name="firstName"
                        label="FirstName"
                        placeholder="Select an FirstName"
                        onChange={this.props.onInputChange}
                        />
                        <Form.Field
                            control={Input}
                            name="Dept"
                            label="Department"
                            placeholder="Department"
                        onChange={this.props.onInputChange}
                        />
                    <Form.Group inline>
                        <Form.Field>
                            <Checkbox
                                radio
                                label='Sick'
                                name='check'
                                value='1'
                                checked={this.state.leave === '1'}
                                onChange={this.onFormChange}
                            />
                        </Form.Field>
                        <Form.Field>
                            <Checkbox
                                radio
                                label='Casual'
                                name='check'
                                value='2'
                                checked={this.state.leave === '2'}
                                onChange={this.onFormChange}
                            />
                        </Form.Field>
                    </Form.Group>
                       
                    <Form.Group widths="equal">
                        <Form.Field>
                            <label>Start Date</label>
                            <DatePicker
                                onChange={this.handlestdate}
                                selected={this.state.startdate}
                                tabIndex={1} />
                        </Form.Field>
                        <Form.Field>
                           <label>End Date</label>
                            <DatePicker
                            onChange={this.handleEnddate}
                            selected={this.state.enddate}
                            tabIndex={1} />
                        </Form.Field>
                    </Form.Group>                 
                </Form>
            </div>
        );
    }
}
export default AddLeave;