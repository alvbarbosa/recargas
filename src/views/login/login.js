import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  CardGroup,
  Card,
  CardBody,
  Button,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Form,
  Modal,
} from 'reactstrap';

import { auth, firebase, errFirebase } from "../../firebase";
import { SimpleModal } from "../../components/modal";


class Login extends Component {

  state = {
    user: "",
    pass: "",
    modal: false,
    messageModal: ""
  }

  componentWillMount = () => {
    firebase.auth.onAuthStateChanged(user => {
      if (user) {
        this.props.history.push('/')
      }
    })
  };

  handleForm = event => {
    const { user, pass } = this.state
    auth.doSignInWithEmailAndPassword(user, pass).then(user => {
      this.props.history.push('/')
    }).catch(err => {
      const messageModal = errFirebase(err.code)
      this.setState({
        messageModal,
        modal: true,
      })
    })
    event.preventDefault();
  }

  handleChangeUser = event => {
    this.setState({ user: event.target.value })
  }

  handleChangePass = event => {
    this.setState({ pass: event.target.value })
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Form onSubmit={this.handleForm} >
            <Row className="justify-content-center">
              <Col md="6">
                <CardGroup>
                  <Card className="p-4">
                    <CardBody>
                      <h1>Inicia sesión</h1>
                      <p className="text-muted">Inicia sesión con tu cuenta</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="email" onChange={this.handleChangeUser} placeholder="Usuario" required autoFocus />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" onChange={this.handleChangePass} placeholder="Contraseña" required />
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button color="primary" className="px-4">
                            Ingresar
                        </Button>
                        </Col>
                        <Col xs="6" className="text-right">
                          <Button color="link" className="px-0">¿Olvidaste tu contaseña?</Button>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </CardGroup>
              </Col>
            </Row>
          </Form>
        </Container>
        <SimpleModal
          toggle={this.toggle}
          isOpen={this.state.modal}
          message={this.state.messageModal}
        />
      </div>
    );
  }
}

export default withRouter(Login);