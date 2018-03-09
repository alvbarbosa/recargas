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

class Record extends Component {
  state = {
    startDate: moment().hour(0).minute(0).second(0).subtract(7, 'days'),
    endDate: moment().hour(0).minute(0).second(0),
    user: null,
    data: null,
  }

  handleChangeStart = date => {
    this.setData(date, this.state.endDate)
  }
  handleChangeEnd = date => {
    this.setData(this.state.startDate, date)
  }

  componentWillMount = () => {
    firebase.auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({
          user
        })
        this.setData(this.state.startDate, this.state.endDate)
      } else {
        this.props.history.push('/login')
      }
    })
  };

  setData = (startDate, endDate) => {
    const { user } = this.state
    const refData = firebase
      .database
      .ref(`/recharge/${user.uid}`)
      .orderByChild("date")
      .startAt(startDate.toDate().getTime())
      .endAt(endDate.toDate().getTime() + 86400000)
    refData.once('value').then(snapshot => {
      const items = snapshot.val()
      this.setState({
        startDate,
        endDate,
        data: Object.keys(items).map(function (key) { return items[key]; }),
      })
    }).catch(err => {
      this.setState({
        data: [],
        startDate,
        endDate,
      })
    });
  }


  render() {
    let dataRecharge = null
    if (this.state.data) {
      dataRecharge = this.state.data.map((item, index) => {
        return (
          <tr key={index} >
            <td>{item.numberCel}</td>
            <td>{item.valueCel}</td>
            <td>{(new Date(item.date)).toLocaleString()}</td>
            <td><span className="badge badge-success">Active</span></td>
          </tr>
        )
      })
    }
    return (
      <div>
        <Row>
          <Col sm={{ size: 'auto', offset: 3 }} style={{ marginBottom: 40 }}>
            <h3>Fecha Inicial</h3>
            <Datepicker selected={this.state.startDate} onChange={this.handleChangeStart} />
          </Col>
          <Col sm={{ size: 'auto', offset: 1 }} style={{ marginBottom: 40 }}>
            <h3>Fecha Final</h3>
            <Datepicker selected={this.state.endDate} onChange={this.handleChangeEnd} />
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