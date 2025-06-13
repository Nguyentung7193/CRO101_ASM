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
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    'MenuHome' | 'Profile'
  >;
};

// Define a type for menu items
type MenuItem = {
  id: string;
  title: string;
  route?: keyof RootStackParamList;
};

const COLORS = {
  primary: '#1e88e5',
  secondary: '#64b5f6',
  white: '#ffffff',
  lightGray: '#f5f5f5',
  text: '#333333',
  textSecondary: '#757575',
  danger: '#ff4444',
};

export default function Profile({navigation}: ProfileProps) {
  const menuItems: MenuItem[] = [
    {id: '1', title: 'My Orders', route: 'ListOrder'},
    {id: '2', title: 'Admin Screen', route: 'AdminScreen'},
    {id: '3', title: 'Payment Methods'},
    {id: '4', title: 'Settings'},
    {id: '5', title: 'Help Center'},
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
        <Text style={styles.menuText}>{item.title}</Text>
      </View>
      <Text style={styles.menuArrow}>›</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* <View style={styles.header}>
          <Image
            source={{
              uri: 'https://toquoc.mediacdn.vn/280518851207290880/2021/9/3/base64-1630595438805599368242-1630639676186-1630639676357733744119.png',
            }}
            style={styles.avatar}
          />
          <View style={styles.userInfo}>
            <Text style={styles.userName}>Raiden Shogun</Text>
            <Text style={styles.userEmail}>raiden@inazuma.com</Text>
          </View>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
        </View> */}

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
    backgroundColor: COLORS.white,
  },
  header: {
    padding: scale(16),
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
    backgroundColor: COLORS.white,
  },
  avatar: {
    width: scale(60),
    height: scale(60),
    borderRadius: scale(30),
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  userInfo: {
    flex: 1,
    marginLeft: scale(16),
  },
  userName: {
    color: COLORS.text,
    fontSize: moderateScale(18),
    fontWeight: 'bold',
  },
  userEmail: {
    color: COLORS.textSecondary,
    fontSize: moderateScale(14),
    marginTop: scale(4),
  },
  editButton: {
    paddingVertical: scale(8),
    paddingHorizontal: scale(16),
    backgroundColor: COLORS.primary,
    borderRadius: scale(20),
    elevation: 2,
    shadowColor: COLORS.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  editButtonText: {
    color: COLORS.white,
    fontSize: moderateScale(14),
    fontWeight: '500',
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
    borderBottomColor: COLORS.lightGray,
    backgroundColor: COLORS.white,
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
    color: COLORS.text,
    fontSize: moderateScale(16),
  },
  menuArrow: {
    color: COLORS.textSecondary,
    fontSize: moderateScale(20),
  },
  logoutButton: {
    margin: scale(16),
    padding: scale(16),
    backgroundColor: COLORS.white,
    borderRadius: scale(8),
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.danger,
  },
  logoutButtonText: {
    color: COLORS.danger,
    fontSize: moderateScale(16),
    fontWeight: '500',
  },
});
