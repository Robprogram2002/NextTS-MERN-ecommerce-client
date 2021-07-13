import { FC, useState, useEffect, FormEvent } from 'react';
import { toast } from 'react-toastify';
import { Button } from 'antd';
import { MailOutlined, GoogleOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import Link from 'next/Link';
import { googleProvider, auth } from '../firebase';
import { useAppDispatch, useAppSelector } from '../hooks/redux_hooks';
import { loginRequest } from '../store/user/user_actions';

const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const userState = useAppSelector((state) => state.userState);
  const { redirectTo } = useAppSelector((state) => state.appState);
  const router = useRouter();

  useEffect(() => {
    if (userState && userState.authenticated) router.push('/');
  }, [userState]);

  useEffect(() => {
    if (redirectTo && userState.authenticated) {
      router.push(redirectTo);
    }
  }, [redirectTo]);

  const dispatch = useAppDispatch();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // console.table(email, password);
    try {
      const result = await auth.signInWithEmailAndPassword(email, password);
      const { user } = result;

      if (!user) {
        throw new Error('something went wrong with firebase');
      }

      if (!user.emailVerified) {
        return toast.error('the email has not been verified yet');
      }

      const authResult = await user.getIdTokenResult();

      setLoading(false);
      return dispatch(loginRequest({ authResult, redirectTo: '/' }));
    } catch (error) {
      setLoading(false);
      if (error.code === 'auth/user-not-found') {
        return toast.error('There is no user with this identifiers.');
      }
      if (error.code === 'auth/wrong-password') {
        return toast.error('The password is invalid');
      }
      return toast.error(error.message);
    }
  };

  const googleLogin = async () => {
    auth
      .signInWithPopup(googleProvider)
      .then(async (result) => {
        const { user } = result;

        if (!user) {
          throw new Error('something went wrong with firebase');
        }
        const authResult = await user.getIdTokenResult();

        dispatch(loginRequest({ authResult, redirectTo: '/' }));
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const loginForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email"
        />
      </div>

      <div className="form-group">
        <input
          type="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Your password"
        />
      </div>

      <br />
      <Button
        onClick={handleSubmit}
        type="primary"
        className="mb-3"
        block
        shape="round"
        icon={<MailOutlined />}
        size="large"
        disabled={!email || password.length < 6}
      >
        Login with Email/Password
      </Button>
    </form>
  );

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          {loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
            <h4>Login</h4>
          )}
          {loginForm()}

          <Button
            onClick={googleLogin}
            type="ghost"
            className="mb-3"
            block
            shape="round"
            icon={<GoogleOutlined />}
            size="large"
          >
            Login with Google
          </Button>

          <Link href="/forgot/password">
            <span className="float-right text-danger">Forgot Password</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
