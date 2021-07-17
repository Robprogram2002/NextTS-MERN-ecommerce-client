import { Card } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import Link from 'next/Link';
import Image from 'next/image';
import { Product } from '../../types/Product';

const { Meta } = Card;

interface AdminProductCardProps {
  product: Product;
  // eslint-disable-next-line no-unused-vars
  handleRemove: (slug: string) => void;
}

const AdminProductCard = ({ product, handleRemove }: AdminProductCardProps) => {
  // destructure
  const { title, description, images, slug } = product;

  return (
    <Card
      cover={
        <Image
          src={
            images && images.length
              ? images[0].url
              : 'https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png'
          }
          className="p-1"
          height={120}
          alt="some pciture describing the appearence of the product "
          width={80}
        />
      }
      actions={[
        <Link href={`/admin/products/${slug}`}>
          <EditOutlined className="text-warning" />
        </Link>,
        <DeleteOutlined
          onClick={() => handleRemove(slug)}
          className="text-danger"
        />,
      ]}
    >
      <Meta
        title={title}
        description={`${description && description.substring(0, 40)}...`}
      />
    </Card>
  );
};

export default AdminProductCard;
