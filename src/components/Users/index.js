import React, { Component } from 'react';
import Switches from './switches'
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

class Users extends Component {
  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12">
            <Card>
              <CardHeader className="titulo">
                <h3><i className="fa fa-align-justify iconos"></i> Usuarios</h3>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead>
                    <tr>
                      <th>Usuario</th>
                      <th>E-mail</th>
                      <th>Habilitar Usuario</th>
                      <th>Habilitar Administrador</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Cristian Barbosa</td>
                      <td>kamilord003@gmail.com</td>
                      <td><Switches /></td>
                      <td><Switches /></td>
                    </tr>
                    <tr>
                      <td>Cristian Barbosa</td>
                      <td>kamilord003@gmail.com</td>
                      <td><Switches /></td>
                      <td><Switches /></td>
                    </tr>
                    <tr>
                      <td>Cristian Barbosa</td>
                      <td>kamilord003@gmail.com</td>
                      <td><Switches /></td>
                      <td><Switches /></td>
                    </tr>
                    <tr>
                      <td>Cristian Barbosa</td>
                      <td>kamilord003@gmail.com</td>
                      <td><Switches /></td>
                      <td><Switches /></td>
                    </tr>
                    <tr>
                      <td>Cristian Barbosa</td>
                      <td>kamilord003@gmail.com</td>
                      <td><Switches /></td>
                      <td><Switches /></td>
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

export default Users;