import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { menuColors } from '../constants/menuTheme';
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
      <View style={styles.headingRow}>
        <View style={styles.itemInfo}>
          <Text style={styles.itemName}>{item.dishName}</Text>
          <View style={styles.coursePill}>
            <Text style={styles.coursePillText}>{item.course}</Text>
          </View>
        </View>
        <Text style={styles.itemPrice}>R{item.price.toFixed(2)}</Text>
      </View>
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
  );
}

const styles = StyleSheet.create({
  itemRow: {
    backgroundColor: menuColors.surface, borderColor: menuColors.border, borderWidth: 1,
    borderRadius: 16, padding: 16, marginBottom: 12,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 6,
    elevation: 2,
  },
  headingRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 },
  itemInfo: { flex: 1 },
  itemName: { color: menuColors.text, fontSize: 16, fontWeight: '700', lineHeight: 22, flexShrink: 1 },
  coursePill: { backgroundColor: menuColors.primaryLight, alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 20, marginTop: 9 },
  coursePillText: { color: menuColors.primary, fontSize: 11, fontWeight: '700' },
  itemPrice: { color: menuColors.primary, fontSize: 16, fontWeight: '800', flexShrink: 0 },
  actionButtons: { flexDirection: 'row', justifyContent: 'flex-end', flexWrap: 'wrap', gap: 8, marginTop: 14 },
  editButton: {
    minHeight: 40, minWidth: 64, justifyContent: 'center', alignItems: 'center',
    borderRadius: 9, borderWidth: 1, borderColor: menuColors.border, paddingHorizontal: 12, paddingVertical: 8,
  },
  editButtonText: { color: menuColors.text, fontSize: 12, fontWeight: '700' },
  deleteButton: {
    minHeight: 40, minWidth: 72, justifyContent: 'center', alignItems: 'center',
    borderRadius: 9, backgroundColor: menuColors.dangerLight, paddingHorizontal: 12, paddingVertical: 8,
  },
  deleteButtonText: { color: menuColors.danger, fontSize: 12, fontWeight: '700' },
});
