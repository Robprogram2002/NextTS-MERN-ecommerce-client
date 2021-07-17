/* eslint-disable no-unused-vars */
import { Select } from 'antd';
import { FormEvent, useEffect } from 'react';
import { brandsArray, colorsArray, ProductValues } from '../../types/Product';
import { useAppDispatch, useAppSelector } from '../../hooks/redux_hooks';
import {
  getCategories,
  getSubsByCategory,
} from '../../store/category/category_actions';

const { Option } = Select;

interface ProductUpdateFormProps {
  values: ProductValues;
  setValues: (value: ProductValues) => void;
  handleChange: (e: FormEvent) => void;
  handleSubmit: (e: FormEvent) => void;
}

const ProductUpdateForm = ({
  handleSubmit,
  handleChange,
  setValues,
  values,
}: ProductUpdateFormProps) => {
  const { categories, subCategories } = useAppSelector(
    (state) => state.categoryState
  );
  const { loading } = useAppSelector((state) => state.appState);

  const dispatch = useAppDispatch();

  const {
    title,
    description,
    price,
    category,
    subs,
    shipping,
    quantity,
    color,
    brand,
  } = values;

  useEffect(() => {
    if (categories.length === 0) {
      dispatch(getCategories());
    }
  }, []);

  const handleCategoryChange = (e: FormEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      value: string;
    };
    setValues({ ...values, category: target.value });
    dispatch(getSubsByCategory(target.value));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          name="title"
          className="form-control"
          value={title}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Description</label>
        <input
          type="text"
          name="description"
          className="form-control"
          value={description}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Price</label>
        <input
          type="number"
          name="price"
          className="form-control"
          value={price}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Shipping</label>
        <select
          value={shipping === 'Yes' ? 'Yes' : 'No'}
          name="shipping"
          className="form-control"
          onChange={handleChange}
        >
          <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select>
      </div>

      <div className="form-group">
        <label>Quantity</label>
        <input
          type="number"
          name="quantity"
          className="form-control"
          value={quantity}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Color</label>
        <select
          value={color}
          name="color"
          className="form-control"
          onChange={handleChange}
        >
          {colorsArray.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Brand</label>
        <select
          value={brand}
          name="brand"
          className="form-control"
          onChange={handleChange}
        >
          {brandsArray.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Category</label>
        <select
          name="category"
          className="form-control"
          onChange={handleCategoryChange}
          value={category}
        >
          {categories.length > 0 &&
            categories.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
        </select>
      </div>

      <div>
        <label>Sub Categories</label>
        <Select
          mode="multiple"
          style={{ width: '100%' }}
          placeholder="Please select"
          value={subs}
          onChange={(value) => setValues({ ...values, subs: value })}
        >
          {subCategories.length &&
            subCategories.map((s) => (
              <Option key={s._id} value={s._id}>
                {s.name}
              </Option>
            ))}
        </Select>
      </div>

      <br />
      <button type="submit" className="btn btn-outline-info">
        {loading ? 'Loading ...' : 'Save'}
      </button>
    </form>
  );
};

export default ProductUpdateForm;
