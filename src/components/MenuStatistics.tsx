import { StyleSheet, Text, View } from 'react-native';
import { menuColors } from '../constants/menuTheme';
import { MenuItem } from '../types';
import { formatPrice, getMenuStatistics } from '../utils/menuHelpers';

interface MenuStatisticsProps {
  items: MenuItem[];
}

export default function MenuStatistics({ items }: MenuStatisticsProps) {
  const statistics = getMenuStatistics(items);

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Menu overview</Text>
      <View style={styles.summaryRow}>
        <View style={styles.summaryCard}>
          <Text style={styles.label}>Total items</Text>
          <Text style={styles.value}>{statistics.totalItems}</Text>
        </View>
        <View style={styles.summaryCard}>
          <Text style={styles.label}>Average price</Text>
          <Text style={styles.value}>{formatPrice(statistics.averagePrice)}</Text>
        </View>
      </View>
      <View style={styles.courseCard}>
        <Text style={styles.label}>Items by course</Text>
        <View style={styles.courseRow}>
          <Text style={styles.courseName}>Starters</Text>
          <Text style={styles.courseCount}>{statistics.courseCounts.Starter}</Text>
        </View>
        <View style={styles.courseRow}>
          <Text style={styles.courseName}>Main courses</Text>
          <Text style={styles.courseCount}>{statistics.courseCounts['Main Course']}</Text>
        </View>
        <View style={styles.courseRow}>
          <Text style={styles.courseName}>Desserts</Text>
          <Text style={styles.courseCount}>{statistics.courseCounts.Dessert}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 22 },
  sectionTitle: { color: menuColors.text, fontSize: 17, fontWeight: '800', marginBottom: 10 },
  summaryRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  summaryCard: {
    flex: 1, flexBasis: 130, backgroundColor: menuColors.surface, borderColor: menuColors.border, borderWidth: 1,
    borderRadius: 14, padding: 14,
  },
  label: { color: menuColors.muted, fontSize: 11, fontWeight: '600' },
  value: { color: menuColors.text, fontSize: 20, fontWeight: '800', marginTop: 6 },
  courseCard: {
    backgroundColor: menuColors.surface, borderColor: menuColors.border, borderWidth: 1,
    borderRadius: 14, padding: 14, marginTop: 10,
  },
  courseRow: { flexDirection: 'row', justifyContent: 'space-between', paddingTop: 9 },
  courseName: { color: menuColors.text, fontSize: 13 },
  courseCount: { color: menuColors.primary, fontSize: 13, fontWeight: '800' },
});
