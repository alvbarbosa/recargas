import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import {
  Badge,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Dropdown
} from 'reactstrap';

import { auth } from "../../firebase";

class HeaderDropdown extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  handleSingOut = event => {
    auth.doSignOut().then(() => {
      alert("se cerro la sesión")
      this.props.history.push('/')
    })
  }

  dropAccnt() {
    return (
      <Dropdown nav isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle className="text-center" nav>
          <img src={'img/avatars/6.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com"/>
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem onClick={() => { this.props.history.push('/profile') }}><i className="fa fa-user"></i> Perfil</DropdownItem>
          <DropdownItem><i className="fa fa-wrench"></i> Configuracion</DropdownItem>
          <DropdownItem onClick={this.handleSingOut} ><i className="fa fa-lock"></i> Cerrar Sesion</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }

  render() {
    const { ...attributes } = this.props;
    return (
      this.dropAccnt()
    );
  }
}

export default withRouter(HeaderDropdown);