import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import { ChangeEvent } from 'react';
import Image from 'next/image';
import { useAppDispatch } from '../../hooks/redux_hooks';
import { Product } from '../../types/Product';
import {
  changeProductColor,
  removeProduct,
  changeProductCount,
} from '../../store/user/user_actions';

interface Props extends Product {
  count: number;
}

const ProductCardInCheckout = ({ p }: { p: Props }) => {
  const colors = ['Black', 'Brown', 'Silver', 'White', 'Blue'];
  const dispatch = useAppDispatch();

  const handleColorChange = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch(changeProductColor({ color: e.target.value, productId: p._id }));
  };

  const handleQuantityChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(changeProductCount({ count: +e.target.value, productId: p._id }));
  };

  const handleRemove = () => {
    dispatch(removeProduct(p._id));
  };

  return (
    <tbody>
      <tr>
        <td>
          {p.images.length ? (
            <Image
              src={p.images[0].url}
              alt="asndjkan i q wei"
              height={100}
              width={100}
            />
          ) : (
            <p>No image , sorry</p>
          )}
        </td>
        <td>{p.title}</td>
        <td>${p.price}</td>
        <td>{p.brand}</td>
        <td>
          <select
            onChange={handleColorChange}
            name="color"
            className="form-control"
          >
            {p.color ? (
              <option value={p.color}>{p.color}</option>
            ) : (
              <option>Select</option>
            )}
            {colors
              .filter((c) => c !== p.color)
              .map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
          </select>
        </td>
        <td className="text-center">
          <input
            type="number"
            className="form-control"
            value={p.count}
            onChange={handleQuantityChange}
          />
        </td>
        <td className="text-center">
          {p.shipping === 'Yes' ? (
            <CheckCircleOutlined className="text-success" />
          ) : (
            <CloseCircleOutlined className="text-danger" />
          )}
        </td>
        <td className="text-center">
          <CloseOutlined
            onClick={handleRemove}
            className="text-danger pointer"
          />
        </td>
      </tr>
    </tbody>
  );
};

export default ProductCardInCheckout;
