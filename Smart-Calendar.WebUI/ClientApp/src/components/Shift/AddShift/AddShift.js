import React, { Component } from "react";
import { Select, List, Button, Icon } from "semantic-ui-react";


class AddShift extends Component {
    state = {
        showForm: false,
        day: '',
        shiftId: '',
        error: false
    }

    onAddBtnClick = () => {
        this.setState({ showForm: true });
    }

    addShift = () => {

        if (!this.state.day || !this.state.shiftId) {
            this.setState({ showForm: true, error: true });
        } else {
            let newUserShift = {
                userId: this.props.userId,
                day: this.state.day,
                shiftId: this.state.shiftId
            };
            this.props.getAddedShift(newUserShift);
            this.setState({
                showForm: false, day: '', shiftId: '', error: false });
        }
    }

    onCloseBtnClick = () => {
        this.setState({ showForm: false, error: false, day: '', shiftId: '' });
    }

    onSelectChange = (e, { name, value }) => {
        this.setState({ [name]: value, error: false });
    };

    render() {
        const dayOptions = [
            { key: '1', text: 'Monday', value: 'Monday' },
            { key: '2', text: 'Tuesday', value: 'Tuesday' },
            { key: '3', text: 'Wednesday', value: 'Wednesday' },
            { key: '4', text: 'Thursday', value: 'Thursday' },
            { key: '5', text: 'Friday', value: 'Friday' }
        ];
        let availableDays = dayOptions.filter(day => this.props.userShifts.every(userShift => userShift.day !== day.value));
        let addButton = this.props.userShifts.length < 5 && <Icon name="add" size="large" onClick={this.onAddBtnClick} />;
        return (
            <React.Fragment>
                <List.Header>
                    {!this.state.showForm ?
                        addButton :
                        <React.Fragment>
                            <Select name="day" options={availableDays} placeholder="Select a day" onChange={this.onSelectChange} error={this.state.error} />
                            <Select name="shiftId" options={this.props.timeOptions} placeholder="Select a time slot" onChange={this.onSelectChange} error={this.state.error} />
                            <Button.Group>
                                <Button circular basic size="large" icon='check' onClick={this.addShift} />
                                <Button circular basic size="large" icon='times' onClick={this.onCloseBtnClick} />
                            </Button.Group>
                        </React.Fragment>}
                </List.Header>
            </React.Fragment>
        );
    }
}

export default AddShift;
