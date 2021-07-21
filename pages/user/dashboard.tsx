import { useEffect } from 'react';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { PDFDownloadLink } from '@react-pdf/renderer';
import UserNav from '../../components/Layout/Nav/UserNav';
import AuthHOC from '../../components/AuthHOC';
import Invoice from '../../components/order/Invoice';
import { Product } from '../../types/Product';
import ShowPaymentInfo from '../../components/order/ShowPaymentInfo';
import { useAppSelector, useAppDispatch } from '../../hooks/redux_hooks';
import { getUserOrders } from '../../store/order/order_actions';

const dashboard = () => {
  const dispatch = useAppDispatch();
  const { orders, loading } = useAppSelector((state) => state.orderState);

  useEffect(() => {
    dispatch(getUserOrders());
  }, []);

  const showOrderInTable = (order: any) => (
    <table className="table table-bordered">
      <thead className="thead-light">
        <tr>
          <th scope="col">Title</th>
          <th scope="col">Price</th>
          <th scope="col">Brand</th>
          <th scope="col">Color</th>
          <th scope="col">Count</th>
          <th scope="col">Shipping</th>
        </tr>
      </thead>

      <tbody>
        {order.products.map(
          (p: { product: Product; count: number; color: string }) => (
            <tr key={p.product._id}>
              <td>
                <b>{p.product.title}</b>
              </td>
              <td>{p.product.price}</td>
              <td>{p.product.brand}</td>
              <td>{p.color}</td>
              <td>{p.count}</td>
              <td>
                {p.product.shipping === 'Yes' ? (
                  <CheckCircleOutlined style={{ color: 'green' }} />
                ) : (
                  <CloseCircleOutlined style={{ color: 'red' }} />
                )}
              </td>
            </tr>
          )
        )}
      </tbody>
    </table>
  );

  const showDownloadLink = (order: any) => (
    <PDFDownloadLink
      document={<Invoice order={order} />}
      fileName="invoice.pdf"
      className="btn btn-sm btn-block btn-outline-primary"
    >
      Download PDF
    </PDFDownloadLink>
  );

  const showEachOrders = () =>
    orders.map((order) => (
      <div key={order._id} className="m-5 p-3 card">
        <ShowPaymentInfo order={order} />
        {showOrderInTable(order)}
        <div className="row">
          <div className="col">{showDownloadLink(order)}</div>
        </div>
      </div>
    ));

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <UserNav />
        </div>
        <div className="col text-center">
          <h4>
            {orders.length > 0 && !loading
              ? 'User purchase orders'
              : 'No purchase orders'}
          </h4>
          {showEachOrders()}
        </div>
      </div>
    </div>
  );
};

export default AuthHOC(dashboard);
