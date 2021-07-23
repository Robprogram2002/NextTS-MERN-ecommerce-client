import { GetServerSidePropsContext } from 'next';
import axios from 'axios';
import ProductCard from '../../components/cards/ProductCard';
import { Product } from '../../types/Product';
import { SubCategory } from '../../types/Category';

interface SubHomeProps {
  products: Product[];
  subcategory: SubCategory;
}

const SubHome = ({ products, subcategory }: SubHomeProps) => (
  <div className="container-fluid">
    <div className="row">
      <div className="col">
        {!products || !subcategory ? (
          <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
            Loading...
          </h4>
        ) : (
          <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
            {`${products.length} Products in "${subcategory.name}" sub
              category`}
          </h4>
        )}
      </div>
    </div>

    <div className="row">
      {products &&
        products.map((p) => (
          <div className="col" key={p._id}>
            <ProductCard product={p} />
          </div>
        ))}
    </div>
  </div>
);

export default SubHome;

export async function getServerSideProps({
  params,
}: GetServerSidePropsContext) {
  try {
    const slug = params?.slug;

    const subRes = await axios.get(
      `${process.env.NEXT_PUBLIC_API}/subs/${slug}`
    );

    const prodRes = await axios.get(
      `${process.env.NEXT_PUBLIC_API}/subs/${slug}/products`
    );

    if (prodRes.status !== 200 || subRes.status !== 200)
      throw new Error('something went wrong');

    return {
      props: {
        products: prodRes.data,
        subcategory: subRes.data,
      },
    };
  } catch (error) {
    return {
      props: { error: 'something went wrong' },
    };
  }
}
