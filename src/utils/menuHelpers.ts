import type { CourseFilter, MenuItem } from '../types';

export function filterMenuItems(
  items: MenuItem[],
  searchText: string,
  courseFilter: CourseFilter,
): MenuItem[] {
  const normalizedSearch = searchText.trim().toLocaleLowerCase();

  // Both conditions must match, so choosing a course narrows the name search.
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
  // Count each course while summing prices, then average the unrounded total.
  const totalPrice = items.reduce((sum, item) => {
    courseCounts[item.course] += 1;
    return sum + item.price;
  }, 0);

  return {
    totalItems: items.length,
    // Avoid dividing by zero when the menu has no items.
    averagePrice: items.length === 0 ? 0 : totalPrice / items.length,
    courseCounts,
  };
}

export function formatPrice(price: number): string {
  return `R${price.toFixed(2)}`;
}
