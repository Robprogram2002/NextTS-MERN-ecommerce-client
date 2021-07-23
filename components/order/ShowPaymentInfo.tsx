const ShowPaymentInfo = ({
  order,
  showStatus,
}: {
  order: any;
  showStatus: boolean;
}) => (
  // eslint-disable-next-line no-return-assign
  <div>
    <p>
      <span>Order Id: {order.paymentIntent.id}</span>
      {' / '}
      <span>
        Amount:
        {/* {(order.paymentIntent.amount /= 100).toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
          })} */}
        {order.paymentIntent.amount} $ {' / '}
      </span>
      {' / '}
      <span>Currency: {order.paymentIntent.currency.toUpperCase()}</span>
      {' / '}
      <span>Method: {order.paymentIntent.payment_method_types[0]}</span>
      {' / '}
      <span>Payment: {order.paymentIntent.status.toUpperCase()}</span>
      {' / '}
      <span>
        Orderd on:{' / '}
        {new Date(order.paymentIntent.created * 1000).toLocaleString()}
      </span>
      {' / '}
      {showStatus && (
        <span className="badge bg-primary text-white">
          STATUS: {order.orderStatus}
        </span>
      )}
    </p>
  </div>
);
export default ShowPaymentInfo;
