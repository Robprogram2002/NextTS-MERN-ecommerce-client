import { Product } from '../types/Product';

interface CartProduct extends Product {
  count: number;
}

interface LStorageCart {
  products: CartProduct[];
  totalAmount: number;
  appliedCoupon: Boolean;
}

export default (product: Product) => {
  if (localStorage.getItem('cart') === null) {
    //   there is no cart yet, create one
    const newCart: LStorageCart = {
      products: [
        {
          ...product,
          count: 1,
        },
      ],
      appliedCoupon: false,
      totalAmount: +product.price,
    };
    localStorage.setItem('cart', JSON.stringify(newCart));
  }

  const cart: LStorageCart = JSON.parse(localStorage.getItem('cart')!);
  const index = cart.products.findIndex(
    (obj) => obj._id.toString() === product._id.toString()
  );

  if (index === -1) {
    //   the product is new in the cart
    cart.products.push({ ...product, count: 1 });
    cart.totalAmount += +product.price;
  } else {
    //   the product already exist , updated the acount
    cart.products[index].count += 1;
  }

  //   update the local storage
  localStorage.removeItem('cart');
  localStorage.setItem('cart', JSON.stringify(cart));
};
