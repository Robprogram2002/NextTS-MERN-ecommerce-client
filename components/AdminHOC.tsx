import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAppSelector } from '../hooks/redux_hooks';

const AdminHOC = (WrappedComponent: any) => (props: any) => {
  const { authenticated, role } = useAppSelector((state) => state.userState);

  // checks whether we are on client / browser or server.
  if (typeof window !== 'undefined') {
    const router = useRouter();

    useEffect(() => {
      if (!authenticated || role !== 'admin') {
        router.replace('/');
      }
    }, [authenticated, role]);

    if (authenticated && role === 'admin') {
      // eslint-disable-next-line react/jsx-props-no-spreading
      return <WrappedComponent {...props} />;
    }
  }

  // If we are on server, return null
  return null;
};

export default AdminHOC;
