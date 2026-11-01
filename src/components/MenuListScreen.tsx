import { useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { menuColors } from '../constants/menuTheme';
import { CourseFilter, MENU_COURSES, MenuItem } from '../types';
import { filterMenuItems } from '../utils/menuHelpers';
import MenuItemCard from './MenuItemCard';
import MenuStatistics from './MenuStatistics';

interface MenuListScreenProps {
  items: MenuItem[];
  onAddPress: () => void;
  onEditPress: (item: MenuItem) => void;
  onDeletePress: (item: MenuItem) => void;
}

const FILTER_OPTIONS: CourseFilter[] = ['All', ...MENU_COURSES];

export default function MenuListScreen({
  items,
  onAddPress,
  onEditPress,
  onDeletePress,
}: MenuListScreenProps) {
  const [searchText, setSearchText] = useState('');
  const [courseFilter, setCourseFilter] = useState<CourseFilter>('All');
  const visibleItems = filterMenuItems(items, searchText, courseFilter);
  const hasActiveFilters = searchText.trim().length > 0 || courseFilter !== 'All';

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Menu</Text>
      <MenuStatistics items={items} />
      <View style={styles.searchRow}>
        <TextInput
          style={styles.searchInput}
          value={searchText}
          onChangeText={setSearchText}
          placeholder="Search by dish name"
          placeholderTextColor={menuColors.subtle}
          accessibilityLabel="Search menu items by dish name"
          returnKeyType="search"
        />
        {searchText.length > 0 ? (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel="Clear search"
            onPress={() => setSearchText('')}
            style={styles.clearButton}>
            <Text style={styles.clearButtonText}>Clear</Text>
          </TouchableOpacity>
        ) : null}
      </View>
      <View style={styles.filterHeader}>
        <Text style={styles.filterLabel}>Filter by course</Text>
        {hasActiveFilters ? (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel="Clear search and course filters"
            onPress={() => {
              setSearchText('');
              setCourseFilter('All');
            }}>
            <Text style={styles.clearFiltersText}>Clear Filters</Text>
          </TouchableOpacity>
        ) : null}
      </View>
      <View style={styles.filterOptions}>
        {FILTER_OPTIONS.map((option) => {
          const selected = courseFilter === option;
          return (
            <TouchableOpacity
              key={option}
              accessibilityRole="button"
              accessibilityState={{ selected }}
              onPress={() => setCourseFilter(option)}
              style={[styles.filterChip, selected ? styles.filterChipSelected : null]}>
              <Text style={[styles.filterChipText, selected ? styles.filterChipTextSelected : null]}>
                {option}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      {items.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>Your menu is empty</Text>
          <Text style={styles.emptyMessage}>
            Add your first dish to start building your restaurant menu.
          </Text>
          <TouchableOpacity
            style={styles.emptyButton}
            onPress={onAddPress}
            accessibilityRole="button">
            <Text style={styles.emptyButtonText}>Add your first menu item</Text>
          </TouchableOpacity>
        </View>
      ) : (
        visibleItems.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>No matching dishes</Text>
            <Text style={styles.emptyMessage}>
              Try a different search or course, or clear them to see your full menu.
            </Text>
            <TouchableOpacity
              style={styles.emptyButton}
              onPress={() => {
                setSearchText('');
                setCourseFilter('All');
              }}
              accessibilityRole="button">
              <Text style={styles.emptyButtonText}>Clear search and filters</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <FlatList
            data={visibleItems}
            keyExtractor={(item: MenuItem) => item.id}
            contentContainerStyle={styles.listContent}
            renderItem={({ item }: { item: MenuItem }) => (
              <MenuItemCard
                item={item}
                onEditPress={onEditPress}
                onDeletePress={onDeletePress}
              />
            )}
          />
        )
      )}
      {items.length > 0 ? (
        <TouchableOpacity
          style={styles.addButton}
          onPress={onAddPress}
          accessibilityRole="button">
          <Text style={styles.addButtonText}>+ Add menu item</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: menuColors.background },
  title: { fontSize: 28, fontWeight: '700', color: menuColors.text, marginTop: 10, marginBottom: 22, letterSpacing: -0.5 },
  emptyState: {
    backgroundColor: menuColors.surface, borderColor: menuColors.border, borderWidth: 1,
    borderRadius: 16, padding: 24, alignItems: 'center', marginTop: 4,
  },
  emptyTitle: { fontSize: 17, fontWeight: '700', color: menuColors.text, textAlign: 'center' },
  emptyMessage: { fontSize: 13, lineHeight: 19, color: menuColors.muted, marginTop: 7, textAlign: 'center' },
  emptyButton: {
    minHeight: 44, justifyContent: 'center', backgroundColor: menuColors.primary,
    borderRadius: 12, paddingHorizontal: 16, paddingVertical: 11, marginTop: 18,
  },
  emptyButtonText: { color: menuColors.surface, fontWeight: '700', fontSize: 14, textAlign: 'center' },
  searchRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16, gap: 8 },
  searchInput: {
    flex: 1, minHeight: 46, backgroundColor: menuColors.surface, borderWidth: 1,
    borderColor: menuColors.border, borderRadius: 12, paddingHorizontal: 14,
    paddingVertical: 11, fontSize: 14, color: menuColors.text,
  },
  clearButton: { minHeight: 44, justifyContent: 'center', paddingHorizontal: 8 },
  clearButtonText: { color: menuColors.primary, fontSize: 13, fontWeight: '700' },
  filterHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 9 },
  filterLabel: { color: menuColors.text, fontSize: 12, fontWeight: '700' },
  clearFiltersText: { color: menuColors.primary, fontSize: 12, fontWeight: '700' },
  filterOptions: { flexDirection: 'row', flexWrap: 'wrap', gap: 7, marginBottom: 16 },
  filterChip: {
    minHeight: 38, justifyContent: 'center', borderWidth: 1, borderColor: menuColors.border,
    backgroundColor: menuColors.surface, borderRadius: 20, paddingHorizontal: 11, paddingVertical: 8,
  },
  filterChipSelected: { backgroundColor: menuColors.primaryLight, borderColor: menuColors.primary },
  filterChipText: { color: menuColors.muted, fontSize: 11, fontWeight: '600' },
  filterChipTextSelected: { color: menuColors.primary, fontWeight: '800' },
  listContent: { paddingBottom: 10 },
  addButton: {
    minHeight: 48, justifyContent: 'center', backgroundColor: menuColors.primary, borderRadius: 14,
    paddingHorizontal: 16, paddingVertical: 12, alignItems: 'center', marginTop: 8,
    shadowColor: menuColors.primary, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 8,
    elevation: 4,
  },
  addButtonText: { color: menuColors.surface, fontWeight: '700', fontSize: 15 },
});