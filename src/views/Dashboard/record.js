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
          <Col sm={{ size: 'auto', offset: 3 }} style={{ marginBottom: 40 }}>
            <h3>Fecha Inicial</h3>
            <Datepicker selected={this.state.startDate} onChange={this.handleChange} />
          </Col>
          <Col sm={{ size: 'auto', offset: 1 }} style={{ marginBottom: 40 }}>
            <h3>Fecha Final</h3>
            <Datepicker selected={this.state.startDate} onChange={this.handleChange} />
          </Col>
        </Row>
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <i className="fa fa-envelope-square"></i> Historial de Recargas
              </CardHeader>
              <CardBody>
                <Table hover bordered striped responsive size="sm">
                  <thead>
                    <tr>
                      <th>Telefono</th>
                      <th>Valor de la Recarga</th>
                      <th>Fecha</th>
                      <th>Hora</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>3102443226</td>
                      <td>$100.000</td>
                      <td>5/03/2018</td>
                      <td>10:08 pm</td>
                    </tr>
                    <tr>
                      <td>3102443226</td>
                      <td>$100.000</td>
                      <td>5/03/2018</td>
                      <td>10:08 pm</td>
                    </tr>
                    <tr>
                      <td>3102443226</td>
                      <td>$100.000</td>
                      <td>5/03/2018</td>
                      <td>10:08 pm</td>
                    </tr>
                    <tr>
                      <td>3102443226</td>
                      <td>$100.000</td>
                      <td>5/03/2018</td>
                      <td>10:08 pm</td>
                    </tr>
                    <tr>
                      <td>3102443226</td>
                      <td>$100.000</td>
                      <td>5/03/2018</td>
                      <td>10:08 pm</td>
                    </tr>
                    <tr>
                      <td>3102443226</td>
                      <td>$100.000</td>
                      <td>5/03/2018</td>
                      <td>10:08 pm</td>
                    </tr>
                    <tr>
                      <td>3102443226</td>
                      <td>$100.000</td>
                      <td>5/03/2018</td>
                      <td>10:08 pm</td>
                    </tr>
                    <tr>
                      <td>3102443226</td>
                      <td>$100.000</td>
                      <td>5/03/2018</td>
                      <td>10:08 pm</td>
                    </tr>
                    <tr>
                      <td>3102443226</td>
                      <td>$100.000</td>
                      <td>5/03/2018</td>
                      <td>10:08 pm</td>
                    </tr>
                    <tr>
                      <td>3102443226</td>
                      <td>$100.000</td>
                      <td>5/03/2018</td>
                      <td>10:08 pm</td>
                    </tr>
                    <tr>
                      <td>3102443226</td>
                      <td>$100.000</td>
                      <td>5/03/2018</td>
                      <td>10:08 pm</td>
                    </tr>
                    <tr>
                      <td>3102443226</td>
                      <td>$100.000</td>
                      <td>5/03/2018</td>
                      <td>10:08 pm</td>
                    </tr>
                    <tr>
                      <td>3102443226</td>
                      <td>$100.000</td>
                      <td>5/03/2018</td>
                      <td>10:08 pm</td>
                    </tr>
                    <tr>
                      <td>3102443226</td>
                      <td>$100.000</td>
                      <td>5/03/2018</td>
                      <td>10:08 pm</td>
                    </tr>
                    <tr>
                      <td>3102443226</td>
                      <td>$100.000</td>
                      <td>5/03/2018</td>
                      <td>10:08 pm</td>
                    </tr>
                    <tr>
                      <td>3102443226</td>
                      <td>$100.000</td>
                      <td>5/03/2018</td>
                      <td>10:08 pm</td>
                    </tr>
                    <tr>
                      <td>3102443226</td>
                      <td>$100.000</td>
                      <td>5/03/2018</td>
                      <td>10:08 pm</td>
                    </tr>
                    <tr>
                      <td>3102443226</td>
                      <td>$100.000</td>
                      <td>5/03/2018</td>
                      <td>10:08 pm</td>
                    </tr>
                    <tr>
                      <td>3102443226</td>
                      <td>$100.000</td>
                      <td>5/03/2018</td>
                      <td>10:08 pm</td>
                    </tr>
                    <tr>
                      <td>3102443226</td>
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