import React, { Component } from 'react';
import {
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
} from "reactstrap";

export class ProcessedRejectModal extends Component {
  state = {
    modal: false
  }

  componentWillReceiveProps = nextProps => {
    if (nextProps.isOpen)
      this.toggle()
  };


  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }

  handleModalApprove = () => {
    this.toggle()
    this.props.handleModalApprove()
  }

  handleModalReject = () => {
    this.toggle()
    this.props.handleModalReject()
  }

  toggle
  render() {
    return (
      <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
        <ModalHeader toggle={this.toggle} >Mensaje</ModalHeader>
        <ModalBody>
          {this.props.message}
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={this.handleModalApprove}>Procesado</Button>
          <Button color="danger" onClick={this.handleModalReject}>Rechazado</Button>
        </ModalFooter>
      </Modal>
    );
  }
}