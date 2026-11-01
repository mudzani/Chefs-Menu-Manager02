import type { CourseFilter, MenuItem } from '../types';

export function filterMenuItems(
  items: MenuItem[],
  searchText: string,
  courseFilter: CourseFilter,
): MenuItem[] {
  const normalizedSearch = searchText.trim().toLocaleLowerCase();

  return items.filter((item) => {
    const matchesName = item.dishName.toLocaleLowerCase().includes(normalizedSearch);
    const matchesCourse = courseFilter === 'All' || item.course === courseFilter;
    return matchesName && matchesCourse;
  });
}

export function getMenuStatistics(items: MenuItem[]) {
  const courseCounts = {
    Starter: 0,
    'Main Course': 0,
    Dessert: 0,
  };
  const totalPrice = items.reduce((sum, item) => {
    courseCounts[item.course] += 1;
    return sum + item.price;
  }, 0);

  return {
    totalItems: items.length,
    averagePrice: items.length === 0 ? 0 : totalPrice / items.length,
    courseCounts,
  };
}

export function formatPrice(price: number): string {
  return `R${price.toFixed(2)}`;
}
