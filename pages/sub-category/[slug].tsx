import { useEffect } from 'react';
import { useRouter } from 'next/router';
import ProductCard from '../../components/cards/ProductCard';
import { getProductsBySub } from '../../store/category/category_actions';
import { useAppSelector, useAppDispatch } from '../../hooks/redux_hooks';

const SubHome = () => {
  const { products } = useAppSelector((state) => state.productState);
  const { currentSubCategory } = useAppSelector((state) => state.categoryState);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    dispatch(getProductsBySub(slug!));
  }, [slug]);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col">
          {!products || !currentSubCategory ? (
            <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
              Loading...
            </h4>
          ) : (
            <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
              {`${products.length} Products in "${currentSubCategory.name}" sub
              category`}
            </h4>
          )}
        </div>
      </div>

      <div className="row">
        {products &&
          products.map((p) => (
            <div className="col" key={p._id}>
              <ProductCard product={p} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default SubHome;
