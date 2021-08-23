export interface Category {
  id: number;
  name: string;
  categories?: Category[];
}

export interface BestSelledCategory {
  name: string;
  total: number;
}
