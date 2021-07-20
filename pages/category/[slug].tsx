import { useEffect } from 'react';
import { useRouter } from 'next/router';
import ProductCard from '../../components/cards/ProductCard';
import {
  getCategory,
  getProductsByCategory,
} from '../../store/category/category_actions';
import { useAppSelector, useAppDispatch } from '../../hooks/redux_hooks';

const CategoryHome = () => {
  const { products } = useAppSelector((state) => state.productState);
  const { currentCategory } = useAppSelector((state) => state.categoryState);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    dispatch(getCategory(slug!));
    dispatch(getProductsByCategory(slug!));
  }, [slug]);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col">
          {!products || !currentCategory ? (
            <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
              Loading...
            </h4>
          ) : (
            <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
              {`${products.length} Products in " ${currentCategory.name} " category`}
            </h4>
          )}
        </div>
      </div>

      {products && (
        <div className="row">
          {products.map((p) => (
            <div className="col" key={p._id}>
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryHome;
