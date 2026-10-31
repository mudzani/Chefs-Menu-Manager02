import { useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { MENU_COURSES, MenuCourse, MenuItemInput } from '../types';

interface AddMenuItemScreenProps {
  onSave: (newItem: MenuItemInput) => void;
}

interface FormErrors {
  dishName?: string;
  description?: string;
  course?: string;
  price?: string;
}

export default function AddMenuItemScreen({ onSave }: AddMenuItemScreenProps) {
  const [dishName, setDishName] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState<MenuCourse | ''>('');
  const [price, setPrice] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});

  const handleSave = () => {
    const trimmedName = dishName.trim();
    const trimmedDescription = description.trim();
    const trimmedPrice = price.trim();
    const parsedPrice = Number(trimmedPrice);
    const nextErrors: FormErrors = {};

    if (!trimmedName) nextErrors.dishName = 'Enter a dish name.';
    if (!trimmedDescription) nextErrors.description = 'Enter a description.';
    if (!course) nextErrors.course = 'Select a course.';
    if (!trimmedPrice) {
      nextErrors.price = 'Enter a price.';
    } else if (!Number.isFinite(parsedPrice) || parsedPrice < 0) {
      nextErrors.price = 'Enter a valid price of 0 or more.';
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0 || !course) return;

    onSave({
      dishName: trimmedName,
      description: trimmedDescription,
      course,
      price: parsedPrice,
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <Text style={styles.title}>Add menu item</Text>

      <Text style={styles.label}>Dish name</Text>
      <TextInput
        style={[styles.input, errors.dishName ? styles.inputError : null]}
        value={dishName}
        onChangeText={(value) => {
          setDishName(value);
          setErrors((current) => ({ ...current, dishName: undefined }));
        }}
        placeholder="e.g. Truffle Pasta"
      />
      {errors.dishName ? <Text style={styles.errorText}>{errors.dishName}</Text> : null}

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, styles.multiline, errors.description ? styles.inputError : null]}
        value={description}
        onChangeText={(value) => {
          setDescription(value);
          setErrors((current) => ({ ...current, description: undefined }));
        }}
        placeholder="Describe the dish"
        multiline
        numberOfLines={4}
      />
      {errors.description ? <Text style={styles.errorText}>{errors.description}</Text> : null}

      <Text style={styles.label}>Course</Text>
      <View style={styles.courseOptions}>
        {MENU_COURSES.map((option) => {
          const selected = course === option;
          return (
            <TouchableOpacity
              key={option}
              accessibilityRole="button"
              accessibilityState={{ selected }}
              onPress={() => {
                setCourse(option);
                setErrors((current) => ({ ...current, course: undefined }));
              }}
              style={[styles.courseOption, selected ? styles.courseOptionSelected : null]}>
              <Text style={[styles.courseOptionText, selected ? styles.courseOptionTextSelected : null]}>
                {option}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      {errors.course ? <Text style={styles.errorText}>{errors.course}</Text> : null}

      <Text style={styles.label}>Price</Text>
      <TextInput
        style={[styles.input, errors.price ? styles.inputError : null]}
        value={price}
        onChangeText={(value) => {
          setPrice(value);
          setErrors((current) => ({ ...current, price: undefined }));
        }}
        placeholder="0.00"
        keyboardType="decimal-pad"
      />
      {errors.price ? <Text style={styles.errorText}>{errors.price}</Text> : null}

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
  courseOptions: { gap: 8 },
  courseOption: { backgroundColor: '#fff', borderColor: '#EDE7DF', borderWidth: 1.5, borderRadius: 12, paddingHorizontal: 16, paddingVertical: 13 },
  courseOptionSelected: { backgroundColor: '#FBEDE4', borderColor: '#D35400' },
  courseOptionText: { color: '#8A8178', fontSize: 15, fontWeight: '600' },
  courseOptionTextSelected: { color: '#B04E1F', fontWeight: '700' },
  saveButton: {
    backgroundColor: '#D35400', borderRadius: 14, paddingVertical: 16, alignItems: 'center', marginTop: 32,
    shadowColor: '#D35400', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.25, shadowRadius: 8,
    elevation: 4,
  },
  saveButtonText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});