import { Card, Tabs, Tooltip } from 'antd';
import { HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Link from 'next/Link';
// import Image from 'next/image';
import StarRating from 'react-star-ratings';
import { useEffect, useState } from 'react';
import ProductListItems from './ProductListItem';
import { Product } from '../../types/Product';
import ShowRatings from '../Modals/ShowRatings';
import RatingModal from '../Modals/Rating';
import { useAppSelector, useAppDispatch } from '../../hooks/redux_hooks';
import { rateProductHandler } from '../../store/product/product_actions';
import cartInLocal from '../../utils/cartInLocal';
import { addProductToCart } from '../../store/user/user_actions';

const { TabPane } = Tabs;

const SingleProduct = ({ product }: { product: Product }) => {
  const [star, setStar] = useState<number>();
  const [tooltip, setTooltip] = useState('Click to add');
  const { title, images, description, _id } = product;
  const { userId, authenticated } = useAppSelector((state) => state.userState);
  const dispatch = useAppDispatch();

  const onStarClick = (newRating: number, name: string) => {
    setStar(newRating);
    dispatch(rateProductHandler({ star: newRating, productId: name }));
  };

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (product.ratings && userId) {
      const existingRatingObject = product.ratings.find(
        (ele) => ele.postedBy.toString() === userId.toString()
      );
      if (existingRatingObject) {
        return setStar(existingRatingObject.star);
      } // current user's star
    }
  }, []);

  const handleAddToCart = () => {
    if (!authenticated) {
      // store cart data in localstorage
      cartInLocal(product);
    } else {
      // store cart data in DB
      dispatch(addProductToCart(product));

      // show tooltip
      setTooltip('Added');
    }
  };

  return (
    <>
      <div className="col-md-7">
        {images && images.length ? (
          <Carousel showArrows autoPlay infiniteLoop>
            {images &&
              images.map((i) => (
                <img
                  src={i.url}
                  key={i.public_id}
                  alt="something that describe graphically the product"
                />
              ))}
          </Carousel>
        ) : (
          <Card
            cover={
              <img
                src="https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png"
                className="mb-3 card-image"
                alt="default , not visualization provided for the product"
              />
            }
          />
        )}

        <Tabs type="card">
          <TabPane tab="Description" key="1">
            {description && description}
          </TabPane>
          <TabPane tab="More" key="2">
            Call use on xxxx xxx xxx to learn more about this product.
          </TabPane>
        </Tabs>
      </div>

      <div className="col-md-5">
        <h1 className="bg-info p-3">{title}</h1>
        {product && product.ratings && product.ratings.length > 0 ? (
          <ShowRatings product={product} />
        ) : (
          <div className="text-center pt-1 pb-3">No rating yet</div>
        )}
        <Card
          actions={[
            <Tooltip title={tooltip}>
              <button
                onClick={handleAddToCart}
                type="button"
                style={{
                  outline: 'none',
                  border: 'none',
                  backgroundColor: 'transparent',
                  cursor: 'pointer',
                }}
              >
                <ShoppingCartOutlined className="text-danger" /> <br /> Add to
                Cart
              </button>
            </Tooltip>,
            <Link href="/">
              <div>
                <HeartOutlined className="text-info" /> <br /> Add to Wishlist
              </div>
            </Link>,
            <RatingModal>
              <StarRating
                name={_id}
                numberOfStars={5}
                rating={star}
                changeRating={onStarClick}
                isSelectable
                starRatedColor="red"
              />
            </RatingModal>,
          ]}
        >
          <ProductListItems product={product} />
        </Card>
      </div>
    </>
  );
};

export default SingleProduct;
