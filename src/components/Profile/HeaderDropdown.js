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
          <img src={'img/avatars/9.png'} className="img-avatar" alt="admin@bootstrapmaster.com"/>
        </DropdownToggle>
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