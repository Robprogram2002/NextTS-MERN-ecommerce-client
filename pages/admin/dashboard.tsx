import { useEffect } from 'react';
import Orders from '../../components/order/Orders';
import AdminHOC from '../../components/AdminHOC';
import AdminLayout from '../../components/Layout/AdminLayout';
import { getAllOrders, updateUserOrder } from '../../store/order/order_actions';
import { useAppSelector, useAppDispatch } from '../../hooks/redux_hooks';

const Dashboard = () => {
  const { orders } = useAppSelector((state) => state.orderState);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllOrders());
  }, []);

  const handleStatusChange = (orderId: string, orderStatus: string) => {
    dispatch(updateUserOrder({ orderId, status: orderStatus }));
  };

  return (
    <AdminLayout>
      <h4>Admin Dashboard</h4>
      {/* {JSON.stringify(orders)} */}
      <Orders orders={orders} handleStatusChange={handleStatusChange} />
    </AdminLayout>
  );
};
export default AdminHOC(Dashboard);
