import { GetServerSidePropsContext } from 'next';
import axios from 'axios';
import ProductCard from '../../components/cards/ProductCard';
import { Product } from '../../types/Product';
import { Category } from '../../types/Category';

interface CategoryHomeProps {
  products: Product[];
  category: Category;
}

const CategoryHome = ({ products, category }: CategoryHomeProps) => (
  <div className="container-fluid">
    <div className="row">
      <div className="col">
        {!products || !category ? (
          <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
            Loading...
          </h4>
        ) : (
          <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
            {`${products.length} Products in " ${category.name} " category`}
          </h4>
        )}
      </div>
    </div>

    {products && (
      <div className="row">
        {products.map((p) => (
          <div className="col" key={p._id}>
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    )}
  </div>
);

export default CategoryHome;

export async function getServerSideProps({
  params,
}: GetServerSidePropsContext) {
  try {
    console.log(params);
    const slug = params?.slug;

    const catRes = await axios.get(
      `${process.env.NEXT_PUBLIC_API}/categories/${slug}`
    );

    const prodRes = await axios.get(
      `${process.env.NEXT_PUBLIC_API}/categories/${slug}/products`
    );

    if (prodRes.status !== 200 || catRes.status !== 200)
      throw new Error('something went wrong');

    return {
      props: {
        products: prodRes.data,
        category: catRes.data,
      },
    };
  } catch (error) {
    return {
      props: { error: 'something went wrong' },
    };
  }
}
