import { ToastContainer, toast } from 'react-toastify';
import { FC, useEffect } from 'react';
import { useAppSelector } from '../hooks/redux_hooks';

const ToastWrapper: FC = ({ children }) => {
  const { errorMessage, successMessage, warnningMessage } = useAppSelector(
    (state) => state.appState
  );

  const succesNotification = (message: string) =>
    toast.success(message, {
      autoClose: 4000,
    });

  const errorNotification = (message: string) =>
    toast.error(message, {
      autoClose: 4000,
    });

  const warningNotification = (message: string) =>
    toast.warning(message, {
      autoClose: 4000,
    });

  useEffect(() => {
    if (successMessage) {
      succesNotification(successMessage);
    }
  }, [successMessage]);

  useEffect(() => {
    if (errorMessage) {
      errorNotification(errorMessage);
    }
  }, [errorMessage]);

  useEffect(() => {
    if (warnningMessage) {
      warningNotification(warnningMessage);
    }
  }, [warnningMessage]);

  return (
    <>
      <ToastContainer />
      {children}
    </>
  );
};

export default ToastWrapper;
