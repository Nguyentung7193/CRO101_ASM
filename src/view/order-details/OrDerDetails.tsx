/* eslint-disable no-catch-shadow */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {scale, moderateScale} from 'react-native-size-matters';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/AppNavigator';
import UpdateOrderModal from '../../components/modal/UpdateOrderModal';

type OrderDetailsProps = NativeStackScreenProps<
  RootStackParamList,
  'OrderDetails'
>;

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

const COLORS = {
  primary: '#1e88e5',
  white: '#ffffff',
  background: '#000000',
  card: '#1a1a1a',
  border: '#333333',
  text: '#ffffff',
  textSecondary: '#666666',
};

export default function OrderDetails({navigation, route}: OrderDetailsProps) {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const {orderId} = route.params;

  useEffect(() => {
    fetchOrderDetails();
  }, [orderId]);

  const fetchOrderDetails = async () => {
    try {
      const response = await fetch(`http://localhost:3000/orders/${orderId}`);
      const data = await response.json();
      setOrder(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching order details:', error);
      setError('Failed to load order details');
      setLoading(false);
    }
  };

  const handleCancelOrder = async () => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this order?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              const response = await fetch(
                `http://localhost:3000/orders/${orderId}`,
                {
                  method: 'DELETE',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                },
              );

              if (response.ok) {
                Alert.alert('Success', 'Order deleted successfully', [
                  {
                    text: 'OK',
                    onPress: () => navigation.goBack(),
                  },
                ]);
              }
            } catch (error) {
              console.error('Error deleting order:', error);
              Alert.alert('Error', 'Failed to delete order');
            }
          },
        },
      ],
    );
  };

  const handleUpdateOrder = async (data: {
    shippingAddress: string;
    phoneNumber: string;
  }) => {
    try {
      const response = await fetch(`http://localhost:3000/orders/${orderId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          shippingAddress: data.shippingAddress,
          phoneNumber: data.phoneNumber,
        }),
      });

      if (response.ok) {
        const updatedOrder = await response.json();
        setOrder(updatedOrder);
        setIsUpdateModalVisible(false);
        Alert.alert('Success', 'Order updated successfully');
      }
    } catch (error) {
      console.error('Error updating order:', error);
      Alert.alert('Error', 'Failed to update order');
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  if (error || !order) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error || 'Order not found'}</Text>
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
        <Text style={styles.headerTitle}>Order Details</Text>
      </View>

      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={[styles.actionButton, styles.cancelButton]}
          onPress={handleCancelOrder}>
          <Text style={styles.actionButtonText}>Delete Order</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.updateButton]}
          onPress={() => setIsUpdateModalVisible(true)}>
          <Text style={styles.actionButtonText}>Update Order</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order #{order.id}</Text>
          <Text style={styles.date}>
            {new Date(order.orderDate).toLocaleDateString()}
          </Text>
          <View style={styles.statusContainer}>
            <Text style={styles.statusLabel}>Status: </Text>
            <Text
              style={[
                styles.status,
                styles[order.status as keyof typeof styles] || styles.pending,
              ]}>
              {order.status}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Items</Text>
          {order.items.map(item => (
            <View key={item.productId} style={styles.itemContainer}>
              <View>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemQuantity}>
                  Quantity: {item.quantity}
                </Text>
              </View>
              <Text style={styles.itemPrice}>{item.price}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Shipping Address</Text>
          <Text style={styles.infoText}>{order.shippingAddress}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Number</Text>
          <Text style={styles.infoText}>{order.phoneNumber}</Text>
        </View>

        <View style={styles.totalSection}>
          <Text style={styles.totalLabel}>Total Amount:</Text>
          <Text style={styles.totalAmount}>${order.totalAmount}</Text>
        </View>
      </ScrollView>

      <UpdateOrderModal
        visible={isUpdateModalVisible}
        onClose={() => setIsUpdateModalVisible(false)}
        onSubmit={handleUpdateOrder}
        initialData={{
          shippingAddress: order?.shippingAddress || '',
          phoneNumber: order?.phoneNumber || '',
        }}
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
  content: {
    flex: 1,
    padding: scale(16),
  },
  section: {
    marginBottom: scale(24),
    padding: scale(16),
    backgroundColor: '#1a1a1a',
    borderRadius: scale(10),
  },
  sectionTitle: {
    color: '#fff',
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    marginBottom: scale(8),
  },
  date: {
    color: '#666',
    fontSize: moderateScale(14),
    marginBottom: scale(8),
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusLabel: {
    color: '#666',
    fontSize: moderateScale(14),
  },
  status: {
    fontSize: moderateScale(14),
    fontWeight: '500',
    paddingHorizontal: scale(8),
    paddingVertical: scale(4),
    borderRadius: scale(4),
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    padding: scale(16),
  },
  errorText: {
    color: '#ff4444',
    fontSize: moderateScale(16),
    textAlign: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: scale(8),
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  itemName: {
    color: '#fff',
    fontSize: moderateScale(16),
    marginBottom: scale(4),
  },
  itemQuantity: {
    color: '#666',
    fontSize: moderateScale(14),
  },
  itemPrice: {
    color: '#fff',
    fontSize: moderateScale(16),
    fontWeight: '500',
  },
  infoText: {
    color: '#fff',
    fontSize: moderateScale(14),
    lineHeight: scale(20),
  },
  totalSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: scale(16),
    backgroundColor: '#1a1a1a',
    borderRadius: scale(10),
    marginBottom: scale(24),
  },
  totalLabel: {
    color: '#fff',
    fontSize: moderateScale(18),
    fontWeight: 'bold',
  },
  totalAmount: {
    color: '#fff',
    fontSize: moderateScale(20),
    fontWeight: 'bold',
  },
  pending: {
    backgroundColor: '#ffd700',
    color: '#000',
  },
  processing: {
    backgroundColor: '#1e90ff',
    color: '#fff',
  },
  completed: {
    backgroundColor: '#32cd32',
    color: '#fff',
  },
  cancelled: {
    backgroundColor: '#ff4444',
    color: '#fff',
  },
  actionButtons: {
    flexDirection: 'row',
    padding: scale(16),
    gap: scale(10),
  },
  actionButton: {
    flex: 1,
    padding: scale(12),
    borderRadius: scale(8),
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#ff4444',
  },
  updateButton: {
    backgroundColor: COLORS.primary,
  },
  actionButtonText: {
    color: COLORS.white,
    fontSize: moderateScale(16),
    fontWeight: 'bold',
  },
});
