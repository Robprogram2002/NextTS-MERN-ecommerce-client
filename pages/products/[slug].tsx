import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { LoadingOutlined } from '@ant-design/icons';
import SingleProduct from '../../components/cards/SingleProduct';
import { useAppSelector, useAppDispatch } from '../../hooks/redux_hooks';
import { getProduct } from '../../store/product/product_actions';

const ProductPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { currentProduct } = useAppSelector((state) => state.productState);

  useEffect(() => {
    dispatch(getProduct(router.query.slug!));
  }, []);

  return (
    <>
      {currentProduct ? (
        <div className="container-fluid">
          <div className="row pt-4">
            <SingleProduct product={currentProduct} />
          </div>

          <div className="row">
            <div className="col text-center pt-5 pb-5">
              <hr />
              <h4>Related Products</h4>
              <hr />
            </div>
          </div>
        </div>
      ) : (
        <LoadingOutlined />
      )}
    </>
  );
};

export default ProductPage;
