import { useState, FormEvent, useEffect } from 'react';
// import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import AdminNav from '../../../components/Layout/Nav/AdminNav';
import { updateCategory } from '../../../store/category/category_actions';
import { getCategory } from '../../../store/category/category_slice';
import CategoryForm from '../../../components/Forms/CategoryForm';
import { useAppSelector, useAppDispatch } from '../../../hooks/redux_hooks';

const CategoryUpdate = () => {
  const router = useRouter();
  const { categories } = useAppSelector((state) => state.categoryState);
  const { redirectTo, loading } = useAppSelector((state) => state.appState);

  useEffect(() => {
    if (redirectTo) {
      router.push(redirectTo);
    }
  }, [redirectTo]);

  if (categories.length === 0) router.push('/admin/category');

  const currentCategory = getCategory(router.query.slug!, categories);
  const [name, setName] = useState(currentCategory?.name || '');

  const dispatch = useAppDispatch();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(updateCategory({ category: name, slug: router.query.slug! }));
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col">
          {loading || !currentCategory ? (
            <h4 className="text-danger">Loading..</h4>
          ) : (
            <h4>Update category</h4>
          )}

          <CategoryForm
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
          />

          <hr />
        </div>
      </div>
    </div>
  );
};

export default CategoryUpdate;
