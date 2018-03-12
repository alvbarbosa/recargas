import React, { Component } from 'react';
import { Button } from "reactstrap";

import { firebase } from "../../firebase";

export default class UserNotEnable extends Component {

  handleButton = event => {
    firebase.auth.signOut()
  }

  render() {
    return (
      <div className="app flex-column align-items-center justify-content-center">
        <h2>Este usuario no esta habilitado</h2>
        <Button onClick={this.handleButton} color="success">Aceptar</Button>
      </div>
    )
  }
};
