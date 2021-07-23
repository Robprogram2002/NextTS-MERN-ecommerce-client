import Link from 'next/Link';
import { SubCategory } from '../../types/Category';

interface SubListProps {
  subcategories: SubCategory[];
}

const SubList = ({ subcategories }: SubListProps) => {
  const showSubs = () =>
    subcategories.map((s) => (
      <div
        key={s._id}
        className="col btn btn-outlined-primary btn-lg btn-block btn-raised m-3"
      >
        <Link href={`/sub-category/${s.slug}`}>{s.name}</Link>
      </div>
    ));

  return (
    <div className="container">
      <div className="row">
        {subcategories.length === 0 ? (
          <h4 className="text-center">Loading...</h4>
        ) : (
          showSubs()
        )}
      </div>
    </div>
  );
};

export default SubList;
