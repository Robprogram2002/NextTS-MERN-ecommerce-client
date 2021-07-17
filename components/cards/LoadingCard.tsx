import { Card, Skeleton } from 'antd';

const LoadingCard = ({ count }: { count: number }) => {
  const cards = () => {
    const totalCards = [];

    for (let i = 0; i < count; i += 1) {
      totalCards.push(
        <Card className="col-md-4" key={i}>
          <Skeleton active />
        </Card>
      );
    }

    return totalCards;
  };

  return <div className="row pb-5">{cards()}</div>;
};

export default LoadingCard;
