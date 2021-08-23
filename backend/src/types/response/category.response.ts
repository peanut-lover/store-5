type CategoryCount = {
  name: string;
  value: number;
};

type CategorySellCount = {
  name: string;
  total: number;
};

export type CategoryCountResponse = CategoryCount[];
export type CategorySellCountResponse = CategorySellCount[];

export type CategoryResponse = {
  id: number;
  name: string;
  categories?: CategoryResponse[];
};
