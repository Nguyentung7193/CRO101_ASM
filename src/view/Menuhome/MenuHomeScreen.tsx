import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {scale, moderateScale} from 'react-native-size-matters';
import HomeScreen from '../home/HomeScreen';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/AppNavigator';
import ListProduct from '../list-product/ListProduct';
import Profile from '../profile/Profile';

type MenuHomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'MenuHome'>;
};

const COLORS = {
  primary: '#1e88e5',
  secondary: '#64b5f6',
  white: '#ffffff',
  lightGray: '#f5f5f5',
  text: '#333333',
  textSecondary: '#757575',
  lightBlue: '#e3f2fd',
};

export default function MenuHomeScreen({navigation}: MenuHomeScreenProps) {
  const [activeTab, setActiveTab] = useState('home');

  const handleCartPress = () => {
    navigation.navigate('Cart');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <View style={styles.content}>
            <HomeScreen navigation={navigation} />
          </View>
        );
      case 'search':
        return (
          <View style={styles.content}>
            <ListProduct />
          </View>
        );
      case 'profile':
        return (
          <View style={styles.content}>
            <Profile navigation={navigation} />
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.userInfoContainer}>
          <View style={styles.userInfo}>
            <Image
              source={{
                uri: 'https://toquoc.mediacdn.vn/280518851207290880/2021/9/3/base64-1630595438805599368242-1630639676186-1630639676357733744119.png',
              }}
              style={styles.avatar}
            />
            <View style={styles.welcomeText}>
              <Text style={styles.greeting}>Welcome back,</Text>
              <Text style={styles.username}>Raiden Shogun</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.cartButton} onPress={handleCartPress}>
            <Text style={styles.cartButtonText}>Cart</Text>
          </TouchableOpacity>
        </View>
      </View>

      {renderContent()}

      <View style={styles.bottomMenu}>
        <TouchableOpacity
          style={[styles.tabItem, activeTab === 'home' && styles.activeTab]}
          onPress={() => setActiveTab('home')}>
          <Text
            style={[
              styles.tabText,
              activeTab === 'home' && styles.activeTabText,
            ]}>
            Home
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabItem, activeTab === 'search' && styles.activeTab]}
          onPress={() => setActiveTab('search')}>
          <Text
            style={[
              styles.tabText,
              activeTab === 'search' && styles.activeTabText,
            ]}>
            Search
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabItem, activeTab === 'profile' && styles.activeTab]}
          onPress={() => setActiveTab('profile')}>
          <Text
            style={[
              styles.tabText,
              activeTab === 'profile' && styles.activeTabText,
            ]}>
            Profile
          </Text>
        </TouchableOpacity>
      </View>
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
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
    backgroundColor: COLORS.white,
  },
  userInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  avatar: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(20),
    marginRight: scale(12),
  },
  welcomeText: {
    flex: 1,
  },
  greeting: {
    color: COLORS.textSecondary,
    fontSize: moderateScale(14),
  },
  username: {
    color: COLORS.text,
    fontSize: moderateScale(16),
    fontWeight: 'bold',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  cartButton: {
    backgroundColor: COLORS.primary,
    borderRadius: scale(20),
    padding: scale(8),
    paddingHorizontal: scale(16),
    elevation: 2,
    shadowColor: COLORS.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  cartButtonText: {
    color: COLORS.white,
    fontSize: moderateScale(16),
    fontWeight: '500',
  },
  content: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  contentText: {
    color: COLORS.text,
    fontSize: moderateScale(16),
    textAlign: 'center',
    marginTop: scale(20),
  },
  bottomMenu: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: scale(12),
    borderTopWidth: 1,
    borderTopColor: COLORS.lightGray,
    backgroundColor: COLORS.white,
  },
  tabItem: {
    alignItems: 'center',
    minWidth: scale(60),
    paddingVertical: scale(8),
    paddingHorizontal: scale(16),
    borderRadius: scale(20),
  },
  activeTab: {
    backgroundColor: COLORS.lightBlue,
  },
  tabText: {
    color: COLORS.textSecondary,
    fontSize: moderateScale(14),
    fontWeight: '500',
  },
  activeTabText: {
    color: COLORS.primary,
    fontWeight: 'bold',
  },
});
