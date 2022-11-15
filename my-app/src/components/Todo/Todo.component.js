import React from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Tooltip, Row, Col, Space, message } from "antd";
import Web3Context, { getContract } from "../../context/Web3Context";
import { TodoList } from "../../contracts";
import { useNavigate } from "react-router-dom";

export default function Todo(props) {
  const { content, id, getListTodo } = props;
  const navigate = useNavigate();

  const { currentAccount, loading, setLoading } = Web3Context();
  console.log("loadi1111ng", loading);
  const { web3Contract } = getContract(TodoList.abi, TodoList.address);
  const handleEditClick = () => {
    navigate(`/${id}`, { replace: true });
  };

  const handleDeleteClick = async (id) => {
    try {
      setLoading(true);
      await web3Contract.methods
        .removeTodoItem(id)
        .send({ from: currentAccount.address });
      await getListTodo(currentAccount.address);
      setLoading(false);
      message.success("Delete Todo Success!");
    } catch (e) {
      console.log(e);
      setLoading(false);
      message.error("Delete Todo Failed!");
    }
  };

  return (
    <Row>
      <Col span={15}>
        <p className="test">Content: {content}</p>
      </Col>

      <Col span={8}>
        <Space>
          <Tooltip title="Delete">
            <Button
              type="primary"
              danger
              shape="circle"
              icon={<DeleteOutlined />}
              onClick={() => {
                handleDeleteClick(id);
              }}
            />
          </Tooltip>
          <Tooltip title="Edit">
            <Button
              type="primary"
              shape="circle"
              icon={<EditOutlined />}
              onClick={handleEditClick}
            />
          </Tooltip>
        </Space>
      </Col>
    </Row>
  );
}
