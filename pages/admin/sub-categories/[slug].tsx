import { useState, FormEvent, useEffect } from 'react';
// import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import AdminNav from '../../../components/Layout/Nav/AdminNav';
import {
  getCategories,
  updateSub,
  getSub,
} from '../../../store/category/category_actions';
import CategoryForm from '../../../components/Forms/CategoryForm';
import { useAppSelector, useAppDispatch } from '../../../hooks/redux_hooks';

const SubUpdate = () => {
  const { categories, currentSubCategory } = useAppSelector(
    (state) => state.categoryState
  );
  const { redirectTo } = useAppSelector((state) => state.appState);
  const [name, setName] = useState('');
  const [parent, setParent] = useState('');
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (categories.length === 0) {
      dispatch(getCategories());
    }

    dispatch(getSub(router.query.slug!));
  }, []);

  useEffect(() => {
    if (currentSubCategory) {
      setName(currentSubCategory.name);
      setParent(currentSubCategory.parent);
    }
  }, [currentSubCategory]);

  useEffect(() => {
    if (redirectTo) {
      router.push(redirectTo);
    }
  }, [redirectTo]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(updateSub({ sub: name, slug: router.query.slug!, parent }));
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col">
          {currentSubCategory === null ? (
            <h4 className="text-danger">Loading..</h4>
          ) : (
            <h4>Update sub category</h4>
          )}

          <div className="form-group">
            <label>Parent category</label>
            <select
              name="category"
              className="form-control"
              onChange={(e) => setParent(e.target.value)}
            >
              <option>Please select</option>
              {categories.length === 0 ? (
                <option key="key" value="">
                  {' '}
                  Loading ...
                </option>
              ) : (
                categories.length > 0 &&
                categories.map((c) => (
                  <option key={c._id} value={c._id} selected={c._id === parent}>
                    {c.name}
                  </option>
                ))
              )}
            </select>
          </div>

          <CategoryForm
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
          />
        </div>
      </div>
    </div>
  );
};

export default SubUpdate;
