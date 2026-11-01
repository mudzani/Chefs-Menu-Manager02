import { useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { menuColors } from '../constants/menuTheme';
import { MENU_COURSES, MenuCourse, MenuItem, MenuItemInput } from '../types';

interface AddMenuItemScreenProps {
  initialItem?: MenuItem;
  onSave: (newItem: MenuItemInput) => void;
  onCancel: () => void;
}

interface FormErrors {
  dishName?: string;
  description?: string;
  course?: string;
  price?: string;
}

export default function AddMenuItemScreen({ initialItem, onSave, onCancel }: AddMenuItemScreenProps) {
  const [dishName, setDishName] = useState(initialItem?.dishName ?? '');
  const [description, setDescription] = useState(initialItem?.description ?? '');
  const [course, setCourse] = useState<MenuCourse | ''>(initialItem?.course ?? '');
  const [price, setPrice] = useState(initialItem ? String(initialItem.price) : '');
  const [errors, setErrors] = useState<FormErrors>({});
  const hasUnsavedChanges =
    dishName !== (initialItem?.dishName ?? '') ||
    description !== (initialItem?.description ?? '') ||
    course !== (initialItem?.course ?? '') ||
    price !== (initialItem ? String(initialItem.price) : '');

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

  const handleBackToMenu = () => {
    if (!hasUnsavedChanges) {
      onCancel();
      return;
    }

    Alert.alert(
      'Discard unsaved changes?',
      'Your changes will be lost if you go back to the menu.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Discard changes', style: 'destructive', onPress: onCancel },
      ],
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <Text style={styles.title}>{initialItem ? 'Edit menu item' : 'Add menu item'}</Text>

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
        <Text style={styles.saveButtonText}>{initialItem ? 'Save changes' : 'Save item'}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.backButton}
        onPress={handleBackToMenu}
        accessibilityRole="button">
        <Text style={styles.backButtonText}>← Back to menu</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: menuColors.background, flexGrow: 1 },
  title: { fontSize: 24, fontWeight: '700', color: menuColors.text, textAlign: 'center', marginTop: 10, marginBottom: 28 },
  label: { fontSize: 13, fontWeight: '700', color: menuColors.muted, marginBottom: 6, marginTop: 16, textTransform: 'uppercase', letterSpacing: 0.3 },
  input: {
    minHeight: 46, backgroundColor: menuColors.surface, borderWidth: 1, borderColor: menuColors.border,
    borderRadius: 12, paddingHorizontal: 16, paddingVertical: 12, fontSize: 15, color: menuColors.text,
  },
  inputError: { borderColor: menuColors.danger },
  errorText: { color: menuColors.danger, fontSize: 12, marginTop: 5, fontWeight: '500' },
  multiline: { height: 90, textAlignVertical: 'top' },
  courseOptions: { gap: 8 },
  courseOption: { minHeight: 44, justifyContent: 'center', backgroundColor: menuColors.surface, borderColor: menuColors.border, borderWidth: 1, borderRadius: 12, paddingHorizontal: 16, paddingVertical: 10 },
  courseOptionSelected: { backgroundColor: menuColors.primaryLight, borderColor: menuColors.primary },
  courseOptionText: { color: menuColors.muted, fontSize: 15, fontWeight: '600' },
  courseOptionTextSelected: { color: menuColors.primary, fontWeight: '700' },
  saveButton: {
    minHeight: 48, justifyContent: 'center', backgroundColor: menuColors.primary, borderRadius: 14,
    paddingHorizontal: 16, paddingVertical: 14, alignItems: 'center', marginTop: 32,
    shadowColor: menuColors.primary, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 8,
    elevation: 4,
  },
  saveButtonText: { color: menuColors.surface, fontWeight: '700', fontSize: 16 },
  backButton: {
    minHeight: 48, justifyContent: 'center', alignItems: 'center', backgroundColor: menuColors.surface,
    borderWidth: 1, borderColor: menuColors.border, borderRadius: 14, paddingHorizontal: 16,
    paddingVertical: 12, marginTop: 12,
  },
  backButtonText: { color: menuColors.text, fontSize: 14, fontWeight: '700' },
});