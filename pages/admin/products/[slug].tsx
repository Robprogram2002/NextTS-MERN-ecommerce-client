import { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/router';
import AdminNav from '../../../components/Layout/Nav/AdminNav';
import {
  getProduct,
  updateProduct,
} from '../../../store/product/product_actions';
import FileUpload from '../../../components/Forms/FileUpload';
import ProductUpdateForm from '../../../components/Forms/UpdateProductForm';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux_hooks';
import { productActions } from '../../../store/product/product_slice';
import { ProductValues } from '../../../components/Forms/CreateProductForm';

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
  //   const [arrayOfSubs, setArrayOfSubs] = useState([]);
  //   const [selectedCategory, setSelectedCategory] = useState('');
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

  //   const handleCategoryChange = (e) => {
  //     e.preventDefault();
  //     console.log('CLICKED CATEGORY', e.target.value);
  //     setValues({ ...values, subs: [] });

  //     setSelectedCategory(e.target.value);

  //     getCategorySubs(e.target.value).then((res) => {
  //       console.log('SUB OPTIONS ON CATGORY CLICK', res);
  //       setSubOptions(res.data);
  //     });

  //     console.log('EXISTING CATEGORY values.category', values.category);

  //     // if user clicks back to the original category
  //     // show its sub categories in default
  //     if (values.category._id === e.target.value) {
  //       loadProduct();
  //     }
  //     // clear old sub category ids
  //     setArrayOfSubs([]);
  //   };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>

        <div className="col-md-10">
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
        </div>
      </div>
    </div>
  );
};

export default ProductUpdate;
