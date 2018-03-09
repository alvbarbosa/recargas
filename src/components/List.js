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
import { formatCurrency } from "../utils";

export const List = props => {
  let list = props.listRecharges.reverse()
  list = list.map((item, index) => {
    let classN = ""
    switch (item.status) {
      case 1:
        classN = "bg-success text-light"
        break;
      case 2:
        classN = "bg-danger text-light"
        break;
    }
    return (
      <ListGroupItem key={index} className={`list-recharges ${classN}`} disabled tag="a" href="#" action>
        <div>{item.numberCel}</div>
        <div>{formatCurrency(parseFloat(item.valueCel), "$")}</div>
        <div>{(new Date(item.date)).toLocaleString()}</div>
      </ListGroupItem>
    )
  })
  return (
    <Col className="height-70vh">
      <Card>
        <CardHeader className="text-center titulo" style={{ fontSize: 30 }}>
          ULTIMAS RECARGAS
        </CardHeader>
        <CardBody>
          <ListGroup>
            {list}
          </ListGroup>
        </CardBody>
      </Card>
    </Col>
  )
}