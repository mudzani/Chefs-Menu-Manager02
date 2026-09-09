import { useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity
} from 'react-native';
import { MenuItem } from '../types';

interface AddMenuItemScreenProps {
  onSave: (newItem: MenuItem) => void;
}

export default function AddMenuItemScreen({ onSave }: AddMenuItemScreenProps) {
  const [dishName, setDishName] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState('');
  const [price, setPrice] = useState('');

  const handleSave = () => {
    const trimmedName = dishName.trim();
    const trimmedDescription = description.trim();
    const trimmedCourse = course.trim();
    const parsedPrice = Number(price);

    if (!trimmedName || !trimmedDescription || !trimmedCourse || Number.isNaN(parsedPrice)) {
      return;
    }

    onSave({
      dishName: trimmedName,
      description: trimmedDescription,
      course: trimmedCourse,
      price: parsedPrice,
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <Text style={styles.title}>Add menu item</Text>

      <Text style={styles.label}>Dish name</Text>
      <TextInput
        style={styles.input}
        value={dishName}
        onChangeText={setDishName}
        placeholder="e.g. Truffle Pasta"
      />

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, styles.multiline]}
        value={description}
        onChangeText={setDescription}
        placeholder="Describe the dish"
        multiline
        numberOfLines={4}
      />

      <Text style={styles.label}>Course</Text>
      <TextInput
        style={styles.input}
        value={course}
        onChangeText={setCourse}
        placeholder="Starter, Main, Dessert"
      />

      <Text style={styles.label}>Price</Text>
      <TextInput
        style={styles.input}
        value={price}
        onChangeText={setPrice}
        placeholder="0.00"
        keyboardType="decimal-pad"
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save item</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#FAFAF9', flexGrow: 1 },
  title: { fontSize: 24, fontWeight: '700', color: '#2A2118', textAlign: 'center', marginTop: 10, marginBottom: 28 },
  label: { fontSize: 13, fontWeight: '600', color: '#8A8178', marginBottom: 6, marginTop: 16, textTransform: 'uppercase', letterSpacing: 0.3 },
  input: {
    backgroundColor: '#fff', borderWidth: 1.5, borderColor: '#EDE7DF', borderRadius: 12,
    paddingHorizontal: 16, paddingVertical: 13, fontSize: 15, color: '#2A2118',
  },
  inputError: { borderColor: '#D32F2F' },
  errorText: { color: '#D32F2F', fontSize: 12, marginTop: 5, fontWeight: '500' },
  multiline: { height: 90, textAlignVertical: 'top' },
  pickerWrapper: { backgroundColor: '#fff', borderWidth: 1.5, borderColor: '#EDE7DF', borderRadius: 12, overflow: 'hidden' },
  saveButton: {
    backgroundColor: '#D35400', borderRadius: 14, paddingVertical: 16, alignItems: 'center', marginTop: 32,
    shadowColor: '#D35400', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.25, shadowRadius: 8,
    elevation: 4,
  },
  saveButtonText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});