import { useEffect } from 'react';
import AdminProductCard from '../../../components/cards/AdminProductCard';
import { useAppSelector, useAppDispatch } from '../../../hooks/redux_hooks';
import {
  getProductsByCount,
  removeProduct,
} from '../../../store/product/product_actions';
import AdminLayout from '../../../components/Layout/AdminLayout';

const AllProducts = () => {
  const dispatch = useAppDispatch();
  const { products } = useAppSelector((state) => state.productState);

  useEffect(() => {
    if (!products) {
      dispatch(getProductsByCount(20));
    }
  }, []);

  const handleRemove = (slug: string) => {
    if (window.confirm('Delete?')) {
      removeProduct(slug);
    }
  };

  return (
    <AdminLayout>
      <h4>All Products</h4>

      <div className="row">
        {products ? (
          products.map((product) => (
            <div key={product._id} className="col-md-4 pb-3">
              <AdminProductCard product={product} handleRemove={handleRemove} />
            </div>
          ))
        ) : (
          <h3>Loading Products ...</h3>
        )}
      </div>
    </AdminLayout>
  );
};

export default AllProducts;
