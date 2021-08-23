type CategoryCount = {
  name: string;
  value: number;
};

export type CategoryCountResponse = CategoryCount[];

export type CategoryResponse = {
  id: number;
  name: string;
  categories?: CategoryResponse[];
};
