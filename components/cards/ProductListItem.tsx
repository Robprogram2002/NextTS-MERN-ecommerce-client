import Link from 'next/Link';
import { Product } from '../../types/Product';

const ProductListItems = ({ product }: { product: Product }) => {
  const { price, category, subs, shipping, color, brand, quantity, sold } =
    product;

  const fullCategory = typeof category === 'string' ? null : category;

  return (
    <ul className="list-group">
      <li className="list-group-item">
        Price{' '}
        <span className="label label-default label-pill pull-xs-right">
          $ {price}
        </span>
      </li>

      {category && (
        <li className="list-group-item">
          Category{' '}
          <Link href={`/category/${fullCategory?.slug}`}>
            <span className="label label-default label-pill pull-xs-right">
              {fullCategory?.name}
            </span>
          </Link>
        </li>
      )}

      {subs && (
        <li className="list-group-item">
          Sub Categories
          {subs.map((s) => {
            if (typeof s !== 'string') {
              return (
                <Link key={s._id} href={`/sub/${s.slug}`}>
                  <span className="label label-default label-pill pull-xs-right">
                    {s.name}
                  </span>
                </Link>
              );
            }
            return 'this is not working';
          })}
        </li>
      )}

      <li className="list-group-item">
        Shipping{' '}
        <span className="label label-default label-pill pull-xs-right">
          {shipping}
        </span>
      </li>

      <li className="list-group-item">
        Color{' '}
        <span className="label label-default label-pill pull-xs-right">
          {color}
        </span>
      </li>

      <li className="list-group-item">
        Brand{' '}
        <span className="label label-default label-pill pull-xs-right">
          {brand}
        </span>
      </li>

      <li className="list-group-item">
        Available{' '}
        <span className="label label-default label-pill pull-xs-right">
          {quantity}
        </span>
      </li>

      <li className="list-group-item">
        Sold{' '}
        <span className="label label-default label-pill pull-xs-right">
          {sold}
        </span>
      </li>
    </ul>
  );
};

export default ProductListItems;
