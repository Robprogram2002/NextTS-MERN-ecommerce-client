import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { LoadingOutlined } from '@ant-design/icons';
import SingleProduct from '../../components/cards/SingleProduct';
import { useAppSelector, useAppDispatch } from '../../hooks/redux_hooks';
import {
  getProduct,
  getRelatedProducts,
} from '../../store/product/product_actions';
import ProductCard from '../../components/cards/ProductCard';

const ProductPage = () => {
  const router = useRouter();
  const { slug } = router.query;
  const dispatch = useAppDispatch();
  const { currentProduct, relatedProducts } = useAppSelector(
    (state) => state.productState
  );

  useEffect(() => {
    dispatch(getProduct(router.query.slug!));
  }, [slug]);

  useEffect(() => {
    if (currentProduct) {
      dispatch(getRelatedProducts(currentProduct._id));
    }
  }, [currentProduct, slug]);

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

          <div className="row pb-5">
            {relatedProducts ? (
              relatedProducts.map((r) => (
                <div key={r._id} className="col-md-4">
                  <ProductCard product={r} />
                </div>
              ))
            ) : (
              <div className="text-center col">No Products Found</div>
            )}
          </div>
        </div>
      ) : (
        <LoadingOutlined />
      )}
    </>
  );
};

export default ProductPage;
