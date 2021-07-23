import axios from 'axios';
import Jumbotron from '../components/cards/Jumbotron';
import NewArrivals from '../components/Home/NewArrivals';
import BestSellers from '../components/Home/BestSellers';
import CategoryList from '../components/Home/CategoryList';
import SubList from '../components/Home/SubList';
import { Product } from '../types/Product';
import { Category, SubCategory } from '../types/Category';

interface HomeProps {
  newests: Product[];
  bests: Product[];
  categories: Category[];
  subcategories: SubCategory[];
}

export default function Home({
  newests,
  bests,
  categories,
  subcategories,
}: HomeProps) {
  return (
    <>
      <div className="jumbotron text-danger h1 font-weight-bold text-center">
        <Jumbotron text={['Latest Products', 'New Arrivals', 'Best Sellers']} />
      </div>
      <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
        New Arrivals
      </h4>
      <NewArrivals newestsProducts={newests} />

      <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
        Best Sellers
      </h4>
      <BestSellers bestSellerProducts={bests} />

      <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
        Categories
      </h4>
      <CategoryList categories={categories} />

      <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
        Sub Categories
      </h4>
      <SubList subcategories={subcategories} />

      <br />
      <br />
    </>
  );
}

export async function getServerSideProps() {
  try {
    const prodRes = await axios.get(
      `${process.env.NEXT_PUBLIC_API}/products/selected`
    );

    const catRes = await axios.get(
      `${process.env.NEXT_PUBLIC_API}/categories/all`
    );

    if (prodRes.status !== 200 || catRes.status !== 200)
      throw new Error('something went wrong');

    const { newests, bests } = prodRes.data;
    const { categories, subcategories } = catRes.data;

    return {
      props: {
        newests,
        bests,
        categories,
        subcategories,
      },
    };
  } catch (error) {
    return {
      props: { error: 'something went wrong' },
    };
  }
}
