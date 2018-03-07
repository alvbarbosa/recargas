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
        <Card className="height-70vh" style={{ fontSize: 30 }}>
          <CardHeader>
            <div className="text-center">Recargas</div>
          </CardHeader>
          <CardBody>
            <Form action="" method="post">
<<<<<<< HEAD
              <FormGroup style={{ marginTop: 61, marginBottom: 40,}}>  
=======
              <FormGroup style={{ marginTop: 20, marginBottom: 40, }}>
>>>>>>> b0ad66e5588dc36cef51a74262b55dcad7178bb4
                <InputGroup size="lg">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText><i className="fa fa-phone"></i></InputGroupText>
                  </InputGroupAddon>
                  <Input type="text" id="username" name="username" placeholder="Telefono" />
                </InputGroup>
              </FormGroup>
              <FormGroup style={{ marginTop: 61, marginBottom: 40 }}>
                <InputGroup size="lg">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText><i className="fa fa-usd"></i></InputGroupText>
                  </InputGroupAddon>
                  <Input type="email" id="email" name="email" placeholder="Valor" />
                </InputGroup>
              </FormGroup>
<<<<<<< HEAD
              <FormGroup className="form-actions text-center" style={{ marginTop: 61}}>
=======
              <FormGroup style={{ marginTop: 20, marginBottom: 40 }}>
                <InputGroup size="lg">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText><i className="fa fa-asterisk"></i></InputGroupText>
                  </InputGroupAddon>
                  <Input type="password" id="password" name="password" placeholder="Operador" />
                </InputGroup>
              </FormGroup>
              <FormGroup className="form-actions text-center" style={{ marginTop: 20 }}>
>>>>>>> b0ad66e5588dc36cef51a74262b55dcad7178bb4
                <Button style={{ borderRadius: 5 }} type="submit" size="lg" color="success">Recargar</Button>
              </FormGroup>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </Row>
  )
}

