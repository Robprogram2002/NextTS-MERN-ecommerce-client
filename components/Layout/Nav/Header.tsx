import { useState } from 'react';
import { Badge, Menu } from 'antd';
import {
  AppstoreOutlined,
  SettingOutlined,
  UserOutlined,
  UserAddOutlined,
  LogoutOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';
import Link from 'next/Link';
import { useRouter } from 'next/router';
import Search from '../../Forms/Search';
import { useAppSelector, useAppDispatch } from '../../../hooks/redux_hooks';
import { logoutRequest } from '../../../store/user/user_actions';
import firebaseApp from '../../../firebase';
import styles from './Header.module.scss';

const { SubMenu, Item } = Menu;

const Header = () => {
  const [current, setCurrent] = useState('home');

  const dispatch = useAppDispatch();
  const { authenticated, email, role, cart } = useAppSelector(
    (state) => state.userState
  );

  const router = useRouter();

  const getCartLength = () => {
    if (authenticated) {
      return cart.products.length;
    }

    // if (Window) {
    //   const localCart = localStorage.getItem('cart');

    //   if (localCart) {
    //     return JSON.parse(localCart).products.length;
    //   }
    // }

    return null;
  };

  const handleClick = () => {
    // e.preventDefault();
    setCurrent('clicked');
  };

  const logout = () => {
    firebaseApp.auth().signOut();
    dispatch(logoutRequest());
    router.push('/');
  };

  return (
    <Menu
      onClick={handleClick}
      selectedKeys={[current]}
      mode="horizontal"
      className={styles.Menu}
    >
      <div className={styles.Left}>
        <Item key="home" icon={<AppstoreOutlined />}>
          <Link href="/">Home</Link>
        </Item>

        <Item key="shop" icon={<ShoppingOutlined />}>
          <Link href="/shop">Shop</Link>
        </Item>

        <Item key="cart" icon={<ShoppingCartOutlined />}>
          <Link href="/user/cart">
            <Badge count={getCartLength()} offset={[9, 0]}>
              Cart
            </Badge>
          </Link>
        </Item>
      </div>

      <div className={styles.Right}>
        <span className="float-right p-1">
          <Search />
        </span>

        {!authenticated && (
          <Item
            key="register"
            icon={<UserAddOutlined />}
            className="float-right"
          >
            <Link href="/auth/register">Register</Link>
          </Item>
        )}

        {!authenticated && (
          <Item key="login" icon={<UserOutlined />} className="float-right">
            <Link href="/auth/login">Login</Link>
          </Item>
        )}

        {authenticated && (
          <SubMenu
            icon={<SettingOutlined />}
            title={email!.split('@')[0]}
            className="float-right"
          >
            {role === 'subscriber' && (
              <Item key="setting:1">
                <Link href="/user/dashboard">My Dashboard </Link>
              </Item>
            )}

            {role === 'admin' && (
              <Item key="setting:1">
                <Link href="/admin/dashboard">Dashboard</Link>
              </Item>
            )}

            <Item icon={<LogoutOutlined />} onClick={logout}>
              Logout
            </Item>
          </SubMenu>
        )}
      </div>
    </Menu>
  );
};

export default Header;
