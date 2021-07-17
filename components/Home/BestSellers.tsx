import { useEffect, useState } from 'react';
import { Pagination } from 'antd';
import ProductCard from '../cards/ProductCard';
import LoadingCard from '../cards/LoadingCard';
import { useAppDispatch, useAppSelector } from '../../hooks/redux_hooks';
import { getSelectedProducts } from '../../store/product/product_actions';

const BestSellers = () => {
  const [page, setPage] = useState(1);
  const dispatch = useAppDispatch();
  const { bestSellerProducts } = useAppSelector((state) => state.productState);

  useEffect(() => {
    dispatch(getSelectedProducts({ sort: 'sold', order: 'desc', page }));
  }, [page]);

  return (
    <>
      <div className="container">
        {!bestSellerProducts ? (
          <LoadingCard count={3} />
        ) : (
          <div className="row">
            {bestSellerProducts.map((product) => (
              <div key={product._id} className="col-md-4">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="row">
        <nav className="col-md-4 offset-md-4 text-center pt-5 p-3">
          <Pagination
            current={page}
            total={9}
            onChange={(value) => setPage(value)}
            defaultPageSize={3}
            pageSize={3}
          />
        </nav>
      </div>
    </>
  );
};

export default BestSellers;
