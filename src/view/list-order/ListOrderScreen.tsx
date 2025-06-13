/* eslint-disable no-catch-shadow */
import {
  StyleSheet,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {scale, moderateScale} from 'react-native-size-matters';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/AppNavigator';
import OrderItem from '../../compoment/Order/OrderItem';

const COLORS = {
  primary: '#1e88e5',
  secondary: '#64b5f6',
  white: '#ffffff',
  lightGray: '#f5f5f5',
  text: '#333333',
  textSecondary: '#757575',
};

type ListOrderScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'ListOrder'>;
};

type Order = {
  id: string;
  userId: string;
  items: Array<{
    productId: string;
    quantity: number;
    name: string;
    price: string;
    image: string;
  }>;
  totalAmount: number;
  shippingAddress: string;
  phoneNumber: string;
  orderDate: string;
  status: string;
};

export default function ListOrderScreen({navigation}: ListOrderScreenProps) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const userId = '3';
      const response = await fetch(
        `http://localhost:3000/orders?userId=${userId}`,
      );
      const data = await response.json();
      setOrders(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setError('Failed to load orders');
      setLoading(false);
    }
  };

  const handleOrderPress = (order: Order) => {
    navigation.navigate('OrderDetails', {orderId: order.id});
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

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

      {orders.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No orders found</Text>
        </View>
      ) : (
        <FlatList
          data={orders}
          renderItem={({item}) => (
            <OrderItem
              item={{
                id: item.id,
                orderNumber: item.id, // or use another unique identifier if available
                date: item.orderDate,
                status: item.status,
                total: item.totalAmount,
              }}
              onPress={() => handleOrderPress(item)}
            />
          )}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.orderList}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: scale(16),
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  backButton: {
    padding: scale(8),
    marginRight: scale(16),
    backgroundColor: COLORS.primary,
    width: scale(40),
    height: scale(40),
    borderRadius: scale(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    color: COLORS.white,
    fontSize: moderateScale(24),
  },
  headerTitle: {
    color: COLORS.text,
    fontSize: moderateScale(20),
    fontWeight: 'bold',
  },
  orderList: {
    padding: scale(16),
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: scale(16),
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    fontSize: moderateScale(16),
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: moderateScale(16),
    color: COLORS.textSecondary,
  },
});
