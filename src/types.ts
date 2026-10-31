export const MENU_COURSES = ['Starter', 'Main Course', 'Dessert'] as const;

export type MenuCourse = (typeof MENU_COURSES)[number];

export interface MenuItem {
  id: string;
  dishName: string;
  description: string;
  course: MenuCourse;
  price: number;
}

export type MenuItemInput = Omit<MenuItem, 'id'>;