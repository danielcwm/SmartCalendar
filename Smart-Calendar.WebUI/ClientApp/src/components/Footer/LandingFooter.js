import React from "react";
import { Container, Grid, Segment, List, Header } from "semantic-ui-react";

const Footer = () => (
    <Segment vertical id="lfooter">
        <Container>
            <Grid divided stackable>
                <Grid.Row>
                    <Grid.Column width={3}>
                        <Header inverted as="h3" content="About" />
                        <List link >
                            <List.Item href="#" style={{ color: "white" }}>Privacy</List.Item>
                            <List.Item href="#" style={{ color: "white" }}>Terms</List.Item>
                            <List.Item href="#" style={{ color: "white" }}>Legal</List.Item>
                            <List.Item href="#" style={{ color: "white" }}>Site Map</List.Item>
                        </List>
                    </Grid.Column>
                    <Grid.Column width={3}>
                        <Header inverted as="h3" content="Technologies" />
                        <List link>
                            <List.Item href="https://reactjs.org/" style={{ color: "white" }}>React</List.Item>
                            <List.Item href="https://dotnet.microsoft.com/" style={{ color: "white" }}>ASP.NET Core</List.Item>
                            <List.Item href="https://react.semantic-ui.com/" style={{ color: "white" }}>Semantic UI React</List.Item>
                            <List.Item href="https://www.microsoft.com/en-au/sql-server/sql-server-2017" style={{ color: "white" }}>Microsoft SQL Server</List.Item>
                        </List>
                    </Grid.Column>
                    <Grid.Column width={10}>
                        <Header as="h3" inverted content="Core Developers" />
                        <List horizontal>
                            <List.Item>
                                <List.Content>
                                    <h4><a href="https://www.linkedin.com/in/dotnet-daniel-choi/" style={{ color: "white" }}>Daniel Choi</a></h4>
                                    <a href="http://www.mvp.studio/">Senior Software Developer</a>
                                </List.Content>
                            </List.Item>
                            <List.Item>
                                <List.Content>
                                    <h4><a href="https://www.linkedin.com/in/terry-w-developer/" style={{ color: "white" }}>Terry Wang</a></h4>
                                    <a href="http://www.mvp.studio/">Software Developer @ MVP Studio</a>
                                </List.Content>
                            </List.Item>
                            <List.Item>
                                <List.Content>
                                    <h4><a href="https://www.linkedin.com/in/radhika-vahora-58083618/" style={{ color: "white" }}>Radhika Vahora</a></h4>
                                    <a href="http://www.mvp.studio/">Software Developer @ MVP Studio</a>
                                </List.Content>
                            </List.Item>
                        </List>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row style={{ color: "white" }}>
                    <Grid.Column width={16} >
                        Copyright © 2019 Smart Team. All rights reserved.
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Container>
    </Segment>

);

export default Footer;