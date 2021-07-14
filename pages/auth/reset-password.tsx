import { useState, useEffect, FormEvent } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { auth } from '../../firebase';
import { useAppSelector } from '../../hooks/redux_hooks';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const { authenticated } = useAppSelector((state) => state.userState);
  const router = useRouter();

  useEffect(() => {
    if (authenticated) router.push('/');
  }, [authenticated]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const config = {
      url:
        process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT ||
        'http://localhost:3000/auth/login',
      handleCodeInApp: true,
    };

    await auth
      .sendPasswordResetEmail(email, config)
      .then(() => {
        setEmail('');
        setLoading(false);
        toast.success('Check your email for password reset link');
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.message);
      });
  };

  return (
    <div className="container col-md-6 offset-md-3 p-5">
      {loading ? (
        <h4 className="text-danger">Loading</h4>
      ) : (
        <h4>Forgot Password</h4>
      )}

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Type your email"
        />
        <br />
        <button type="submit" className="btn btn-raised" disabled={!email}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
