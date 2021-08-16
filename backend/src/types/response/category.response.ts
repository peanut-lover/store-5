export type CategoryResponse = {
  id: number;
  name: string;
  categories?: CategoryResponse[];
};
