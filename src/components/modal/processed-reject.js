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
    modal: false,
    successDisabled: false,
  }

  componentWillReceiveProps = nextProps => {
    if (nextProps.isOpen)
      this.toggle()

    if (nextProps.successDisabled)
      this.setState({ successDisabled: true })
    else
      this.setState({ successDisabled: false })
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
      <Modal backdrop={'static'} isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
        <ModalHeader toggle={this.toggle} >Mensaje</ModalHeader>
        <ModalBody>
          {this.props.message}
        </ModalBody>
        <ModalFooter>
          <Button disabled={this.state.successDisabled} color="success" onClick={this.handleModalApprove}>{this.props.processed}</Button>
          <Button color="danger" onClick={this.handleModalReject}>{this.props.reject}</Button>
        </ModalFooter>
      </Modal>
    );
  }
}