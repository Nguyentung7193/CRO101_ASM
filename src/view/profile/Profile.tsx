import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React from 'react';
import {scale, moderateScale} from 'react-native-size-matters';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/AppNavigator';

type ProfileProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'MenuHome' | 'Profile'>;
};

// Define a type for menu items
type MenuItem = {
  id: string;
  title: string;
  icon: string;
  route?: keyof RootStackParamList;
};

export default function Profile({navigation}: ProfileProps) {
  const menuItems: MenuItem[] = [
    {id: '1', title: 'My Orders', icon: '📦', route: 'ListOrder'},
    {id: '2', title: 'Shipping Address', icon: '📍'},
    {id: '3', title: 'Payment Methods', icon: '💳'},
    {id: '4', title: 'Settings', icon: '⚙️'},
    {id: '5', title: 'Help Center', icon: '❓'},
  ];

  const handleMenuPress = (item: MenuItem) => {
    if (item.route) {
      navigation.navigate(item.route);
    }
  };

  const renderMenuItem = (item: MenuItem) => (
    <TouchableOpacity
      key={item.id}
      style={styles.menuItem}
      onPress={() => handleMenuPress(item)}>
      <View style={styles.menuItemContent}>
        <Text style={styles.menuIcon}>{item.icon}</Text>
        <Text style={styles.menuText}>{item.title}</Text>
      </View>
      <Text style={styles.menuArrow}>›</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.menuContainer}>
          {menuItems.map(item => renderMenuItem(item))}
        </View>

        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutButtonText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    padding: scale(16),
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  avatar: {
    width: scale(60),
    height: scale(60),
    borderRadius: scale(30),
  },
  userInfo: {
    flex: 1,
    marginLeft: scale(16),
  },
  userName: {
    color: '#fff',
    fontSize: moderateScale(18),
    fontWeight: 'bold',
  },
  userEmail: {
    color: '#666',
    fontSize: moderateScale(14),
    marginTop: scale(4),
  },
  editButton: {
    paddingVertical: scale(8),
    paddingHorizontal: scale(16),
    backgroundColor: '#1a1a1a',
    borderRadius: scale(20),
  },
  editButtonText: {
    color: '#fff',
    fontSize: moderateScale(14),
  },
  menuContainer: {
    marginTop: scale(20),
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: scale(16),
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    fontSize: moderateScale(20),
    marginRight: scale(16),
  },
  menuText: {
    color: '#fff',
    fontSize: moderateScale(16),
  },
  menuArrow: {
    color: '#666',
    fontSize: moderateScale(20),
  },
  logoutButton: {
    margin: scale(16),
    padding: scale(16),
    backgroundColor: '#1a1a1a',
    borderRadius: scale(8),
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#ff4444',
    fontSize: moderateScale(16),
    fontWeight: '500',
  },
});
