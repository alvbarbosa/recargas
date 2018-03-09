import React, { Component } from 'react';
import {
  Badge,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Table,
  Pagination,
  PaginationItem,
  PaginationLink, 
  Collapse,
   Button,
} from 'reactstrap';
import Example from '../message/collapse' 

class Tables extends Component {
  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12">
            <Card>
              <CardHeader className="titulo">
                <h3><i className="fa fa-comment-o"></i> Mensajes</h3>
              </CardHeader>
              <CardBody>
                <Table responsive striped>
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Ver Mensajes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="texto">Cristian barbosa</td>
                      <td><Example /></td>
                    </tr>
                    <tr>
                      <td className="texto">Cristian barbosa</td>
                      <td><Example /></td>
                    </tr>
                    <tr>
                      <td className="texto">Cristian barbosa</td>
                      <td><Example /></td>
                    </tr>
                    <tr>
                      <td className="texto">Cristian barbosa</td>
                      <td><Example /></td>
                    </tr>
                    <tr>
                      <td className="texto">Cristian barbosa</td>
                      <td><Example /></td>
                    </tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>

    )
  }
}

export default Tables;
