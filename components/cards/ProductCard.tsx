import { Card } from 'antd';
import { EyeOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import Image from 'next/image';
import Link from 'next/Link';
// import { useRouter } from 'next/router';
import { Product } from '../../types/Product';
import ShowRatings from '../Modals/ShowRatings';

const { Meta } = Card;

const ProductCard = ({ product }: { product: Product }) => {
  // destructure
  const { images, title, description, slug } = product;
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
          <>
            <ShoppingCartOutlined className="text-danger" /> <br /> Add to Cart
          </>,
        ]}
      >
        <Meta
          title={title}
          description={`${description && description.substring(0, 40)}...`}
        />
      </Card>
    </>
  );
};

export default ProductCard;
