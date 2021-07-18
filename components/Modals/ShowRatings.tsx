import StarRating from 'react-star-ratings';
import { Product } from '../../types/Product';

const ShowRatings = ({ product }: { product: Product }) => {
  const { ratings } = product;
  const total = ratings.map((element) => element.star);

  const totalReduced = total.reduce((p, n) => p + n, 0);

  const highest = ratings.length * 5;

  const result = (totalReduced * 5) / highest;

  return (
    <div className="text-center pt-1 pb-3">
      <span>
        <StarRating
          starDimension="20px"
          starSpacing="2px"
          starRatedColor="red"
          rating={result}
          editing={false}
        />{' '}
        ({ratings.length})
      </span>
    </div>
  );
};

export default ShowRatings;
