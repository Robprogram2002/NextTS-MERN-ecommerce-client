import { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/router';
import {
  getProduct,
  updateProduct,
} from '../../../store/product/product_actions';
import FileUpload from '../../../components/Forms/FileUpload';
import ProductUpdateForm from '../../../components/Forms/UpdateProductForm';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux_hooks';
import { productActions } from '../../../store/product/product_slice';
import { ProductValues } from '../../../types/Product';
import AdminLayout from '../../../components/Layout/AdminLayout';

const initialState = {
  title: '',
  description: '',
  price: '',
  category: '',
  subs: [],
  shipping: '',
  quantity: '',
  images: [],
  color: '',
  brand: '',
};

const ProductUpdate = () => {
  // state
  const [values, setValues] = useState<ProductValues>(initialState);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { redirectTo } = useAppSelector((state) => state.appState);
  const { imagesUploaded, currentProduct } = useAppSelector(
    (state) => state.productState
  );

  useEffect(() => {
    if (redirectTo) {
      router.push(redirectTo);
    }
  }, [redirectTo]);

  useEffect(() => {
    dispatch(getProduct(router.query.slug!));
  }, []);

  useEffect(() => {
    if (currentProduct) {
      setValues({
        ...currentProduct,
        category:
          typeof currentProduct.category === 'string'
            ? currentProduct.category
            : currentProduct.category._id,
        subs: currentProduct.subs.map((sub) =>
          typeof sub === 'string' ? sub : sub._id
        ),
      });
      dispatch(productActions.setImages(currentProduct.images));
    }
  }, [currentProduct]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        product: values,
        images: imagesUploaded,
        slug: router.query.slug!,
      })
    );
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
    <AdminLayout>
      <h4>Product update</h4>

      <div className="p-3">
        <FileUpload />
      </div>
      <ProductUpdateForm
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        setValues={setValues}
        values={values}
      />
      <hr />
    </AdminLayout>
  );
};

export default ProductUpdate;
