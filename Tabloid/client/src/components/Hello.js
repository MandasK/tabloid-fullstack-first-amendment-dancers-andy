import React from "react";
import { Jumbotron, Container, Row } from 'reactstrap';
import logo_transparent from '../components/Images/logo_transparent.png'
import "../components/Category/Category.css"

export default function Hello() {
  return (
    <>
    
    <Jumbotron style={{ background: "#414066", height: "30%" }} >
      <Container style={{ background: "#414066", height: "30%" }}>
          <img src={logo_transparent} alt="logo" />
    </Container>
    </Jumbotron>
    </>
    
  );
}