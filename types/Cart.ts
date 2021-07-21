export interface Cart {
  products: { product: any; count: number; color: string }[];
  totalAmount: number;
  appliedCoupon: string | null;
}
