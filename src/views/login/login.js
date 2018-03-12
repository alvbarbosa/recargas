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
    event.preventDefault();
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
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <Form onSubmit={this.handleForm} >
                    <CardBody>
                      <h1>Inicia sesión</h1>
                      <p className="text-muted">Inicia sesión con tu cuenta</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="email" onChange={this.handleChangeUser} placeholder="Email" required autoFocus />
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
                        <Col xs="5">
                          <Button color="primary" className="px-4">
                            Ingresar
                        </Button>
                        </Col>
                        <Col xs="7" className="text-right">
                          <Button onClick={() => this.props.history.push('/resetPassword')} color="link" className="px-0">¿Olvidaste tu contaseña?</Button>
                        </Col>
                      </Row>
                    </CardBody>
                  </Form>
                </Card>
                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: 44 + '%' }}>
                  <CardBody className="text-center">
                    <div>
                      <h2>Regístrate</h2>
                      <p>Después del registro esperar que el administrador apruebe su ingreso.</p>
                      <Button onClick={() => this.props.history.push('/register')} color="primary" className="mt-3" active>¡Regístrate ahora!</Button>
                    </div>
                  </CardBody>
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
    );
  }
}

export default withRouter(Login);