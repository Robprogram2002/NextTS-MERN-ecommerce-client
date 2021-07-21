import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import StripeCheckout from '../../components/Forms/StripeCheckOut';

// load stripe outside of components render to avoid recreating stripe object on every render
const promise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

const Payment = () => (
  <div className="container p-5 text-center">
    <h4>Complete your purchase</h4>
    <Elements stripe={promise}>
      <div className="col-md-8 offset-md-2">
        <StripeCheckout />
      </div>
    </Elements>
  </div>
);
export default Payment;
