import React, { Component } from 'react';
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText,
  Badge
} from 'reactstrap';

export const List = props => {
  return (
    <Col style={{ height: 446, overflow: "auto" }}>
      <Card>
        <CardHeader className="text-center" style={{ fontSize: 30 }}>
           Historial de Recargas
        </CardHeader>
        <CardBody>
          <ListGroup>
            <ListGroupItem active tag="a" href="#" action>Cras justo odio</ListGroupItem>
            <ListGroupItem tag="a" href="#" action>Dapibus ac facilisis in</ListGroupItem>
            <ListGroupItem tag="a" href="#" action>Morbi leo risus</ListGroupItem>
            <ListGroupItem tag="a" href="#" action>Porta ac consectetur ac</ListGroupItem>
            <ListGroupItem disabled tag="a" href="#" action>Vestibulum at eros</ListGroupItem>
            <ListGroupItem disabled tag="a" href="#" action>Vestibulum at eros</ListGroupItem>
            <ListGroupItem disabled tag="a" href="#" action>Vestibulum at eros</ListGroupItem>
            <ListGroupItem disabled tag="a" href="#" action>Vestibulum at eros</ListGroupItem>
            <ListGroupItem disabled tag="a" href="#" action>Vestibulum at eros</ListGroupItem>
            <ListGroupItem disabled tag="a" href="#" action>Vestibulum at eros</ListGroupItem>
            <ListGroupItem disabled tag="a" href="#" action>Vestibulum at eros</ListGroupItem>
            <ListGroupItem disabled tag="a" href="#" action>Vestibulum at eros</ListGroupItem>
            <ListGroupItem disabled tag="a" href="#" action>Vestibulum at eros</ListGroupItem>
            <ListGroupItem disabled tag="a" href="#" action>Vestibulum at eros</ListGroupItem>
            <ListGroupItem disabled tag="a" href="#" action>Vestibulum at eros</ListGroupItem>
            S
          </ListGroup>
          <p />
        </CardBody>
      </Card>
    </Col>
  )
}