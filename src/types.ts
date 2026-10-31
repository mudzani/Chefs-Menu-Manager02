export interface MenuItem {
  id: string;
  dishName: string;
  description: string;
  course: string;
  price: number;
}

export type MenuItemInput = Omit<MenuItem, 'id'>;