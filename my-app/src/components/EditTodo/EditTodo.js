import React, { useEffect, useState } from "react";
import { Button, Input, Col, Row, Form, Checkbox, message, Spin } from "antd";
import { useParams } from "react-router-dom";


import Web3Context, { getContract } from "../../context/Web3Context";
import { TodoList } from "../../contracts";

export default function EditTodo() {
  const [todo, setTodo] = useState(null);

  const { web3Contract } = getContract(TodoList.abi, TodoList.address);
  const { currentAccount, loading, setLoading } = Web3Context();

  const id = useParams().id;
  
  const getTodoItem = async (id) => {
    await setTodo(
      await web3Contract.methods
        .getTodoItem(id)
        .call({ from: currentAccount.address })
    );
  };

  useEffect(() => {
    if (id) {
      getTodoItem(id);
    }
  }, []);

  const onFinish = async (value) => {
    try {
      setLoading(true);
      await web3Contract.methods
        .editTodoItem(id, value.title, value.content, value.status)
        .send({ from: currentAccount.address });
      message.success("Edit Todo Success!");
      setLoading(false);
    } catch (error) {
      console(error);
      setLoading(false);
    }
  };

  return (
    <Spin spinning={loading}>
      <Row className="addTodo">
        <Col span={24}>
          {todo && (
            <Form
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 14 }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              autoComplete="off"
            >
              <Form.Item
                label="Title"
                name="title"
                rules={[{ required: true, message: "Please input title!" }]}
              >
                <Input
                  style={{ borderRadius: 10 }}
                  placeholder={todo.title}
                  size="large"
                />
              </Form.Item>

              <Form.Item
                label="Content"
                name="content"
                rules={[{ required: true, message: "Please input content!" }]}
              >
                <Input
                  style={{ borderRadius: 10 }}
                  placeholder={todo.content}
                  size="large"
                />
              </Form.Item>

              <Form.Item label="Status" name="status">
                <Checkbox defaultChecked={todo.status} />
              </Form.Item>
              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                  Edit Todo
                </Button>
              </Form.Item>
            </Form>
          )}
        </Col>
      </Row>
    </Spin>
  );
}
