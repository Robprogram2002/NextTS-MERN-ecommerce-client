import Link from 'next/Link';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAppSelector, useAppDispatch } from '../../hooks/redux_hooks';
import { Cart } from '../../types/Cart';
import ProductCardInCheckout from '../../components/cards/ProductCardInCheckout';
import { getCompleteCart } from '../../store/user/user_actions';

const CartPage = () => {
  const { cart, authenticated }: { cart: Cart; authenticated: boolean } =
    useAppSelector((state) => state.userState);

  const { loading } = useAppSelector((state) => state.appState);

  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCompleteCart());
  }, []);

  const saveOrderToDb = () => {
    // console.log("cart", JSON.stringify(cart, null, 4));
    // userCart(cart, user.token)
    //   .then((res) => {
    //     console.log('CART POST RES', res);
    //     if (res.data.ok) history.push('/checkout');
    //   })
    //   .catch((err) => console.log('cart save err', err));
    router.push('/payment/checkout');
  };

  const showCartItems = () => {
    if (!loading && typeof cart.products[0].product !== 'string') {
      return (
        <table className="table table-bordered">
          <thead className="thead-light">
            <tr>
              <th scope="col">Image</th>
              <th scope="col">Title</th>
              <th scope="col">Price</th>
              <th scope="col">Brand</th>
              <th scope="col">Color</th>
              <th scope="col">Count</th>
              <th scope="col">Shipping</th>
              <th scope="col">Remove</th>
            </tr>
          </thead>
          {cart.products.map(({ product, count }) => {
            const pCart = { ...product, count };
            return <ProductCardInCheckout key={product._id} p={pCart} />;
          })}
        </table>
      );
    }
    return <h2>Loading ...</h2>;
  };

  return (
    <div className="container-fluid pt-2">
      <div className="row">
        <div className="col-md-8">
          <h4>Cart / {cart.products.length} Product</h4>

          {cart.products.length === 0 ? (
            <p>
              No products in cart. <Link href="/shop">Continue Shopping.</Link>
            </p>
          ) : (
            showCartItems()
          )}
        </div>
        <div className="col-md-4">
          <h4>Order Summary</h4>
          <hr />
          <p>Products</p>
          {cart.products.length > 0 &&
            typeof cart.products[0].product !== 'string' &&
            cart.products.map(({ product, count }) => (
              <div key={product.slug}>
                <p>
                  {product.title} x {count} = $
                  {(+product.price * count).toFixed(2)}
                </p>
              </div>
            ))}
          <hr />
          Total: <b>${cart.totalAmount.toFixed(2)}</b>
          <hr />
          {authenticated ? (
            <button
              type="button"
              onClick={saveOrderToDb}
              className="btn btn-sm btn-primary mt-2"
              disabled={!cart.products.length}
            >
              Proceed to Checkout
            </button>
          ) : (
            <button type="button" className="btn btn-sm btn-primary mt-2">
              <Link
                href={{
                  pathname: '/login',
                  query: { from: 'cart' },
                }}
              >
                Login to Checkout
              </Link>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartPage;
