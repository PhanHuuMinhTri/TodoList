import { Menu, Row, Col } from "antd";
import { Link, Outlet, useLocation } from "react-router-dom";
import "./header.scss";
const items = [
  {
    label: <Link to='/login'>Login</Link>,
    key: "/login",
  }
];
export default function HeaderPublic() {
  const location = useLocation();
  return (
    <>
      <div className='layout-header'>
        <Row>
          <Col span={24}>
            <Menu
              className='main-menu'
              mode='horizontal'
              selectedKeys={[location.pathname]}
              items={items}
            />
          </Col>
        </Row>
      </div>
      <Outlet />
    </>
  );
}
