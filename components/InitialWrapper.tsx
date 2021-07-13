import { useEffect, FC } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/redux_hooks';
import { meRequest } from '../store/user/user_actions';

const InitialWrapper: FC = ({ children }) => {
  const dispatch = useAppDispatch();
  const { initialLoading } = useAppSelector((state) => state.appState);

  useEffect(() => {
    dispatch(meRequest());
  }, []);

  return <div>{initialLoading ? <h1>Loading ...</h1> : children}</div>;
};

export default InitialWrapper;
