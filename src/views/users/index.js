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
  Form
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
    const snapshot = await firebase.database.ref('users').once('value')
    let listUsers = []
    snapshot.forEach(user => {
      const us = user.val()
      listUsers.push({
        key: user.key,
        username: us.username,
        email: us.email,
        enable: us.enable,
        admin: us.admin,
        balance: us.balance || "0",
      })
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
    userArray[userArray.findIndex(u => u.key == user.key)] = {
      key: user.key,
      username: us.username,
      email: us.email,
      enable: us.enable,
      admin: us.admin,
      balance: us.balance || "0",
    }
    this.setState({
      listUsers: userArray
    })
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
  toggleAdmin = key => {
    this.updateField('admin', key)
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

  handleModalApprove = () => {
    const { keyUser, valueUser } = this.state
    const newPostRef = firebase.database.ref('sales').push()
    const timestamp = (new Date()).getTime()
    newPostRef.set({
      uid: keyUser,
      value: valueUser,
      timestamp,
      admin: firebase.auth.currentUser.uid,
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

  render() {
    const { listUsers } = this.state
    return (
      <UsersComponent>
        <Table className="text-center" striped responsive>
          <thead>
            <tr>
              <th>Usuario</th>
              <th>E-mail</th>
              <th>Habilitar</th>
              <th>Administrador</th>
              <th>Saldo</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {listUsers.map((user, index) => (
              <tr key={user.key}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  <Switches
                    defaultChecked={user.enable}
                    handleChangeSwitch={() => this.toggleEnable(user.key)}
                  />
                </td>
                <td>
                  <Switches
                    defaultChecked={user.admin}
                    handleChangeSwitch={() => this.toggleAdmin(user.key)}
                  />
                </td>
                <td>{formatCurrency(parseFloat(user.balance), "$")}</td>
                <td>
                  <ButtonDropdown isOpen={this.state.dropdownOpen[index]} toggle={() => { this.toggle(index); }}>
                    <DropdownToggle className="menu-user text-dark" size="sm">
                      <i className="fa fa-ellipsis-h fa-lg mt-2"></i>
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem onClick={() => this.handleBalance(user.key)} >Recargar Saldo</DropdownItem>
                      <DropdownItem onClick={() => this.seeSales(user.key)}>Ver Compras</DropdownItem>
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