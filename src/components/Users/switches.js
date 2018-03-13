import React, { Component } from "react";
import { Row, Col, Card, CardHeader, CardBody, Label, Input, Table } from 'reactstrap';

class Switches extends Component {
  render() {
    const { handleChangeSwitch, defaultChecked } = this.props
    return (
      <div className="animated fadeIn">
        <Label className="switch switch-text switch-success">
          <Input type="checkbox" onClick={handleChangeSwitch} className="switch-input" defaultChecked={defaultChecked} />
          <span className="switch-label" data-on="Si" data-off="No"></span>
          <span className="switch-handle"></span>
        </Label>
        &nbsp;&nbsp;&nbsp;
      </div>
    )
  }
}

export default Switches;