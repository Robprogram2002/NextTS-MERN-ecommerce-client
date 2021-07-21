import { useState, useEffect, FormEvent } from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import DatePicker from 'react-datepicker';
import { useAppSelector, useAppDispatch } from '../../../hooks/redux_hooks';
import 'react-datepicker/dist/react-datepicker.css';
import AdminNav from '../../../components/Layout/Nav/AdminNav';
import {
  createCoupon,
  getCoupons,
  removeCoupon,
} from '../../../store/coupon/coupon_actions';

const CreateCouponPage = () => {
  const [name, setName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [discount, setDiscount] = useState('');
  const dispatch = useAppDispatch();
  const { coupons } = useAppSelector((state) => state.couponState);
  const { loading } = useAppSelector((state) => state.appState);
  // redux

  useEffect(() => {
    dispatch(getCoupons());
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // console.table(name, expiry, discount);
    dispatch(createCoupon({ name, expiry, discount: +discount }));
    setName('');
    setDiscount('');
    setExpiry('');
  };

  const handleRemove = (couponId: string) => {
    if (window.confirm('Delete?')) {
      dispatch(removeCoupon(couponId));
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-10">
          {loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
            <h4>Coupon</h4>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="text-muted">Name</label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => setName(e.target.value)}
                value={name}
                required
              />
            </div>

            <div className="form-group">
              <label className="text-muted">Discount %</label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => setDiscount(e.target.value)}
                value={discount}
                required
              />
            </div>

            <div className="form-group">
              <label className="text-muted">Expiry</label>
              <br />
              <DatePicker
                className="form-control"
                selected={new Date()}
                value={expiry}
                onChange={(date: any) => setExpiry(date)}
                required
              />
            </div>

            <button type="submit" className="btn btn-outline-primary">
              Save
            </button>
          </form>

          <br />

          <h4>{coupons.length} Coupons</h4>

          <table className="table table-bordered">
            <thead className="thead-light">
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Expiry</th>
                <th scope="col">Discount</th>
                <th scope="col">Action</th>
              </tr>
            </thead>

            <tbody>
              {coupons.map((c: any) => (
                <tr key={c._id}>
                  <td>{c.name}</td>
                  <td>{new Date(c.expiry).toLocaleDateString()}</td>
                  <td>{c.discount}%</td>
                  <td>
                    <DeleteOutlined
                      onClick={() => handleRemove(c._id)}
                      className="text-danger pointer"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CreateCouponPage;