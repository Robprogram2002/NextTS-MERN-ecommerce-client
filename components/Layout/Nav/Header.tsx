import { useState } from 'react';
import { Menu } from 'antd';
import {
  AppstoreOutlined,
  SettingOutlined,
  UserOutlined,
  UserAddOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
// import { useRouter } from 'next/router';
import Link from 'next/Link';
import { useAppSelector, useAppDispatch } from '../../../hooks/redux_hooks';
import { logoutRequest } from '../../../store/user/user_actions';
import firebaseApp from '../../../firebase';

const { SubMenu, Item } = Menu;

const Header = () => {
  const [current, setCurrent] = useState('home');

  const dispatch = useAppDispatch();
  const { authenticated, email } = useAppSelector((state) => state.userState);

  // const history = useRouter();

  const handleClick = (e: any) => {
    e.preventDefault();
    setCurrent('clicked');
  };

  const logout = () => {
    firebaseApp.auth().signOut();
    dispatch(logoutRequest());
  };

  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
      <Item key="home" icon={<AppstoreOutlined />}>
        <Link href="/">Home</Link>
      </Item>

      {!authenticated && (
        <Item key="register" icon={<UserAddOutlined />} className="float-right">
          <Link href="/register">Register</Link>
        </Item>
      )}

      {!authenticated && (
        <Item key="login" icon={<UserOutlined />} className="float-right">
          <Link href="/login">Login</Link>
        </Item>
      )}

      {authenticated && (
        <SubMenu
          icon={<SettingOutlined />}
          title={email!.split('@')[0]}
          className="float-right"
          key="options"
        >
          <Item key="setting:1">Option 1</Item>
          <Item key="setting:2">Option 2</Item>
          <Item icon={<LogoutOutlined />} onClick={logout}>
            Logout
          </Item>
        </SubMenu>
      )}
    </Menu>
  );
};

export default Header;
