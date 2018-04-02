import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import {
  Table,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Input,
  Button,
  Form,
  FormGroup,
  Col,
  Label,
} from "reactstrap";

import Switches from '../../components/Users/switches'
import UsersComponent from '../../components/Users'
import { firebase } from "../../firebase";
import { formatCurrency } from "../../utils";
import { ProcessedRejectModal } from "../../components/modal";

class Users extends Component {
  state = {
    listUsers: [],
    dropdownOpen: [],
    isOpen: false,
    messageModal: "",
    successDisabled: false,
    keyUser: "",
    valueUser: ""
  }

  componentDidMount = async () => {
    let snapshot = null
    const { rol, uid } = this.props.user
    if (rol == 'admin') {
      snapshot = await firebase.database.ref('users').once('value')
    } else {
      snapshot = await firebase.database.ref('users').orderByChild('dist').equalTo(uid).once('value')
    }
    let listUsers = []
    snapshot.forEach(user => {
      const us = user.val()
      listUsers.push(this.createUser(user, us))
    })
    this.setState({
      listUsers,
      dropdownOpen: new Array(listUsers.length).fill(false)
    })
    this.usersRef().on('child_changed', user => { this.updateUser(user) });
  }

  componentWillUnmount = () => {
    this.usersRef().off('child_changed', user => { this.updateUser(user) });
  }


  updateUser = user => {
    const us = user.val()
    let userArray = this.state.listUsers
    userArray[userArray.findIndex(u => u.key == user.key)] = this.createUser(user, us)
    this.setState({
      listUsers: userArray
    })
  }

  createUser = (user, us) => {
    let rol = ""
    switch (us.rol) {
      case "admin":
        rol = "Administrador"
        break;
      case "dist":
        rol = "Distribuidor"
        break;
      default:
        rol = "Vendedor"
        break;
    }
    return {
      key: user.key,
      username: us.username,
      email: us.email,
      enable: us.enable,
      admin: us.admin,
      balance: us.balance || "0",
      rol,
      dist: us.dist
    }
  }

  usersRef = key => {
    return firebase.database.ref(`users/${key || ""}`)
  }
  updateField = (field, key) => {
    this.usersRef(key).transaction(post => {
      if (post[field]) {
        post[field] = false
      } else {
        post[field] = true
      }
      return post
    })
  }

  toggleEnable = key => {
    this.updateField('enable', key)
  }

  toggle(i) {
    const newArray = this.state.dropdownOpen.map((element, index) => { return (index === i ? !element : false); });
    this.setState({
      dropdownOpen: newArray
    });
  }

  handleBalance = key => {
    this.setState({
      isOpen: true,
      successDisabled: true,
      keyUser: key,
      messageModal:
        <div>
          <h5>Ingrese el valor</h5>
          <Form onSubmit={this.validateValue} className="d-flex flex-row" >
            <Input type="number" placeholder="Valor" required />
            <Button type="success" color="success" >OK</Button>
          </Form>
        </div>
    })
    setTimeout(() => {
      this.setState({
        isOpen: false
      })
    }, 1);
  }

  validateValue = event => {
    const value = formatCurrency(parseFloat(event.target.querySelector("input").value), "$")
    const username = this.state.listUsers
      .find(u => u.key == this.state.keyUser).username
    this.setState({
      successDisabled: false,
      valueUser: event.target.querySelector("input").value,
      messageModal: <h5>Recargar {value} a {username}</h5>,
    })
  }

  seeSales = key => {
    this.props.history.push({
      pathname: '/purchases',
      state: { uid: key }
    })
  }

  seeRecord = key => {
    this.props.history.push({
      pathname: '/record',
      state: { uid: key }
    })
  }

  handleModalApprove = () => {
    const key = firebase.auth.currentUser.uid
    const { keyUser, valueUser } = this.state

    if (this.props.user.rol == 'admin') {
      this.sendBalance(key)
    } else {
      firebase.database.ref(`users/${key}`).transaction(send => {
        if (send) {
          if (send.balance) {
            const balance = parseFloat(send.balance) - parseFloat(valueUser)
            if (balance > 0) {
              send.balance = balance
              this.sendBalance(key,keyUser,valueUser)
            } else {
              alert("No tienes suficiente saldo")
            }
          } else {
            alert("No tienes suficiente saldo")
          }
        }
        return send
      })
    }
  }

