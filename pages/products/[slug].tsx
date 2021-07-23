import { GetServerSidePropsContext } from 'next';
import { LoadingOutlined } from '@ant-design/icons';
import axios from 'axios';
import SingleProduct from '../../components/cards/SingleProduct';
import ProductCard from '../../components/cards/ProductCard';
import { Product } from '../../types/Product';

interface ProductPageProps {
  product: Product;
  relatedProducts: Product[];
}

const ProductPage = ({ product, relatedProducts }: ProductPageProps) => (
  <>
    {product ? (
      <div className="container-fluid">
        <div className="row pt-4">
          <SingleProduct product={product} />
        </div>

        <div className="row">
          <div className="col text-center pt-5 pb-5">
            <hr />
            <h4>Related Products</h4>
            <hr />
          </div>
        </div>

        <div className="row pb-5">
          {relatedProducts ? (
            relatedProducts.map((r) => (
              <div key={r._id} className="col-md-3">
                <ProductCard product={r} />
              </div>
            ))
          ) : (
            <div className="text-center col">No Products Found</div>
          )}
        </div>
      </div>
    ) : (
      <LoadingOutlined />
    )}
  </>
);
export default ProductPage;

export async function getServerSideProps({
  params,
}: GetServerSidePropsContext) {
  try {
    console.log(params);
    const prodSlug = params?.slug;

    const prodRes = await axios.get(`/products/${prodSlug}`);

    const relatedRes = await axios.get(
      `${process.env.NEXT_PUBLIC_API}/products/${prodSlug}/relates`
    );

    if (prodRes.status !== 200 || relatedRes.status !== 200)
      throw new Error('something went wrong');

    return {
      props: {
        product: prodRes.data,
        relatedProducts: relatedRes.data,
      },
    };
  } catch (error) {
    return {
      props: { error: 'something went wrong' },
    };
  }
}
