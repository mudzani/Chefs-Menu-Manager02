import { useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { CourseFilter, MENU_COURSES, MenuItem } from '../types';
import { filterMenuItems } from '../utils/menuHelpers';
import MenuItemCard from './MenuItemCard';

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
      <View style={styles.searchRow}>
        <TextInput
          style={styles.searchInput}
          value={searchText}
          onChangeText={setSearchText}
          placeholder="Search by dish name"
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
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No menu items yet</Text>
          <Text style={styles.emptySubtext}>Tap below to add your first dish</Text>
        </View>
      ) : (
        visibleItems.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No dishes found</Text>
            <Text style={styles.emptySubtext}>Try another dish name or clear the search.</Text>
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
      <TouchableOpacity style={styles.addButton} onPress={onAddPress}>
        <Text style={styles.addButtonText}>+ Add new item</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#FAFAF9' },
  title: { fontSize: 28, fontWeight: '700', color: '#2A2118', marginTop: 10, marginBottom: 24, letterSpacing: -0.5 },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingBottom: 80 },
  emptyText: { fontSize: 17, fontWeight: '600', color: '#8A8178' },
  emptySubtext: { fontSize: 13, color: '#B0A89C', marginTop: 6 },
  searchRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  searchInput: {
    flex: 1, backgroundColor: '#fff', borderWidth: 1, borderColor: '#EDE7DF',
    borderRadius: 12, paddingHorizontal: 14, paddingVertical: 12, fontSize: 14, color: '#2A2118',
  },
  clearButton: { paddingVertical: 10, paddingLeft: 12 },
  clearButtonText: { color: '#B04E1F', fontSize: 13, fontWeight: '700' },
  filterHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 9 },
  filterLabel: { color: '#2A2118', fontSize: 12, fontWeight: '700' },
  clearFiltersText: { color: '#B04E1F', fontSize: 12, fontWeight: '700' },
  filterOptions: { flexDirection: 'row', flexWrap: 'wrap', gap: 7, marginBottom: 16 },
  filterChip: { borderWidth: 1, borderColor: '#EDE7DF', backgroundColor: '#fff', borderRadius: 20, paddingHorizontal: 11, paddingVertical: 8 },
  filterChipSelected: { backgroundColor: '#FBEDE4', borderColor: '#D35400' },
  filterChipText: { color: '#8A8178', fontSize: 11, fontWeight: '600' },
  filterChipTextSelected: { color: '#B04E1F', fontWeight: '800' },
  listContent: { paddingBottom: 10 },
  addButton: {
    backgroundColor: '#D35400', borderRadius: 14,
    paddingVertical: 16, alignItems: 'center', marginTop: 8,
    shadowColor: '#D35400', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.25, shadowRadius: 8,
    elevation: 4,
  },
  addButtonText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});