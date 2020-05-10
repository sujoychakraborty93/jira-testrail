import React, { Component } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "./NavbarTop";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textEntered: "",
      jiraPrjKey: "PROJ1",
      trPrjId: 1,
      trParentSecId: 2,
      msg: "",
      message: "",
    };
  }

  formDiv = () => {
    return (
      <div>
        <Form className="form">
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Jira Project Key</Form.Label>
            <Form.Control
              //   as="textarea"
              type="text"
              rows="3"
              name="jiraPrjKey"
              //   placeholder="Enter Text.."
              defaultValue={this.state.jiraPrjKey}
              onChange={this.onChangeForm}
              onKeyPress={this.handleKeyPress}
            />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Testrail Project Id</Form.Label>
            <Form.Control
              //   as="textarea"
              type="text"
              rows="3"
              name="trPrjId"
              //   placeholder="Enter Text.."
              defaultValue={this.state.trPrjId}
              onChange={this.onChangeForm}
              onKeyPress={this.handleKeyPress}
            />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Testrail Parent Section</Form.Label>
            <Form.Control
              //   as="textarea"
              type="text"
              rows="3"
              name="trParentSecId"
              //   placeholder="Enter Text.."
              defaultValue={this.state.trParentSecId}
              onChange={this.onChangeForm}
              onKeyPress={this.handleKeyPress}
            />
          </Form.Group>
          <Form.Group as={Row}>
            <Col sm={{ span: 10 }}>
              <Button
                size="sm"
                name="getDataBtn"
                onClick={this.onClickBtn}
                type="submit"
              >
                Create Test cases in Testrail from Jira Issues
              </Button>
              &nbsp;
              {/* <Button
                size="sm"
                name="createWebhookBtn"
                onClick={this.onClickCreateWebhookBtn}
                type="submit"
              >
                Create Webhook
              </Button> */}
            </Col>
          </Form.Group>
        </Form>
      </div>
    );
  };

  onChangeForm = (e) => {
    let fieldName = e.target.name;
    let fleldVal = e.target.value;
    this.setState({
      [fieldName]: fleldVal,
    });
  };
  handleKeyPress = (e) => {
    if (e.charCode === 13) {
      //   console.log("Enter clicked!!!");
      this.onClickBtn(e);
    }
  };
  onClickBtn = (e) => {
    e.preventDefault();
    let body = {
      projectkey: this.state.jiraPrjKey,
      trprojectId: this.state.trPrjId,
      trparentId: this.state.trParentSecId,
    };
    const url =
      //   process.env.REACT_APP_SERVER_URL_DOMAIN + // process.env.REACT_APP_SERVER_URL_DOMAIN was supposed to be 'http://localhost:4000'
      process.env.REACT_APP_SERVER_ADD_TR_SEC_FROM_JIRA_ISSUE_API_ENDPOINT;
    axios.post(url, body).then((res) => {
      console.log(res.data);
      this.setState({
        msg: "got message",
        message: res.data,
      });
    });
  };

  render() {
    return (
      <div>
        <Nav />
        {this.formDiv()}
        {/* this.state.message is like = 
            [
                {newSection: "Section PROJ1-2: Issue 2 already exists. Id: 7", newTestCase: "No new test case added"}
                {newSection: "Section PROJ1-1: Issue1 for Crossover already exists. Id: 4", newTestCase: "No new test case added"}
            ]
        */}
        {this.state.message ? (
          <Alert variant="success">
            {this.state.message.map((obj) => {
              return Object.values(obj).map((item, i) => {
                return <p key={i}>{item}</p>;
              });
            })}
          </Alert>
        ) : null}
      </div>
    );
  }
}

export default Home;
