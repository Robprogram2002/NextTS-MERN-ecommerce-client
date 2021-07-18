import { Category, SubCategory } from './Category';

enum Colors {
  'Black',
  'Brown',
  'Silver',
  'White',
  'Blue',
}

enum Brands {
  'Apple',
  'Samsung',
  'Microsoft',
  'Lenovo',
  'ASUS',
}

export const brandsArray = ['Apple', 'Samsung', 'Microsoft', 'Lenovo', 'ASUS'];
export const colorsArray = ['Black', 'Brown', 'Silver', 'White', 'Blue'];

export type Product = {
  title: string;
  slug: string;
  description: string;
  price: string;
  category: string | Category;
  subs: string[] | SubCategory[];
  quantity: string;
  sold: number;
  images: [{ url: any; public_id: string }];
  shipping: 'Yes' | 'No';
  color: any;
  brand: any;
  createdAt: Date;
  updatedAt: Date;
  _id: string;
  ratings: any[];
};

export type ProductValues = {
  title: string;
  description: string;
  price: string;
  category: string;
  shipping: string;
  quantity: string;
  images: any[];
  color: string;
  brand: string;
  subs: any[];
};
