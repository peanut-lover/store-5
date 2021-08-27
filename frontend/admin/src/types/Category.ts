export interface Category {
  id: number;
  name: string;
  categories?: Category[];
}

export interface BestSelledCategory {
  name: string;
  total: number;
}

export interface CategoryView {
  name: string;
  view: number;
}

export interface CategoryWithParent {
  id: number;
  name: string;
  parent: number;
}
