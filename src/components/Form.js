import React from 'react';
import {
  Row,
  Col,
  Button,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Card,
  CardHeader,
  CardFooter,
  CardBody,
  Collapse,
  Form,
  FormGroup,
  FormText,
  Label,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from 'reactstrap';

export const FormComponent = props => {
  return (
    <Row>
      <Col>
        <Card className="height-70vh" style={{ fontSize: 30 }}>
          <CardHeader>
            <div className="text-center">Recargas</div>
          </CardHeader>
          <CardBody>
            <Form onSubmit={props.handleRecharge}>
              <FormGroup style={{ marginTop: 61, marginBottom: 40, }}>
                <InputGroup size="lg">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText><i className="fa fa-phone"></i></InputGroupText>
                  </InputGroupAddon>
                  <Input
                    type="number"
                    min="3000000000"
                    max="3999999999"
                    id="cel"
                    name="cel"
                    placeholder="Telefono"
                    required
                    onChange={props.handleChangeCel}
                    value={props.valueCel}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup style={{ marginTop: 61, marginBottom: 40 }}>
                <InputGroup size="lg">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText><i className="fa fa-usd"></i></InputGroupText>
                  </InputGroupAddon>
                  <Input
                    type="number"
                    id="value"
                    name="value"
                    placeholder="Valor"
                    min="0"
                    onChange={props.handleChangeValue}
                    required
                    value={props.valueValue}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup className="form-actions text-center" style={{ marginTop: 61 }}>
                <Button style={{ borderRadius: 5 }} type="submit" size="lg" color="success">Recargar</Button>
              </FormGroup>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </Row>
  )
}

