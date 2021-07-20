import { useState, useEffect } from 'react';
import { Menu, Slider, Checkbox, Radio, RadioChangeEvent } from 'antd';
import {
  DollarOutlined,
  DownSquareOutlined,
  StarOutlined,
} from '@ant-design/icons';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import ProductCard from '../components/cards/ProductCard';
import { useAppSelector, useAppDispatch } from '../hooks/redux_hooks';
import { colorsArray, brandsArray } from '../types/Product';
import Star from '../components/Forms/Star';
import { getProductsByCount } from '../store/product/product_actions';
import {
  getCategories,
  getSubCategories,
} from '../store/category/category_actions';

import { fetchProductsByFilter } from '../store/filter/filter_actions';
import { filterActions } from '../store/filter/filter_slice';

const { SubMenu } = Menu;

const Shop = () => {
  const dispatch = useAppDispatch();
  const { categories, subCategories } = useAppSelector(
    (state) => state.categoryState
  );
  const { query, loading, price, category, filteredProducts } = useAppSelector(
    (state) => state.filterSlice
  );
  const [ok, setOk] = useState(false);
  const [brand, setBrand] = useState('');
  const [color, setColor] = useState('');
  const [shipping, setShipping] = useState('');

  useEffect(() => {
    if (query) {
      dispatch(fetchProductsByFilter({ query }));
    } else {
      // 1. load products by default on page load
      dispatch(getProductsByCount(15));
    }

    if (categories.length === 0) {
      // fetch categories
      dispatch(getCategories());
    }

    if (subCategories.length === 0) {
      dispatch(getSubCategories());
    }
  }, []);

  // 2. load products on user search input
  useEffect(() => {
    const delayed = setTimeout(() => {
      dispatch(fetchProductsByFilter({ query }));
    }, 300);
    return () => clearTimeout(delayed);
  }, [query]);

  // 3. load products based on price range
  useEffect(() => {
    dispatch(fetchProductsByFilter({ price }));
  }, [ok]);

  const handleSlider = (value: [number, number]) => {
    // reset
    dispatch(filterActions.setPrice(value));
    setBrand('');
    setColor('');
    setShipping('');
    setTimeout(() => {
      setOk(!ok);
    }, 300);
  };

  // 4. load products based on category
  // show categories in a list of checkbox

  // handle check for categories
  const handleCheck = (e: CheckboxChangeEvent) => {
    // reset
    setBrand('');
    setColor('');
    setShipping('');
    if (!category) {
      dispatch(filterActions.setCategories([e.target.value]));
      dispatch(fetchProductsByFilter({ category: [e.target.value] }));
      return;
    }

    const inTheState = [...category];
    const justChecked = e.target.value;
    const foundInTheState = inTheState.indexOf(justChecked); // index or -1

    // indexOf method ?? if not found returns -1 else return index [1,2,3,4,5]
    if (foundInTheState === -1) {
      inTheState.push(justChecked);
    } else {
      // if found pull out one item from index
      inTheState.splice(foundInTheState, 1);
    }

    dispatch(filterActions.setCategories(inTheState));
    dispatch(fetchProductsByFilter({ category: inTheState }));
  };

  const showCategories = () =>
    categories.map((c) => (
      <div key={c._id}>
        <Checkbox
          onChange={handleCheck}
          className="pb-2 pl-4 pr-4"
          value={c._id}
          name="category"
          checked={category?.includes(c._id)}
        >
          {c.name}
        </Checkbox>
        <br />
      </div>
    ));

  // 5. show products by star rating
  const handleStarClick = (num: string) => {
    // console.log(num);
    filterActions.setStar(+num);
    setBrand('');
    setColor('');
    setShipping('');
    dispatch(fetchProductsByFilter({ stars: num }));
  };

  const showStars = () => (
    <div className="pr-4 pl-4 pb-2">
      <Star starClick={handleStarClick} numberOfStars={5} />
      <Star starClick={handleStarClick} numberOfStars={4} />
      <Star starClick={handleStarClick} numberOfStars={3} />
      <Star starClick={handleStarClick} numberOfStars={2} />
      <Star starClick={handleStarClick} numberOfStars={1} />
    </div>
  );

  const handleSub = (subId: string) => {
    filterActions.setSub(subId);
    setBrand('');
    setColor('');
    setShipping('');
    dispatch(fetchProductsByFilter({ sub: subId }));
  };

  // 6. show products by sub category
  const showSubs = () =>
    subCategories.map((s) => (
      <button
        type="button"
        key={s._id}
        onClick={() => handleSub(s._id)}
        className="p-1 m-1 badge badge-secondary"
        style={{ cursor: 'pointer', outline: 'none' }}
      >
        {s.name}
      </button>
    ));

  const handleBrand = (e: RadioChangeEvent) => {
    setColor('');
    setBrand(e.target.value);
    setShipping('');
    dispatch(fetchProductsByFilter({ brand: e.target.value }));
  };

  // 7. show products based on brand name
  const showBrands = () =>
    brandsArray.map((b) => (
      <Radio
        key={b}
        value={b}
        name={b}
        checked={b === brand}
        onChange={handleBrand}
        className="pb-1 pl-4 pr-4"
      >
        {b}
      </Radio>
    ));

  const handleColor = (e: RadioChangeEvent) => {
    setBrand('');
    setColor(e.target.value);
    setShipping('');
    dispatch(fetchProductsByFilter({ color: e.target.value }));
  };

  // 8. show products based on color
  const showColors = () =>
    colorsArray.map((c) => (
      <Radio
        key={c}
        value={c}
        name={c}
        checked={c === color}
        onChange={handleColor}
        className="pb-1 pl-4 pr-4"
      >
        {c}
      </Radio>
    ));

  const handleShippingchange = (e: CheckboxChangeEvent) => {
    setBrand('');
    setColor('');
    setShipping(e.target.value);
    dispatch(fetchProductsByFilter({ shipping: e.target.value }));
  };

  // 9. show products based on shipping yes/no
  const showShipping = () => (
    <>
      <Checkbox
        className="pb-2 pl-4 pr-4"
        onChange={handleShippingchange}
        value="Yes"
        checked={shipping === 'Yes'}
      >
        Yes
      </Checkbox>

      <Checkbox
        className="pb-2 pl-4 pr-4"
        onChange={handleShippingchange}
        value="No"
        checked={shipping === 'No'}
      >
        No
      </Checkbox>
    </>
  );

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 pt-2">
          <h4>Search/Filter</h4>
          <hr />

          <Menu
            defaultOpenKeys={['1', '2', '3', '4', '5', '6', '7']}
            mode="inline"
          >
            {/* price */}
            <SubMenu
              key="1"
              title={
                <span className="h6">
                  <DollarOutlined /> Price
                </span>
              }
            >
              <div>
                <Slider
                  className="ml-4 mr-4"
                  tipFormatter={(v) => `$${v}`}
                  range
                  value={price}
                  onChange={handleSlider}
                  max={4999}
                />
              </div>
            </SubMenu>

            {/* category */}
            <SubMenu
              key="2"
              title={
                <span className="h6">
                  <DownSquareOutlined /> Categories
                </span>
              }
            >
              <div style={{ marginTop: '-10px' }}>{showCategories()}</div>
            </SubMenu>

            {/* stars */}
            <SubMenu
              key="3"
              title={
                <span className="h6">
                  <StarOutlined /> Rating
                </span>
              }
            >
              <div style={{ marginTop: '-10px' }}>{showStars()}</div>
            </SubMenu>

            {/* sub category */}
            <SubMenu
              key="4"
              title={
                <span className="h6">
                  <DownSquareOutlined /> Sub Categories
                </span>
              }
            >
              <div style={{ marginTop: '-10px' }} className="pl-4 pr-4">
                {showSubs()}
              </div>
            </SubMenu>

            {/* brands */}
            <SubMenu
              key="5"
              title={
                <span className="h6">
                  <DownSquareOutlined /> Brands
                </span>
              }
            >
              <div style={{ marginTop: '-10px' }} className="pr-5">
                {showBrands()}
              </div>
            </SubMenu>

            {/* colors */}
            <SubMenu
              key="6"
              title={
                <span className="h6">
                  <DownSquareOutlined /> Colors
                </span>
              }
            >
              <div style={{ marginTop: '-10px' }} className="pr-5">
                {showColors()}
              </div>
            </SubMenu>

            {/* shipping */}
            <SubMenu
              key="7"
              title={
                <span className="h6">
                  <DownSquareOutlined /> Shipping
                </span>
              }
            >
              <div style={{ marginTop: '-10px' }} className="pr-5">
                {showShipping()}
              </div>
            </SubMenu>
          </Menu>
        </div>

        <div className="col-md-9 pt-2">
          {loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
            <h4 className="text-danger">Products</h4>
          )}

          {filteredProducts && filteredProducts.length < 1 && (
            <p>No products found</p>
          )}

          <div className="row pb-5">
            {filteredProducts &&
              filteredProducts.map((p) => (
                <div key={p._id} className="col-md-4 mt-3">
                  <ProductCard product={p} />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
