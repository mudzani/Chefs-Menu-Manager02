import { useState } from 'react';
import { Alert, SafeAreaView, StyleSheet } from 'react-native';
import AddMenuItemScreen from '../components/MenuItemScreen';
import MenuListScreen from '../components/MenuListScreen';
import { MenuItem, MenuItemInput } from '../types';

type ScreenName = 'list' | 'add' | 'edit';

export default function Index() {
  const [screen, setScreen] = useState<ScreenName>('list');
  // The parent owns the full menu so list, edit, and delete actions stay in sync.
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [editingItem, setEditingItem] = useState<MenuItem | undefined>(undefined);

  const handleAddPress = () => {
    setEditingItem(undefined);
    setScreen('add');
  };

  const handleEditPress = (item: MenuItem) => {
    setEditingItem(item);
    setScreen('edit');
  };

  const handleDeletePress = (item: MenuItem) => {
    Alert.alert(
      'Delete menu item?',
      `Are you sure you want to delete ${item.dishName}? This action cannot be undone.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            // Confirm first, then use the stable ID to remove only this item.
            setMenuItems((currentItems) =>
              currentItems.filter((currentItem) => currentItem.id !== item.id),
            );
            Alert.alert('Menu item deleted', `${item.dishName} has been removed from your menu.`);
          },
        },
      ],
    );
  };

  const handleSave = (values: MenuItemInput) => {
    if (screen === 'edit' && editingItem) {
      // Editing replaces the matching item but keeps its ID for stable list identity.
      setMenuItems((currentItems) =>
        currentItems.map((item) =>
          item.id === editingItem.id ? { ...values, id: item.id } : item,
        ),
      );
      Alert.alert('Menu item updated', `${values.dishName} has been updated successfully.`);
    } else {
      // A new item needs its own ID before it is added to the menu.
      const newItem: MenuItem = {
        ...values,
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      };
      setMenuItems((prevItems) => [...prevItems, newItem]);
    }

    setEditingItem(undefined);
    setScreen('list');
  };

  return (
    <SafeAreaView style={styles.container}>
      {screen === 'list' ? (
        <MenuListScreen
          items={menuItems}
          onAddPress={handleAddPress}
          onEditPress={handleEditPress}
          onDeletePress={handleDeletePress}
        />
      ) : (
        <AddMenuItemScreen
          initialItem={screen === 'edit' ? editingItem : undefined}
          onSave={handleSave}
          onCancel={() => {
            setEditingItem(undefined);
            setScreen('list');
          }}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
});