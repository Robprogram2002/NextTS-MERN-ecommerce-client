import { useState, useEffect, FormEvent } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import Link from 'next/Link';
import { Card } from 'antd';
import { DollarOutlined, CheckOutlined } from '@ant-design/icons';
import { StripeCardElementChangeEvent } from '@stripe/stripe-js';
import axios from 'axios';
import { useAppSelector, useAppDispatch } from '../../hooks/redux_hooks';
import { emptyUserCart, createOrder } from '../../store/user/user_actions';

const StripeCheckout = () => {
  const { cart } = useAppSelector((state) => state.userState);

  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState('');
  const [processing, setProcessing] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState('');
  const dispatch = useAppDispatch();

  const [cartTotal, setCartTotal] = useState(0);
  const [totalAfterDiscount, setTotalAfterDiscount] = useState<number | null>(
    null
  );
  const [payable, setPayable] = useState<number>(0);

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    axios
      .post('/user/cart/payment-intent', {
        totalAmount: cart.totalAmount,
        coupon: cart.appliedCoupon,
      })
      .then(({ data }) => {
        setClientSecret(data.clientSecret);

        // additional response received on successful payment
        setCartTotal(data.cartTotal);
        setPayable(data.payable);
        if (data.totalAfterDiscount)
          setTotalAfterDiscount(data.totalAfterDiscount);
      });
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    const target = e.target as typeof e.target & {
      name: {
        value: string;
      };
    };
    e.preventDefault();
    setProcessing(true);
    const payload = await stripe?.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements?.getElement(CardElement)!,
        billing_details: {
          name: target.name.value,
        },
      },
    });

    if (payload?.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      // here you get result after successful payment
      // create order and save in database for admin to process
      // empty user cart from redux store and local storage

      dispatch(createOrder({ stripeResponse: payload, completeCart: cart }));
      dispatch(emptyUserCart());
      console.log(JSON.stringify(payload, null, 4));
      setError('');
      setProcessing(false);
      setSucceeded(true);
    }
  };

  const handleChange = async (e: StripeCardElementChangeEvent) => {
    // listen for changes in the card element
    // and display any errors as the custoemr types their card details
    setDisabled(e.empty); // disable pay button if errors
    setError(e.error ? e.error.message : ''); // show error message
  };

  const cartStyle = {
    style: {
      base: {
        color: '#32325d',
        fontFamily: 'Arial, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#32325d',
        },
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a',
      },
    },
  };

  return (
    <>
      {!succeeded && (
        <div>
          {totalAfterDiscount !== null ? (
            <p className="alert alert-success">{`Total after discount: $${totalAfterDiscount}`}</p>
          ) : (
            <p className="alert alert-danger">No coupon applied</p>
          )}
        </div>
      )}
      <div className="text-center pb-5">
        <Card
          cover={
            <img
              alt="kasjd qwehiqw e"
              src="https://i1.wp.com/ringgitplus.wpcomstaging.com/wp-content/uploads/2020/03/credit-cards.jpg?fit=848%2C565&ssl=1"
              style={{
                height: '200px',
                objectFit: 'cover',
                marginBottom: '-50px',
              }}
            />
          }
          actions={[
            <>
              <DollarOutlined className="text-info" /> <br /> Total: $
              {totalAfterDiscount
                ? totalAfterDiscount.toFixed(2)
                : cartTotal.toFixed(2)}
            </>,
            <>
              <CheckOutlined className="text-info" /> <br /> Total payable : $
              {/* change from cents to dollars */}
              {(payable / 100).toFixed(2)}
            </>,
          ]}
        />
      </div>

      <form id="payment-form" className="stripe-form" onSubmit={handleSubmit}>
        <CardElement
          id="card-element"
          options={cartStyle}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="stripe-button"
          disabled={!!processing || disabled || succeeded}
        >
          <span id="button-text">
            {processing ? <div className="spinner" id="spinner" /> : 'Pay'}
          </span>
        </button>
        <br />
        {error && (
          <div className="card-error" role="alert">
            {error}
          </div>
        )}
        <br />
        <p className={succeeded ? 'result-message' : 'result-message hidden'}>
          Payment Successful.{' '}
          <Link href="/user/dashboard">See it in your purchase history.</Link>
        </p>
      </form>
    </>
  );
};

export default StripeCheckout;
