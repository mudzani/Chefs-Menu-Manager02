import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MenuItem } from '../types';

interface MenuItemCardProps {
  item: MenuItem;
  onEditPress: (item: MenuItem) => void;
  onDeletePress: (item: MenuItem) => void;
}

export default function MenuItemCard({
  item,
  onEditPress,
  onDeletePress,
}: MenuItemCardProps) {
  return (
    <View style={styles.itemRow}>
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.dishName}</Text>
        <View style={styles.coursePill}>
          <Text style={styles.coursePillText}>{item.course}</Text>
        </View>
      </View>
      <View style={styles.itemActions}>
        <Text style={styles.itemPrice}>R{item.price.toFixed(2)}</Text>
        <View style={styles.actionButtons}>
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel={`Edit ${item.dishName}`}
            onPress={() => onEditPress(item)}
            style={styles.editButton}>
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel={`Delete ${item.dishName}`}
            onPress={() => onDeletePress(item)}
            style={styles.deleteButton}>
            <Text style={styles.deleteButtonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  itemRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: '#fff', borderRadius: 16, padding: 16, marginBottom: 12,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 6,
    elevation: 2,
  },
  itemInfo: { flex: 1, marginRight: 10 },
  itemActions: { alignItems: 'flex-end', gap: 8 },
  actionButtons: { flexDirection: 'row', gap: 8 },
  itemName: { fontSize: 16, fontWeight: '700', color: '#2A2118', marginBottom: 6 },
  coursePill: { backgroundColor: '#FBEDE4', alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 3, borderRadius: 20 },
  coursePillText: { fontSize: 11, fontWeight: '600', color: '#B04E1F' },
  itemPrice: { fontSize: 17, fontWeight: '700', color: '#D35400' },
  editButton: { borderWidth: 1, borderColor: '#EDE7DF', borderRadius: 8, paddingHorizontal: 11, paddingVertical: 6 },
  editButtonText: { color: '#2A2118', fontSize: 12, fontWeight: '700' },
  deleteButton: { backgroundColor: '#FDECEB', borderRadius: 8, paddingHorizontal: 11, paddingVertical: 6 },
  deleteButtonText: { color: '#B42318', fontSize: 12, fontWeight: '700' },
});
