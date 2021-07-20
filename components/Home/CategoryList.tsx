import { useEffect } from 'react';
import Link from 'next/Link';
import { getCategories } from '../../store/category/category_actions';
import { useAppSelector, useAppDispatch } from '../../hooks/redux_hooks';

const CategoryList = () => {
  const { categories } = useAppSelector((state) => state.categoryState);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  const showCategories = () =>
    categories.map((c) => (
      <div
        key={c._id}
        className="col btn btn-outlined-primary btn-lg btn-block btn-raised m-3"
      >
        <Link href={`/category/${c.slug}`}>{c.name}</Link>
      </div>
    ));

  return (
    <div className="container">
      <div className="row">
        {categories.length === 0 ? (
          <h4 className="text-center">Loading...</h4>
        ) : (
          showCategories()
        )}
      </div>
    </div>
  );
};

export default CategoryList;
