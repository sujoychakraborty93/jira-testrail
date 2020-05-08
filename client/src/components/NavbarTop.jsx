import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";

class NavbarTop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //   userEmail: this.props.location.state
      //     ? this.props.location.state.userEmail
      //     : "",
      id: "a",
      result: {},
    };
  }
  render() {
    return (
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/Home">Navbar</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/Home">Home</Nav.Link>
          <Nav.Link href="/Search">Search</Nav.Link>
        </Nav>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-info">Search</Button>
        </Form>
      </Navbar>
    );
  }
}

export default NavbarTop;
