import { useState } from 'react';
import { Pagination } from 'antd';
import ProductCard from '../cards/ProductCard';
import LoadingCard from '../cards/LoadingCard';
import { Product } from '../../types/Product';

interface BestSellersProps {
  bestSellerProducts: Product[];
}

const BestSellers = ({ bestSellerProducts }: BestSellersProps) => {
  const [page, setPage] = useState(1);
  const count = 4;

  return (
    <>
      <div className="container">
        {!bestSellerProducts ? (
          <LoadingCard count={count} />
        ) : (
          <div className="row">
            {bestSellerProducts
              .slice((page - 1) * count, page * count)
              .map((product) => (
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

export default BestSellers;
