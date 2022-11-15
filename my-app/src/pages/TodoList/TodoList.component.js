/* eslint-disable react-hooks/exhaustive-deps */
import { Row, Col, Typography } from "antd";
import React from "react";
import "antd/dist/antd.min.css";
import RootNavigator from "../../navigation";
import Web3Context from "../../context/Web3Context";

const TodoList = () => {
  const { Paragraph } = Typography;
  const { currentAccount } = Web3Context();
  return (
    <div className="App">
      <div className="TodoList">
        <Row>
          <Col span={24}>
            <h1 style={{ textAlign: "center", fontSize: 40 }}>
              TodoApp Ethereum
            </h1>
          </Col>
          <Col span={22} offset={2}>
            <Paragraph> Address: {currentAccount.address}</Paragraph>
            <Paragraph> Balance: {currentAccount.balance}</Paragraph>
          </Col>
          <Col span={24}>
            <RootNavigator />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default TodoList;
