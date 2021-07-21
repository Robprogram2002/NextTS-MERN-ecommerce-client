/* eslint-disable react/jsx-props-no-spreading */
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import 'antd/dist/antd.css';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import axios from 'axios';
import Header from '../components/Layout/Nav/Header';
import store from '../store/index';
import InitialWrapper from '../components/InitialWrapper';
import ToastWrapper from '../components/ToastWrapper';

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API;
axios.defaults.withCredentials = true;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Header />
      <InitialWrapper>
        <ToastWrapper>
          <Component {...pageProps} />
        </ToastWrapper>
      </InitialWrapper>
    </Provider>
  );
}
export default MyApp;
