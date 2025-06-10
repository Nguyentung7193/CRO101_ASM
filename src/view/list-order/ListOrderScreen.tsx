import {
  StyleSheet,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Text,
} from 'react-native';
import React from 'react';
import {scale, moderateScale} from 'react-native-size-matters';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/AppNavigator';
import OrderItem from '../../compoment/Order/OrderItem';

type ListOrderScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'ListOrder'>;
};

// Mock data
const orders = [
  {
    id: '1',
    orderNumber: '1001',
    date: '2024-03-20',
    status: 'Pending',
    total: 299,
  },
  {
    id: '2',
    orderNumber: '1002',
    date: '2024-03-19',
    status: 'Completed',
    total: 149,
  },
  {
    id: '3',
    orderNumber: '1003',
    date: '2024-03-18',
    status: 'Processing',
    total: 499,
  },
];

export default function ListOrderScreen({navigation}: ListOrderScreenProps) {
  const handleOrderPress = (order: any) => {
    navigation.navigate('OrderDetails', {orderId: order.id});
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Orders</Text>
      </View>

      <FlatList
        data={orders}
        renderItem={({item}) => (
          <OrderItem item={item} onPress={() => handleOrderPress(item)} />
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.orderList}
      />
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
    alignItems: 'center',
    padding: scale(16),
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  backButton: {
    padding: scale(8),
    marginRight: scale(16),
  },
  backButtonText: {
    color: '#fff',
    fontSize: moderateScale(24),
  },
  headerTitle: {
    color: '#fff',
    fontSize: moderateScale(20),
    fontWeight: 'bold',
  },
  orderList: {
    padding: scale(16),
  },
});
