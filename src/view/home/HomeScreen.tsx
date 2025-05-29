import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';

export default function HomeScreen() {
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
              <Text style={styles.username}>John Doe</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.cartButton}>
            <Text style={styles.cartButtonText}>Cart</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.content}>
        <Text style={styles.contentText}>Main Content Area</Text>
      </View>
      <View style={styles.bottomMenu}>
        <TouchableOpacity style={styles.tabItem}>
          <Text style={styles.tabIcon}>🏠</Text>
          <Text style={styles.tabText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Text style={styles.tabIcon}>🔍</Text>
          <Text style={styles.tabText}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: scale(16),
    borderBottomWidth: scale(1),
    borderBottomColor: '#333',
  },
  userInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    flexShrink: 1,
    marginRight: scale(12),
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentText: {
    color: '#fff',
    fontSize: moderateScale(16),
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
  },
  tabIcon: {
    fontSize: moderateScale(24),
    marginBottom: verticalScale(4),
  },
  tabText: {
    color: '#fff',
    fontSize: moderateScale(12),
  },
});
