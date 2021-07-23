import { useState, useEffect, FormEvent } from 'react';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import Link from 'next/Link';
import { useAppSelector, useAppDispatch } from '../../../hooks/redux_hooks';
import {
  getCategories,
  getSubCategories,
  removeSub,
  createSub,
} from '../../../store/category/category_actions';
import CategoryForm from '../../../components/Forms/CategoryForm';
import LocalSearch from '../../../components/Forms/LocalSearch';
import AdminLayout from '../../../components/Layout/AdminLayout';

const SubCreate = () => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const { categories, subCategories } = useAppSelector(
    (state) => state.categoryState
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (categories.length === 0) {
      dispatch(getCategories());
    }

    dispatch(getSubCategories());
  }, []);

  // step 1
  const [keyword, setKeyword] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(createSub({ sub: name, category }));
    setName('');
    setCategory('');
  };

  const handleRemove = async (slug: string) => {
    if (window.confirm('Delete?')) {
      dispatch(removeSub(slug));
    }
  };

  return (
    <AdminLayout>
      {categories.length === 0 ? (
        <h4 className="text-danger">Loading..</h4>
      ) : (
        <h4>Create sub category</h4>
      )}

      <div className="form-group">
        <label>Parent category</label>
        <select
          name="category"
          className="form-control"
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>Please select</option>
          {categories.length > 0 &&
            categories.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
        </select>
      </div>

      <CategoryForm handleSubmit={handleSubmit} name={name} setName={setName} />

      {/* step 2 and step 3 */}
      <LocalSearch keyword={keyword} setKeyword={setKeyword} />

      {/* step 5 */}
      {subCategories.length === 0
        ? 'Loading categories ...'
        : subCategories
            .filter((subCategory) =>
              subCategory.name.toLowerCase().includes(keyword)
            )
            .map((s) => (
              <div className="alert alert-secondary" key={s._id}>
                {s.name}
                <button
                  type="button"
                  onClick={() => handleRemove(s.slug)}
                  className="btn btn-sm float-right"
                >
                  <DeleteOutlined className="text-danger" />
                </button>
                <Link href={`/admin/sub-categories/${s.slug}`}>
                  <button type="button" className="btn btn-sm float-right">
                    <EditOutlined className="text-warning" />
                  </button>
                </Link>
              </div>
            ))}
    </AdminLayout>
  );
};

export default SubCreate;
