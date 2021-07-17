import { useState, FormEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux_hooks';
import AdminNav from '../../../components/Layout/Nav/AdminNav';
import { createProduct } from '../../../store/product/product_actions';
import ProductCreateForm from '../../../components/Forms/CreateProductForm';
import FileUpload from '../../../components/Forms/FileUpload';
import { ProductValues } from '../../../types/Product';

const initialState = {
  title: '',
  description: '',
  price: '',
  subs: [],
  category: '',
  shipping: '',
  quantity: '',
  images: [],
  color: '',
  brand: '',
};

const ProductCreate = () => {
  const [values, setValues] = useState<ProductValues>(initialState);
  const { imagesUploaded } = useAppSelector((state) => state.productState);
  const dispatch = useAppDispatch();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(createProduct({ product: values, images: imagesUploaded }));
    setValues(initialState);
  };

  const handleChange = (e: FormEvent) => {
    const target = e.target as typeof e.target & {
      name: string;
      value: any;
    };

    setValues({ ...values, [target.name]: target.value });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>

        <div className="col-md-10">
          <h4>Product create</h4>

          <hr />

          <div className="p-3">
            <FileUpload />
          </div>

          <ProductCreateForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            setValues={setValues}
            values={values}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCreate;
