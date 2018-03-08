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
    <Col className="height-70vh">
      <Card>
        <CardHeader className="text-center titulo" style={{ fontSize: 30 }}>
          ULTIMAS RECARGAS
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
          </ListGroup>
          <p />
        </CardBody>
      </Card>
    </Col>
  )
}