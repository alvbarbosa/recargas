import React, { Component } from 'react';
import {
  Nav,
  NavItem,
  NavLink,
  Badge,
  Row,
  Col,
  NavbarToggler,
  NavbarBrand,
} from 'reactstrap';
import HeaderDropdown from './HeaderDropdown';
import Widget02 from '../Widget02';

class Header extends Component {

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
          <Widget02 style={{ width: 200 }} header="$1.000.000" mainText="Saldo" icon="fa fa-laptop" color="cyan" />
          <NavItem className="d-md-down-none">
            <NavLink href="#"><i className="icon-bell"></i><Badge pill color="danger">5</Badge></NavLink>
          </NavItem>
          <HeaderDropdown />
        </Nav>
      </header>
    );
  }
}

export default Header;
