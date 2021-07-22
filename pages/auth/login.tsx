import { FC, useEffect } from 'react';
import { toast } from 'react-toastify';
import { GoogleOutlined, MailOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import Link from 'next/Link';
import { Field, Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { googleProvider, auth } from '../../firebase';
import { useAppDispatch, useAppSelector } from '../../hooks/redux_hooks';
import { loginRequest } from '../../store/user/user_actions';
import { appStateActions } from '../../store/app/app_slice';
import styles from '../../styles/login.module.scss';

const signupValidationSchema = Yup.object().shape({
  email: Yup.string().email('add a valid email address'),
  password: Yup.string()
    .trim()
    .min(6, 'password must be at least 6 charcters long')
    .max(50, 'password is too large'),
});

const Login: FC = () => {
  const { authenticated, role } = useAppSelector((state) => state.userState);
  const { redirectTo, loading, afterLogin } = useAppSelector(
    (state) => state.appState
  );
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (authenticated) router.push('/');
  }, [authenticated]);

  useEffect(() => {
    if (role === 'admin' && authenticated) {
      router.push('/admin/dashboard');
    }
    if (redirectTo && authenticated) {
      router.push(redirectTo);
    }
    dispatch(appStateActions.clearRedirect());
    dispatch(appStateActions.setLoading(false));
  }, [redirectTo]);

  const googleLogin = async () => {
    auth
      .signInWithPopup(googleProvider)
      .then(async (result) => {
        const { user } = result;

        if (!user) {
          throw new Error('something went wrong with firebase');
        }
        const authResult = await user.getIdTokenResult();

        dispatch(loginRequest({ authResult, redirectTo: afterLogin || '/' }));
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const loginForm = () => (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={signupValidationSchema}
      onSubmit={async (values, actions) => {
        try {
          dispatch(appStateActions.setLoading(true));
          const { email, password } = values;
          const result = await auth.signInWithEmailAndPassword(email, password);
          const { user } = result;

          if (!user) {
            throw new Error('something went wrong with firebase');
          }

          if (!user.emailVerified) {
            return toast.error('the email has not been verified yet');
          }

          const authResult = await user.getIdTokenResult();

          actions.resetForm();
          return dispatch(loginRequest({ authResult, redirectTo: '/' }));
        } catch (error) {
          dispatch(appStateActions.setLoading(false));

          if (error.code === 'auth/user-not-found') {
            return toast.error('There is no user with this identifiers.');
          }
          if (error.code === 'auth/wrong-password') {
            return toast.error('The password is invalid');
          }
          return toast.error(error.message);
        }
      }}
      validateOnBlur
      validateOnChange
    >
      {({ isSubmitting, errors }) => (
        <Form>
          <div className="form-group">
            <Field
              type="email"
              className="form-control"
              name="email"
              placeholder="Your email"
            />
            <ErrorMessage
              name="email"
              render={(error) => (
                <span className={styles.ErrorText}> {error} </span>
              )}
            />
          </div>

          <div className="form-group">
            <Field
              type="password"
              className="form-control"
              name="password"
              placeholder="Your password"
            />
            <ErrorMessage
              name="password"
              render={(error) => (
                <span className={styles.ErrorText}> {error} </span>
              )}
            />
          </div>

          <br />
          <button
            type="submit"
            className={`${styles.SubmitButton} ${styles.Email}`}
            disabled={isSubmitting || Object.keys(errors).length > 0}
          >
            <MailOutlined size={20} />{' '}
            <span style={{ marginLeft: '6px' }}>
              {' '}
              Login with Email/Password{' '}
            </span>
          </button>
        </Form>
      )}
    </Formik>
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

          <button
            onClick={googleLogin}
            type="button"
            className={`${styles.SubmitButton} ${styles.Google}`}
          >
            <GoogleOutlined size={20} />

            <span style={{ marginLeft: '6px' }}> Login with Google</span>
          </button>

          <Link href="/auth/reset-password">
            <span className="float-right text-danger">Forgot Password</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
