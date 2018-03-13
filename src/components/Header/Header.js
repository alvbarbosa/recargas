import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import {
  Nav,
  NavItem,
  NavLink,
  Badge,
  Row,
  Col,
  NavbarToggler,
  NavbarBrand
} from 'reactstrap';

import HeaderDropdown from './HeaderDropdown';
import Widget02 from '../Widget02';
import { formatCurrency } from "../../utils";

class Header extends Component {
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

  sidebarToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-hidden');
  }

  sidebarMinimize(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-minimized');
  }

  mobileSidebarToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-mobile-show');
  }

  render() {
    return (
      <header className="app-header navbar">
        <NavbarToggler className="d-lg-none" onClick={this.mobileSidebarToggle}>
          <span className="navbar-toggler-icon"></span>
        </NavbarToggler>
        <NavbarBrand href="#"></NavbarBrand>
        <NavbarToggler className="d-md-down-none mr-auto" onClick={this.sidebarToggle}>
          <span className="navbar-toggler-icon"></span>
        </NavbarToggler>
        <Nav className="ml-auto" navbar>
          <Widget02 style={{ width: 200 }} header={formatCurrency(parseFloat(this.props.balance), "$")} mainText="Saldo" icon="fa fa-laptop" color="cyan" />
          <NavItem className="d-md-down-none icono-mensaje">
            <NavLink onClick={() => { this.props.history.push('/message') }}><i className="icon-bubbles"></i></NavLink>
          </NavItem>
          <HeaderDropdown />
        </Nav>
      </header>
    );
  }
}

export default withRouter(Header);
