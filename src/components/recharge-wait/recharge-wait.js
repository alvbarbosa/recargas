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
  PaginationLink
} from 'reactstrap';

class EntryRecharges extends Component {
  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12">
            <Card>
              <CardHeader>
                <Row>
                  <Col md="5">
                    <i className="fa fa-hourglass-half"></i>
                  </Col>
                  <Col>
                    <h5>Estado Recargas</h5>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead>
                    <tr>
                      <th>Telefono</th>
                      <th>Valor</th>
                      <th>Fecha</th>
                      <th>Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>3102443226</td>
                      <td>100.000</td>
                      <td>8/03/2018</td>
                      <td>
                        <Badge color="warning">En espera</Badge>
                      </td>
                    </tr>
                    <tr>
                      <td>3102443226</td>
                      <td>100.000</td>
                      <td>8/03/2018</td>
                      <td>
                        <Badge color="success">Activa</Badge>
                      </td>
                    </tr>
                    <tr>
                      <td>3102443226</td>
                      <td>100.000</td>
                      <td>8/03/2018</td>
                      <td>
                        <Badge color="success">Activa</Badge>
                      </td>
                    </tr>
                    <tr>
                      <td>3102443226</td>
                      <td>100.000</td>
                      <td>8/03/2018</td>
                      <td>
                        <Badge color="warning">En espera</Badge>
                      </td>
                    </tr>
                    <tr>
                      <td>3102443226</td>
                      <td>100.000</td>
                      <td>8/03/2018</td>
                      <td>
                        <Badge color="success">Active</Badge>
                      </td>
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

export default EntryRecharges;