  sendBalance = (key,keyUser,valueUser) => {
    const newPostRef = firebase.database.ref('sales').push()
    const timestamp = (new Date()).getTime()
    newPostRef.set({
      uid: keyUser,
      value: valueUser,
      timestamp,
      admin: key,
    })
    firebase.database.ref(`users/${keyUser}`).transaction(post => {
      if (post) {
        if (post.balance) {
          post.balance = parseFloat(post.balance) + parseFloat(valueUser)
        } else {
          post.balance = valueUser
        }
      }
      return post
    })
  }

  handleModalReject = () => {

  }

  handleOptionChange = event => {
    const keyUser = event.target.name.substring(3, event.target.name.length)
    firebase.database.ref(`users/${keyUser}`).update({
      rol: event.target.value
    })
  }

  handleSelectChange = event => {
    const keyUser = event.target.name.substring(3, event.target.name.length)
    let rol = ""
    switch (event.target.selectedIndex) {
      case 0:
        rol = "admin"
        break;
      case 1:
        rol = "dist"
        break;
      default:
        rol = "seller"
        break;
    }
    firebase.database.ref(`users/${keyUser}`).update({
      rol
    })
  }

  handleSelectDist = event => {
    const keyUser = event.target.name.substring(3, event.target.name.length)
    const dist = event.target.selectedOptions[0].value == "Seleccione" ? "" : event.target.selectedOptions[0].value
    firebase.database.ref(`users/${keyUser}`).update({
      dist
    })
  }

  render() {
    const { listUsers } = this.state
    return (
      <UsersComponent>
        <Table striped responsive style={{ minHeight: 150 }} >
          <thead>
            <tr>
              <th>Usuario</th>
              <th>E-mail</th>
              {this.props.user.rol == 'admin' && <th>Habilitar</th>}
              {this.props.user.rol == 'admin' && <th>Rol</th>}
              {this.props.user.rol == 'admin' && <th>Dist</th>}
              <th>Saldo</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {listUsers.map((user, index) => (
              <tr key={user.key} >
                <td className="align-middle" >{user.username}</td>
                <td className="align-middle">{user.email}</td>
                {this.props.user.rol == 'admin' &&
                  <td className="align-middle">
                    <Switches
                      defaultChecked={user.enable}
                      handleChangeSwitch={() => this.toggleEnable(user.key)}
                    />
                  </td>}
                {this.props.user.rol == 'admin' &&
                  <td className="" style={{ fontSize: 12 }} >
                    <Input
                      type="select"
                      name={`sel${user.key}`}
                      bsSize="sm"
                      onChange={this.handleSelectChange}
                      value={user.rol}
                      style={{ width: '90%' }}
                    >
                      <option>Administrador</option>
                      <option>Distribuidor</option>
                      <option>Vendedor</option>
                    </Input>
                  </td>}
                {this.props.user.rol == 'admin' &&
                  <td className="" style={{ fontSize: 12 }} >
                    <Input
                      type="select"
                      name={`dis${user.key}`}
                      bsSize="sm"
                      onChange={this.handleSelectDist}
                      value={user.dist}
                      style={{ width: '90%' }}
                      disabled={user.rol == "Vendedor" ? false : true}
                    >
                      <option value="Seleccione">Seleccione</option>
                      {listUsers.filter(item => item.rol == 'Distribuidor').map((item, id) => (
                        <option key={id} value={item.key}>{item.username}/{item.email}</option>
                      ))}
                    </Input>
                  </td>}
                <td className="align-middle">{formatCurrency(parseFloat(user.balance), "$")}</td>
                <td className="align-middle">
                  <ButtonDropdown isOpen={this.state.dropdownOpen[index]} toggle={() => { this.toggle(index); }}>
                    <DropdownToggle className="menu-user text-dark" size="sm">
                      <i className="fa fa-ellipsis-h fa-lg mt-2"></i>
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem onClick={() => this.handleBalance(user.key)} >Recargar Saldo</DropdownItem>
                      <DropdownItem onClick={() => this.seeSales(user.key)}>Ver Compras</DropdownItem>
                      <DropdownItem onClick={() => this.seeRecord(user.key)}>Ver Recargas</DropdownItem>
                    </DropdownMenu>
                  </ButtonDropdown>
                </td>
              </tr>
            )
            )}
          </tbody>
        </Table>
        <ProcessedRejectModal
          isOpen={this.state.isOpen}
          message={this.state.messageModal}
          handleModalApprove={this.handleModalApprove}
          handleModalReject={this.handleModalReject}
          processed="Procesar"
          reject="Rechazar"
          successDisabled={this.state.successDisabled}
        />
      </UsersComponent>
    );
  }
}

export default withRouter(Users);