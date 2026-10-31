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
