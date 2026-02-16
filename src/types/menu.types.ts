export interface IMenuItem {
  id: string | number;
  name: string;
  category: string;
  /**
   * Price stored as integer cents (LKR). Example: LKR 12.34 => 1234
   */
  price: number;
  status: TStatus;
  description: string;
  image?: string;
}

export type TStatus = "active" | "inactive";

export type TSortField = "name" | "price" | "category";
export type TSortDirection = "asc" | "desc";
