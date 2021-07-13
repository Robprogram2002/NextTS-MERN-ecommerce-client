/* eslint-disable react/jsx-props-no-spreading */
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import 'antd/dist/antd.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import axios from 'axios';
import Header from '../components/Layout/Nav/Header';
import store from '../store/index';
import InitialWrapper from '../components/InitialWrapper';

axios.defaults.baseURL = 'http://localhost:5000/api';
axios.defaults.withCredentials = true;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Header />
      <ToastContainer />
      <InitialWrapper>
        <Component {...pageProps} />
      </InitialWrapper>
    </Provider>
  );
}
export default MyApp;
