import { Card, Tooltip } from 'antd';
import { EyeOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import Image from 'next/image';
import Link from 'next/Link';
// import { useRouter } from 'next/router';
import { useState } from 'react';
import { Product } from '../../types/Product';
import ShowRatings from '../Modals/ShowRatings';
import { useAppDispatch, useAppSelector } from '../../hooks/redux_hooks';
import { addProductToCart } from '../../store/user/user_actions';
import cartInLocal from '../../utils/cartInLocal';

const { Meta } = Card;

const ProductCard = ({ product }: { product: Product }) => {
  // destructure
  const { images, title, description, slug, price } = product;
  const [tooltip, setTooltip] = useState('Click to add');
  const { authenticated } = useAppSelector((state) => state.userState);

  const dispatch = useAppDispatch();
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
      {product && product.ratings && product.ratings.length > 0 ? (
        <ShowRatings product={product} />
      ) : (
        <div className="text-center pt-1 pb-3">No rating yet</div>
      )}
      <Card
        cover={
          <Image
            src={
              images && images.length
                ? images[0].url
                : 'https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png'
            }
            height={150}
            width={80}
            //   style={{ height: '150px', objectFit: 'cover' }}
            className="p-1"
          />
        }
        actions={[
          <Link href={`/products/${slug}`}>
            <div>
              <EyeOutlined className="text-warning" /> <br /> View Product{' '}
            </div>
          </Link>,
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
        ]}
      >
        <Meta
          title={`${title} - $${price}`}
          description={`${description && description.substring(0, 40)}...`}
        />
      </Card>
    </>
  );
};

export default ProductCard;
