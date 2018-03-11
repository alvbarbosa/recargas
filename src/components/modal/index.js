import React from 'react';
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Button,
} from 'reactstrap'

export const SimpleModal = props => {
  return (
    <Modal isOpen={props.isOpen} toggle={props.toggle} className={props.className}>
      <ModalHeader toggle={props.toggle} >Mensaje</ModalHeader>
      <ModalBody>
        {props.message}
      </ModalBody>
      <ModalFooter>
        <Button color="info" onClick={props.toggle}>Cancelar</Button>
      </ModalFooter>
    </Modal>
  )
}

export const YesNoModal = props => {
  return (
    <Modal isOpen={props.isOpen} toggle={props.toggle} className={props.className}>
      <ModalHeader toggle={props.toggle} >Mensaje</ModalHeader>
      <ModalBody>
        {props.message}
      </ModalBody>
      <ModalFooter>
        <Button color="success" onClick={props.handleModalYes}>Si</Button>
        <Button color="secondary" onClick={props.handleModalNo}>No</Button>
      </ModalFooter>
    </Modal>
  )
}

export { ProcessedRejectModal } from './processed-reject'