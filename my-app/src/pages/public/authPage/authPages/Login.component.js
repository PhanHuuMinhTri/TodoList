import React from "react";
import {  Button, Row, Col } from "antd";
import Web3Context from "../../../../context/Web3Context";

export default function Login() {
  const {connectMetaMask} = Web3Context()

  return (
    <>
      <Row>
        <Col span={24}>
         <Button onClick={connectMetaMask}>ConnectMetaMaskk</Button>
        </Col>
      </Row>
    </>
  );
}
