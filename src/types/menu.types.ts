export interface IMenuItem {
  id: string | number;
  name: string;
  category: string;
  price: number;
  status: TStatus;
  description: string;
  image?: string;
}

export type TStatus = "active" | "inactive";

export type TSortField = "name" | "price" | "category";
export type TSortDirection = "asc" | "desc";
