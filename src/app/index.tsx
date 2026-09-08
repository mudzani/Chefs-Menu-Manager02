import { useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import AddMenuItemScreen from '../components/MenuItemScreen';
import MenuListScreen from '../components/MenuListScreen';
import { MenuItem } from '../types';

type ScreenName = 'list' | 'add';

export default function Index() {
  const [screen, setScreen] = useState<ScreenName>('list');
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  const handleSave = (newItem: MenuItem) => {
    setMenuItems((prevItems) => [...prevItems, newItem]);
    setScreen('list');
  };

  return (
    <SafeAreaView style={styles.container}>
      {screen === 'list' ? (
        <MenuListScreen items={menuItems} onAddPress={() => setScreen('add')} />
      ) : (
        <AddMenuItemScreen onSave={handleSave} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
});