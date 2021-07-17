import { Card, Tabs } from 'antd';
import { HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Link from 'next/Link';
// import Image from 'next/image';
import ProductListItems from './ProductListItem';
import { Product } from '../../types/Product';

const { TabPane } = Tabs;

const SingleProduct = ({ product }: { product: Product }) => {
  const { title, images, description } = product;

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
        <Card
          actions={[
            <>
              <ShoppingCartOutlined className="text-success" /> <br />
              Add to Cart
            </>,
            <Link href="/">
              <div>
                <HeartOutlined className="text-info" /> <br /> Add to Wishlist
              </div>
            </Link>,
          ]}
        >
          <ProductListItems product={product} />
        </Card>
      </div>
    </>
  );
};

export default SingleProduct;
