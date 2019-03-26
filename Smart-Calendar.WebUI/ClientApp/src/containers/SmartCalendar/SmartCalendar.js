import React, { Component } from "react";
import { Divider, Container } from "semantic-ui-react";
import Menubar from "../MenuBar/MenuBar";
import StaffTable from "../StaffTable/StaffTable";
import Footer from "../../components/Footer/Footer";

class SmartCalender extends Component {
    
    render() {
        return (
            <div>
                <Menubar />
                <Divider hidden />
                <Container>
                    <StaffTable />
                    <Divider hidden />
                    <Footer />
                </Container>
            </div>
        );
    }
}

export default SmartCalender;
