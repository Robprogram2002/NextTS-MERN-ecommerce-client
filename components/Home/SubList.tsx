import { useEffect } from 'react';
import Link from 'next/Link';
import { getSubCategories } from '../../store/category/category_actions';
import { useAppSelector, useAppDispatch } from '../../hooks/redux_hooks';

const SubList = () => {
  const { subCategories } = useAppSelector((state) => state.categoryState);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getSubCategories());
  }, []);

  const showSubs = () =>
    subCategories.map((s) => (
      <div
        key={s._id}
        className="col btn btn-outlined-primary btn-lg btn-block btn-raised m-3"
      >
        <Link href={`/sub-category/${s.slug}`}>{s.name}</Link>
      </div>
    ));

  return (
    <div className="container">
      <div className="row">
        {subCategories.length === 0 ? (
          <h4 className="text-center">Loading...</h4>
        ) : (
          showSubs()
        )}
      </div>
    </div>
  );
};

export default SubList;