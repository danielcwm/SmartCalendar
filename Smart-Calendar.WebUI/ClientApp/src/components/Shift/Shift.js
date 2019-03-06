import React from "react";
import { List, Icon } from "semantic-ui-react";
import AddShift from "../Shift/AddShift/AddShift";


const Shift = props => {
    const timeOptions = [
        { key: '1', text: '8:00am - 4:00pm', value: 1 },
        { key: '2', text: '9:00am - 5:00pm', value: 2 },
        { key: '3', text: '10:00am - 6:00pm', value: 3 }
    ];
    return (
        !props.editable ?
            <React.Fragment>
                <List bulleted>
                    {props.userShifts.map(shift => (
                        <List.Item key={shift.userShiftId}>
                            <List.Header>{shift.day}</List.Header>
                            {shift.shift.timeSlot}
                        </List.Item>
                    ))}
                </List >
            </React.Fragment> :
            <React.Fragment>
                <List horizontal>
                    {props.userShifts.map((shift, i) => (
                        <List.Item key={i}  >
                            <Icon />
                            <List.Content>
                                <List.Header>{shift.day} <Icon name="times" onClick={() => props.removeShift(shift.day)}/></List.Header>
                                {timeOptions.find(t => t.value === shift.shiftId).text}
                            </List.Content>
                        </List.Item>
                    ))}
                    <List.Item>
                        <AddShift userId={props.userId} userShifts={props.userShifts} getAddedShift={props.addShift} timeOptions={timeOptions} />
                    </List.Item>
                </List >
            </React.Fragment>
    );
};



export default Shift;

