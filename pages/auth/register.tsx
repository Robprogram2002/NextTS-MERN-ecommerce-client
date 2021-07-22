import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { Field, Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { auth } from '../../firebase';

import { useAppSelector, useAppDispatch } from '../../hooks/redux_hooks';
import { registerUser } from '../../store/user/user_actions';
import styles from '../../styles/login.module.scss';

const signupValidationSchema = Yup.object().shape({
  email: Yup.string().email('add a valid email address'),
  password: Yup.string()
    .trim()
    .min(6, 'password must be at least 6 charcters long')
    .max(50, 'password is too large'),
  username: Yup.string()
    .trim()
    .min(3, 'username must be at least 3 characters long')
    .max(50, 'username too long'),
});

const Register = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const userState = useAppSelector((state) => state.userState);

  useEffect(() => {
    if (userState && userState.authenticated) router.push('/');
  }, [userState]);

  const registerForm = () => (
    <Formik
      initialValues={{ email: '', password: '', username: '' }}
      validationSchema={signupValidationSchema}
      onSubmit={async (values, actions) => {
        try {
          const { email, password, username } = values;
          const response = await auth.createUserWithEmailAndPassword(
            email,
            password
          );
          const { user } = response;

          if (!user) throw new Error('soemthing went wrong with firebase auth');

          dispatch(
            registerUser({
              email: user.email!,
              username,
            })
          );

          user.updateProfile({
            displayName: username,
          });

          await user.sendEmailVerification();
          toast.success('an email verication was send to your email address');

          router.push('/auth/login');
          actions.resetForm();
        } catch (error) {
          actions.resetForm();
          toast.error(error.message);
        }
      }}
      validateOnBlur
      validateOnChange
    >
      {({ isSubmitting, errors }) => (
        <Form>
          <div className="form-group">
            <Field
              type="text"
              className="form-control"
              name="username"
              placeholder="Your username"
            />
            <ErrorMessage
              name="username"
              render={(error) => (
                <span className={styles.ErrorText}> {error} </span>
              )}
            />
          </div>

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
            Register
          </button>
        </Form>
      )}
    </Formik>
  );

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Register</h4>
          {registerForm()}
        </div>
      </div>
    </div>
  );
};

export default Register;
