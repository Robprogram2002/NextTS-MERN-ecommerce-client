import { useState, useEffect, FormEvent } from 'react';
// import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { auth } from '../firebase';

import { useAppSelector, useAppDispatch } from '../hooks/redux_hooks';
import { registerUser } from '../store/user/user_actions';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useAppDispatch();
  const router = useRouter();

  const userState = useAppSelector((state) => state.userState);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      const { user } = response;

      if (!user) throw new Error('soemthing went wrong with firebase auth');

      dispatch(
        registerUser({
          email: user.email!,
          username: user.displayName!,
          imageUrl: user.photoURL,
        })
      );

      await user.sendEmailVerification();
      console.log('email verification send');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (userState && userState.authToken) router.push('/');
  }, [userState]);

  const registerForm = () => (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        className="form-control"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email"
      />
      <input
        type="password"
        className="form-control"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />

      <br />

      <button type="submit" className="btn btn-raised">
        Register
      </button>
    </form>
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
