import { Menu } from "antd";
import { Link, Outlet, useLocation } from "react-router-dom";
import Web3Context from "../../context/Web3Context";

import "./header.scss";
const items = [
  {
    label: <Link to='/'>Home</Link>,
    key: "/",
  },
  {
    label: <Link to='/add'>Add</Link>,
    key: "/add",
  },
];
export default function HeaderPrivate({ setHasUser }) {
  const {disconnectWallet} = Web3Context()
  const location = useLocation();
  return (
    <>
      <div className='layout-header'>
        <Menu
          className='main-menu'
          mode='horizontal'
          items={[
            ...items,
            {
              label: (
                <p
                  onClick={disconnectWallet}
                >
                  Logout
                </p>
              ),
              key: "logout",
            },
          ]}
          selectedKeys={[location.pathname]}
        />
      </div>

      <Outlet />
    </>
  );
}
