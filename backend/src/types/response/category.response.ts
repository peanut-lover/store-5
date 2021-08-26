type CategoryCount = {
  name: string;
  value: number;
};

type CategorySellCount = {
  name: string;
  total: number;
};

type CategoryViewCount = {
  name: string;
  view: number;
};

export type CategoryCountResponse = CategoryCount[];
export type CategorySellCountResponse = CategorySellCount[];
export type CategoryViewCountResponse = CategoryViewCount[];

export type CategoryResponse = {
  id: number;
  name: string;
  categories?: CategoryResponse[];
};

export type CategoryRatio = {
  name: string;
  count: number;
};
