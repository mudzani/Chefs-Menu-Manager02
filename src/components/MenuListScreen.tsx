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
              <View>
                <Text style={styles.itemName}>{item.dishName}</Text>
                <Text style={styles.itemCourse}>{item.course}</Text>
              </View>
              <Text style={styles.itemPrice}>R{item.price}</Text>
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
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: '600', textAlign: 'center', marginBottom: 20 },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { fontSize: 16, fontWeight: '600', color: '#666' },
  emptySubtext: { fontSize: 13, color: '#999', marginTop: 6 },
  listContent: { paddingBottom: 10 },
  itemRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    borderWidth: 1, borderColor: '#eee', borderRadius: 10, padding: 14, marginBottom: 10,
  },
  itemName: { fontSize: 15, fontWeight: '600' },
  itemCourse: { fontSize: 12, color: '#888', marginTop: 2 },
  itemPrice: { fontSize: 15, fontWeight: '500' },
  addButton: {
    borderWidth: 2, borderColor: '#D35400', borderRadius: 12,
    paddingVertical: 14, alignItems: 'center', marginTop: 10,
  },
  addButtonText: { color: '#D35400', fontWeight: '700', fontSize: 15 },
});