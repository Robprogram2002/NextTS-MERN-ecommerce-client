import { useState, useEffect, FormEvent } from 'react';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import Link from 'next/Link';
import { useAppSelector, useAppDispatch } from '../../../hooks/redux_hooks';
import {
  createCategory,
  removeCategory,
  getCategories,
} from '../../../store/category/category_actions';
import CategoryForm from '../../../components/Forms/CategoryForm';
import LocalSearch from '../../../components/Forms/LocalSearch';
import AdminLayout from '../../../components/Layout/AdminLayout';

const CategoryCreate = () => {
  const [name, setName] = useState('');
  const dispatch = useAppDispatch();
  const { categories } = useAppSelector((state) => state.categoryState);
  // step 1
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(createCategory(name));
    setName('');
  };

  const handleRemove = async (slug: string) => {
    if (window.confirm('Delete?')) {
      dispatch(removeCategory(slug));
    }
  };

  return (
    <AdminLayout>
      <h4>Create category</h4>

      <CategoryForm handleSubmit={handleSubmit} name={name} setName={setName} />

      {/* step 2 and step 3 */}
      <LocalSearch keyword={keyword} setKeyword={setKeyword} />

      {/* step 5 */}
      {categories.length === 0 ? (
        <h3>Loading categories ...</h3>
      ) : (
        categories
          .filter((category) => category.name.toLowerCase().includes(keyword))
          .map((c) => (
            <div className="alert alert-secondary" key={c._id}>
              {c.name}
              <button
                type="button"
                onClick={() => handleRemove(c.slug)}
                className="btn btn-sm float-right"
              >
                <DeleteOutlined className="text-danger" />
              </button>
              <Link href={`/admin/category/${c.slug}`}>
                <button type="button" className="btn btn-sm float-right">
                  <EditOutlined className="text-warning" />
                </button>
              </Link>
            </div>
          ))
      )}
    </AdminLayout>
  );
};

export default CategoryCreate;

// export async function getServerSideProps({ req }: GetServerSidePropsContext) {
//   try {
//     const { cookie } = req.headers;
//     if (!cookie) throw new Error('user not authenticated');

//     const response = await axios.get(`/categories/list`, {
//       headers: { cookie },
//     });

//     return {
//       props: {
//         categories: response.data,
//       },
//     };
//   } catch (err) {
//     return {
//       props: { error: 'something went wrong' },
//     };
//   }
// }
