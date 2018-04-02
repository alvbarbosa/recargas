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

import { firebase } from "../../firebase";
import { formatCurrency } from "../../utils";

class Record extends Component {
  state = {
    startDate: moment().hour(0).minute(0).second(0).subtract(7, 'days'),
    endDate: moment().hour(0).minute(0).second(0),
    user: null,
    data: null,
    filterData: []
  }

  handleChangeStart = date => {
    this.setFilterData(date, this.state.endDate)
  }
  handleChangeEnd = date => {
    this.setFilterData(this.state.startDate, date)
  }

  componentWillMount = () => {
    firebase.auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({
          user
        })
        this.setData()
      } else {
        this.props.history.push('/login')
      }
    })
  };

  setData = () => {
    const { user } = this.state
    let uid = ""
    if (this.props.location.state)
      uid = this.props.location.state.uid
    else
      uid = user.uid

    const refData = firebase
      .database
      .ref(`recharge`)
      .orderByChild('uid')
      .equalTo(uid)
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

  setFilterData = (startDate, endDate) => {
    this.setState({
      startDate,
      endDate,
      filterData: this.state.data.filter(e => {
        return e.timestamp >= startDate.toDate().getTime() && e.timestamp <= (endDate.toDate().getTime() + 86400000)
      })
    })
  }

  statusRecharge = status => {
    switch (status) {
      case 1:
        return <span className="badge badge-success">Procesado</span>
      case 2:
        return <span className="badge badge-danger">Rechazado</span>
      default:
        return <span className="badge badge-light">En espera</span>
        break;
    }
  }

  render() {
    let dataRecharge = null
    if (this.state.data) {
      dataRecharge = this.state.filterData.map((item, index) => {
        return (
          <tr key={index} >
            <td>{item.numberCel}</td>
            <td>{formatCurrency(parseFloat(item.valueCel), "$")}</td>
            <td>{(new Date(item.timestamp)).toLocaleString()}</td>
            <td>{this.statusRecharge(item.status)}</td>
          </tr>
        )
      })
    }
    return (
      <div>
        <Row>
          <Col className="fechas" sm={{ size: 'auto', offset: 4 }} style={{ marginBottom: 40 }}>
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
                <h3><i className="fa fa-envelope-square"></i> Historial de Recargas</h3>
              </CardHeader>
              <CardBody>
                <Table className="text-center" responsive size="sm">
                  <thead>
                    <tr>
                      <th>Telefono</th>
                      <th>Valor de la Recarga</th>
                      <th>Fecha</th>
                      <th>Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataRecharge}
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