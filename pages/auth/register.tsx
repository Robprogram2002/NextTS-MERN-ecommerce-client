import { useState, useEffect, FormEvent } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { auth } from '../../firebase';

import { useAppSelector, useAppDispatch } from '../../hooks/redux_hooks';
import { registerUser } from '../../store/user/user_actions';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const dispatch = useAppDispatch();
  const router = useRouter();

  const userState = useAppSelector((state) => state.userState);

  useEffect(() => {
    if (userState && userState.authenticated) router.push('/');
  }, [userState]);

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
          username,
        })
      );

      user.updateProfile({
        displayName: username,
      });

      await user.sendEmailVerification();
      toast.success('an email verication was send to your email address');

      router.push('/login');
    } catch (error) {
      toast.error(error.message);
    }
  };

  const registerForm = () => (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="form-control"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Your username"
      />
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
