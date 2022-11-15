import React from "react";
import { Button, Space, Input, Col, Row, Form, Checkbox, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import Web3Context, { getContract } from "../../context/Web3Context";
import { TodoList } from "../../contracts";

export default function AddTodo() {
  const navigate = useNavigate();
  const { web3Contract } = getContract(TodoList.abi, TodoList.address);
  const { currentAccount, loading, setLoading } = Web3Context();
  const onFinish = async (value) => {
    try {
      setLoading(true);
      await web3Contract.methods
        .addTodoItem(value.title, value.content, value.status)
        .send({ from: currentAccount.address });
      setLoading(false);
      navigate("/");
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <Spin spinning={loading}>
      <Row className="addTodo">
        <Col span={24}>
          <Space direction="vertical" size="middle" style={{ display: "flex" }}>
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
                <Input style={{ borderRadius: 10 }} size="large" />
              </Form.Item>

              <Form.Item
                label="Content"
                name="content"
                rules={[{ required: true, message: "Please input content!" }]}
              >
                <Input style={{ borderRadius: 10 }} size="large" />
              </Form.Item>

              <Form.Item label="Status" name="status" valuePropName="checked">
                <Checkbox />
              </Form.Item>
              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                  Add Todo
                </Button>
              </Form.Item>
            </Form>
          </Space>
        </Col>
      </Row>
    </Spin>
  );
}
