import { useEffect, useState } from 'react';
import { Pagination } from 'antd';
import ProductCard from '../cards/ProductCard';
import LoadingCard from '../cards/LoadingCard';
import { useAppDispatch, useAppSelector } from '../../hooks/redux_hooks';
import { getSelectedProducts } from '../../store/product/product_actions';

const NewArrivals = () => {
  const [page, setPage] = useState(1);
  const dispatch = useAppDispatch();
  const { newestProducts } = useAppSelector((state) => state.productState);

  useEffect(() => {
    dispatch(getSelectedProducts({ sort: 'createdAt', order: 'desc', page }));
  }, [page]);

  return (
    <>
      <div className="container">
        {!newestProducts ? (
          <LoadingCard count={4} />
        ) : (
          <div className="row">
            {newestProducts.map((product) => (
              <div key={product._id} className="col-md-3">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="row">
        <nav className="col-md-3 offset-md-4 text-center pt-5 p-3">
          <Pagination
            current={page}
            total={12}
            onChange={(value) => setPage(value)}
            defaultPageSize={4}
            pageSize={4}
          />
        </nav>
      </div>
    </>
  );
};

export default NewArrivals;
