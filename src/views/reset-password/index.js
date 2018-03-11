import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  CardGroup,
  Card,
  Form,
  CardBody,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  Button,
} from "reactstrap";

import { SimpleModal } from "../../components/modal";
import { auth, firebase, errFirebase } from "../../firebase";

class ResetPassword extends Component {
  state = {
    modal: false,
    email: "",
    messageModal: "",
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }

  handleChangeSend = event => {
    this.setState({ email: event.target.value })
  }

  handleForm = event => {

    firebase.auth.sendPasswordResetEmail(this.state.email).then(() => {
      this.props.history.push('/')
    }).catch(err => {
      const messageModal = errFirebase(err.code)
      this.setState({
        messageModal,
        modal: true,
      })
    });
  }

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <Form onSubmit={this.handleForm} >
                    <CardBody>
                      <h1>Restablecer contraseña</h1>
                      <p className="text-muted">Recibe un correo para restlabecer la contraseña</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="email" onChange={this.handleChangeSend} placeholder="Email" required autoFocus />
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button color="primary" className="px-4">
                            Enviar
                        </Button>
                        </Col>
                      </Row>
                    </CardBody>
                  </Form>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
        <SimpleModal
          toggle={this.toggle}
          isOpen={this.state.modal}
          message={this.state.messageModal}
        />
      </div>
    )
  }
};


export default withRouter(ResetPassword);