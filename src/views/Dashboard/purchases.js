import React, { Component } from 'react';
import Datepicker from 'react-datepicker';
import moment from "moment";
import { withRouter } from "react-router-dom";
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

import { firebase } from "../../firebase";
import { formatCurrency } from "../../utils";

class Purchases extends Component {
  state = {
    startDate: moment().hour(0).minute(0).second(0).subtract(7, 'days'),
    endDate: moment().hour(0).minute(0).second(0),
    data: [],
  }

  componentWillMount = () => {
    let uid = ""
    if (this.props.location.state)
      uid = this.props.location.state.uid
    else
      uid = this.props.user.uid

    if (this.props.user) {
      const refData = firebase.database.ref(`sales`).orderByChild('uid').equalTo(uid)
      refData.once('value').then(snapshot => {
        const items = snapshot.val()
        this.setState({
          data: Object.keys(items).map(function (key) { return items[key]; }),
        })
        this.setFilterData(this.state.startDate, this.state.endDate)
      }).catch(err => {
        this.setState({
          data: [],
        })
      });
    }
  };

  setFilterData = (startDate, endDate) => {
    this.setState({
      startDate,
      endDate,
      filterData: this.state.data.filter(e => {
        return e.timestamp >= startDate.toDate().getTime() && e.timestamp <= (endDate.toDate().getTime() + 86400000)
      })
    })
  }

  handleChangeStart = date => {
    this.setFilterData(date, this.state.endDate)
  }
  handleChangeEnd = date => {
    this.setFilterData(this.state.startDate, date)
  }

  render() {
    let dataSales = null
    if (this.state.filterData) {
      dataSales = this.state.filterData.map((item, index) => {
        return (
          <tr key={index}>
            <td>{formatCurrency(parseFloat(item.value), "$")}</td>
            <td>{(new Date(item.timestamp)).toLocaleString()}</td>
          </tr>
        )
      })
    }
    return (
      <div>
        <Row>
          <Col className="fechas" xs={{ offset: 4 }} style={{ marginBottom: 40 }}>
            <Row>
              <Col>
                <h4 className="titulo"><i className="fa fa-calendar iconos"></i> Fecha Inicial</h4>
                <Datepicker selected={this.state.startDate} onChange={this.handleChangeStart} />
              </Col>
              <Col>
                <h4 className="titulo"><i className="fa fa-calendar iconos"></i> Fecha Final</h4>
                <Datepicker selected={this.state.endDate} onChange={this.handleChangeEnd} />
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
                <Table className="text-center" hover striped responsive size="sm">
                  <thead>
                    <tr>
                      <th>Valor</th>
                      <th>Fecha</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataSales}
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

export default withRouter(Purchases)