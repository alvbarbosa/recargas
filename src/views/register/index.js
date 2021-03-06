import React, { Component } from 'react';
import { withRouter, Redirect } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardFooter,
  Button,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Form
} from 'reactstrap';

import { auth, firebase } from "../../firebase";
import { SimpleModal } from "../../components/modal";

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

class Register extends Component {
  state = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    modal: false,
    messageModal: ""
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }

  onSubmit = async event => {
    event.preventDefault();
    const {
      passwordOne,
      passwordTwo,
      username,
      email,
    } = this.state

    if (passwordOne != passwordTwo) {
      this.setState({
        messageModal: "Las Contraseñas no Coinciden",
        modal: true
      })
    } else {
      try {
        const user = await auth.doCreateUserWithEmailAndPassword(email, passwordOne)
        await user.updateProfile({
          displayName: username,
        })
        await firebase.database.ref(`users/${user.uid}`).set({
          username,
          email
        })
        this.props.history.push('/')
      } catch (err) {
        console.log(err.code);
        const messageModal = firebase.errFirebase(err.code)
        this.setState({
          messageModal,
          modal: true,
        })
      }
    }
  }

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="6">
              <Card className="mx-4">
                <Form onSubmit={this.onSubmit} >
                  <CardBody className="p-4">
                    <h1>Registro</h1>
                    <p className="text-muted">Crear una cuenta</p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="text"
                        placeholder="Nombre de usuario"
                        onChange={event => this.setState(byPropKey('username', event.target.value))}
                        required
                        autoFocus
                      />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>@</InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="email"
                        placeholder="Correo Electronico"
                        onChange={event => this.setState(byPropKey('email', event.target.value))}
                        required
                      />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="password"
                        placeholder="Contraseña"
                        onChange={event => this.setState(byPropKey('passwordOne', event.target.value))}
                        required
                      />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="password"
                        placeholder="Repetir Contraseña"
                        onChange={event => this.setState(byPropKey('passwordTwo', event.target.value))}
                        required
                      />
                    </InputGroup>
                    <Button color="success" block>Crear Cuenta</Button>
                  </CardBody>
                </Form>
              </Card>
            </Col>
          </Row>
        </Container>
        <SimpleModal toggle={this.toggle} isOpen={this.state.modal} message={this.state.messageModal} />
      </div>
    );
  }
}

export default withRouter(Register);
