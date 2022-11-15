import React, { useEffect, useState } from "react";
import { List, Row, Col, Divider, Skeleton } from "antd";

import { Todo } from "../../components";
import Web3Context, { getContract } from "../../context/Web3Context";
import { TodoList } from "../../contracts";

const ListTodo = () => {
  const [listTodo, setListTodo] = useState([]);

  const { currentAccount, loading, setLoading } = Web3Context();
  const { web3Contract } = getContract(TodoList.abi, TodoList.address);

  useEffect(() => {
    if (currentAccount.balance) {
      getListTodo(currentAccount.address);
    }
  }, [currentAccount]);

  const getListTodo = async (address) => {
    try {
      setLoading(true);
      const listId = await web3Contract.methods
        .getTodoIdsByUser(address)
        .call({ from: address });

      const listTd = [];

      for (let x of listId) {
        if (x > 0) {
          let todo = await web3Contract.methods
            .getTodoItem(x)
            .call({ from: address });
          listTd.push(todo);
        }
      }
      setListTodo(listTd);
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  return (
    <Skeleton loading={loading}>
      <Row className="listTodo">
        <Divider plan="true">LIST TODO</Divider>
        <Col span={24}>
          <List
            itemLayout="vertical"
            size="large"
            pagination={{
              defaultCurrent: 1,
              pageSize: 3,
            }}
            dataSource={listTodo}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta title={<p>FOR:{item.title}</p>} />
                <Todo
                  title={item.title}
                  content={item.content}
                  id={item.id}
                  key={item.id}
                  listTodo={listTodo}
                  setListTodo={setListTodo}
                  getListTodo={getListTodo}
                />
              </List.Item>
            )}
          />
        </Col>
      </Row>
    </Skeleton>
  );
};

export default ListTodo;
