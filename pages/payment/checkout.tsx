import { useState } from 'react';
import { useRouter } from 'next/router';
import ReactQuill from 'react-quill';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAppSelector, useAppDispatch } from '../../hooks/redux_hooks';
import { emptyUserCart, saveUserAddress } from '../../store/user/user_actions';
import 'react-quill/dist/quill.snow.css';

const Checkout = () => {
  const [coupon, setCoupon] = useState('');
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
  const dispatch = useAppDispatch();
  const { cart, address } = useAppSelector((state) => state.userState);
  const [inputAddress, setInputAddress] = useState(address || '');
  const router = useRouter();

  const emptyCart = () => {
    dispatch(emptyUserCart());
  };

  const saveAddressToDb = () => {
    dispatch(saveUserAddress(inputAddress));
  };

  const applyDiscountCoupon = async () => {
    try {
      const response = await axios.patch('/user/cart/apply-coupon', {
        coupon,
      });
      setTotalAfterDiscount(response.data);
    } catch (error) {
      toast.error('something went wrong, coupon not applied');
    }
  };

  const showAddress = () => (
    <>
      <ReactQuill
        theme="snow"
        value={inputAddress}
        onChange={setInputAddress}
      />
      <button
        type="submit"
        className="btn btn-primary mt-2"
        onClick={saveAddressToDb}
      >
        Save
      </button>
    </>
  );

  const showProductSummary = () =>
    cart.products.map((p) => (
      <div key={p.product._id}>
        <p>
          {p.product.title} ({p.color}) x {p.count} ={' '}
          {p.product.price * p.count}
        </p>
      </div>
    ));

  const showApplyCoupon = () => (
    <>
      <input
        onChange={(e) => {
          setCoupon(e.target.value);
        }}
        value={coupon}
        type="text"
        className="form-control"
      />
      <button
        type="submit"
        onClick={applyDiscountCoupon}
        className="btn btn-primary mt-2"
      >
        Apply
      </button>
    </>
  );

  return (
    <div className="row">
      <div className="col-md-6">
        <h4>Delivery Address</h4>
        <br />
        <br />
        {showAddress()}
        <hr />
        <h4>Got Coupon?</h4>
        <br />
        {showApplyCoupon()}
      </div>

      <div className="col-md-6">
        <h4>Order Summary</h4>
        <hr />
        <p>Products {cart.products.length}</p>
        <hr />
        {showProductSummary()}
        <hr />
        <p>Cart Total: {cart.totalAmount.toFixed(2)}</p>

        {totalAfterDiscount > 0 && (
          <p className="bg-success p-2">
            Discount Applied: Total Payable: ${totalAfterDiscount}
          </p>
        )}

        <div className="row">
          <div className="col-md-6">
            <button
              type="button"
              className="btn btn-primary"
              disabled={!address || !cart.products.length}
              onClick={() => router.push('/payment/finish')}
            >
              Place Order
            </button>
          </div>

          <div className="col-md-6">
            <button
              type="button"
              disabled={!cart.products.length}
              onClick={emptyCart}
              className="btn btn-primary"
            >
              Empty Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
