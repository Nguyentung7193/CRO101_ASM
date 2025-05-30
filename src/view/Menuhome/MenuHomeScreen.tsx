import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import HomeScreen from '../home/HomeScreen';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/AppNavigator';
import ListProduct from '../list-product/ListProduct';
import Profile from '../profile/Profile';

type MenuHomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'MenuHome'>;
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
            <ListProduct/>
          </View>
        );
      case 'profile':
        return (
          <View style={styles.content}>
            <Profile navigation={navigation}/>
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

          <TouchableOpacity 
            style={styles.cartButton}
            onPress={handleCartPress}>
            <Text style={styles.cartButtonText}>Cart</Text>
          </TouchableOpacity>
        </View>
      </View>

      {renderContent()}

      <View style={styles.bottomMenu}>
        <TouchableOpacity
          style={[styles.tabItem, activeTab === 'home' && styles.activeTab]}
          onPress={() => setActiveTab('home')}>
          <Text style={styles.tabIcon}>🏠</Text>
          <Text style={styles.tabText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabItem, activeTab === 'search' && styles.activeTab]}
          onPress={() => setActiveTab('search')}>
          <Text style={styles.tabIcon}>🔍</Text>
          <Text style={styles.tabText}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabItem, activeTab === 'profile' && styles.activeTab]}
          onPress={() => setActiveTab('profile')}>
          <Text style={styles.tabIcon}>👤</Text>
          <Text style={styles.tabText}>Profile</Text>
        </TouchableOpacity>
      </View>
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
    borderBottomWidth: scale(1),
    borderBottomColor: '#333',
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
    color: '#666',
    fontSize: moderateScale(14),
  },
  username: {
    color: '#fff',
    fontSize: moderateScale(16),
    fontWeight: 'bold',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  cartButton: {
    backgroundColor: '#1a1a1a',
    borderRadius: scale(20),
    padding: scale(8),
    paddingHorizontal: scale(16),
  },
  cartButtonText: {
    color: '#fff',
    fontSize: moderateScale(16),
    fontWeight: '500',
  },
  content: {
    flex: 1,
    backgroundColor: '#000',
  },
  contentText: {
    color: '#fff',
    fontSize: moderateScale(16),
    textAlign: 'center',
    marginTop: scale(20),
  },
  bottomMenu: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: scale(12),
    borderTopWidth: scale(1),
    borderTopColor: '#333',
    backgroundColor: '#1a1a1a',
  },
  tabItem: {
    alignItems: 'center',
    minWidth: scale(60),
  },
  tabIcon: {
    fontSize: moderateScale(24),
    marginBottom: verticalScale(4),
  },
  tabText: {
    color: '#fff',
    fontSize: moderateScale(12),
  },
  activeTab: {
    backgroundColor: '#333',
    borderRadius: scale(10),
    padding: scale(8),
  },
});