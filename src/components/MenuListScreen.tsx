import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MenuItem } from '../types';

interface MenuListScreenProps {
  items: MenuItem[];
  onAddPress: () => void;
}

export default function MenuListScreen({ items, onAddPress }: MenuListScreenProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Menu</Text>
      {items.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No menu items yet</Text>
          <Text style={styles.emptySubtext}>Tap below to add your first dish</Text>
        </View>
      ) : (
        <FlatList
          data={items}
          keyExtractor={(_item: MenuItem, index: number) => index.toString()}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }: { item: MenuItem }) => (
           
<View style={styles.itemRow}>
  <View style={styles.itemInfo}>
    <Text style={styles.itemName}>{item.dishName}</Text>
    <View style={styles.coursePill}>
      <Text style={styles.coursePillText}>{item.course}</Text>
    </View>
  </View>
  <Text style={styles.itemPrice}>R{item.price.toFixed(2)}</Text>
</View>
          )}
        />
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
  listContent: { paddingBottom: 10 },
  itemRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: '#fff', borderRadius: 16, padding: 16, marginBottom: 12,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 6,
    elevation: 2,
  },
  itemInfo: { flex: 1, marginRight: 10 },
  itemName: { fontSize: 16, fontWeight: '700', color: '#2A2118', marginBottom: 6 },
  coursePill: { backgroundColor: '#FBEDE4', alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 3, borderRadius: 20 },
  coursePillText: { fontSize: 11, fontWeight: '600', color: '#B04E1F' },
  itemPrice: { fontSize: 17, fontWeight: '700', color: '#D35400' },
  addButton: {
    backgroundColor: '#D35400', borderRadius: 14,
    paddingVertical: 16, alignItems: 'center', marginTop: 8,
    shadowColor: '#D35400', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.25, shadowRadius: 8,
    elevation: 4,
  },
  addButtonText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});