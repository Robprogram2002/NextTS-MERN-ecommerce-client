export type Category = {
  name: string;
  slug: string;
  _id: string;
};

export type SubCategory = {
  name: string;
  slug: string;
  _id: string;
  parent: string;
};
