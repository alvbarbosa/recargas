import React, { Component } from 'react';
import Datepicker from 'react-datepicker';
import moment from "moment";
import 'react-datepicker/dist/react-datepicker.css';
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

class Record extends Component {
  constructor(props) {
    super(props)
    this.state = {
      startDate: moment()
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date) {
    this.setState({
      startDate: date
    });
  }

  render() {
    return (
      <div>
        <Row>
          <Col className="fechas" sm={{ size: 'auto', offset: 4 }} style={{ marginBottom: 40 }}>
            <Row>
              <Col>
                <h4 className="titulo"><i className="fa fa-calendar iconos"></i> Fecha Inicial</h4>
                <Datepicker selected={this.state.startDate} onChange={this.handleChange} />
              </Col>
              <Col>
                <h4 className="titulo"><i className="fa fa-calendar iconos"></i> Fecha Final</h4>
                <Datepicker selected={this.state.startDate} onChange={this.handleChange} />
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card>
              <CardHeader className="titulo">
                <h3><i className="fa fa-envelope-square"></i> Compras</h3>
              </CardHeader>
              <CardBody>
                <Table hover bordered striped responsive size="sm">
                  <thead>
                    <tr>
                      <th>Valor</th>
                      <th>Fecha</th>
                      <th>Hora</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>$100.000</td>
                      <td>5/03/2018</td>
                      <td>10:08 pm</td>
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

export default Record