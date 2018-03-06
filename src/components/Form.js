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
  InputGroupText
} from 'reactstrap';

export const FormComponent = props => {
  return (
    <Row>
      <Col>
        <Card style={{ fontSize: 30 }}>
          <CardHeader>
            <div className="text-center">Recargas</div>
              </CardHeader>
          <CardBody>
            <Form action="" method="post">
              <FormGroup style={{ marginTop: 20, marginBottom: 40,}}>  
                <InputGroup size="lg">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText><i className="fa fa-phone"></i></InputGroupText>
                  </InputGroupAddon>
                  <Input type="text" id="username" name="username" placeholder="Telefono" />
                </InputGroup>
              </FormGroup>
              <FormGroup style={{ marginTop: 20, marginBottom: 40 }}>
                <InputGroup size="lg">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText><i className="fa fa-usd"></i></InputGroupText>
                  </InputGroupAddon>
                  <Input type="email" id="email" name="email" placeholder="Valor" />
                </InputGroup>
              </FormGroup>
              <FormGroup style={{ marginTop: 20, marginBottom: 40 }}>
                <InputGroup size="lg">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText><i className="fa fa-asterisk"></i></InputGroupText>
                  </InputGroupAddon>
                  <Input type="password" id="password" name="password" placeholder="Operador" />
                </InputGroup>
              </FormGroup>
              <FormGroup className="form-actions text-center" style={{ marginTop: 20}}>
                <Button style={{ borderRadius: 5 }} type="submit" size="lg" color="success">Recargar</Button>
              </FormGroup>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </Row>
  )
}
