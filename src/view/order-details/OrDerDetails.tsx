/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {scale, moderateScale} from 'react-native-size-matters';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/AppNavigator';

type OrderDetailsProps = NativeStackScreenProps<
  RootStackParamList,
  'OrderDetails'
>;

type OrderDetailsData = {
  id: string;
  orderNumber: string;
  date: string;
  status: string;
  total: number;
  items: Array<{
    id: string;
    name: string;
    quantity: number;
    price: number;
  }>;
  shippingAddress: string;
  paymentMethod: string;
};

// Mock detailed data
const orderDetailsData: OrderDetailsData = {
  id: '1',
  orderNumber: '1001',
  date: '2024-03-20',
  status: 'Pending',
  total: 299,
  items: [
    {id: '1', name: 'Nike Air Max 2024', quantity: 1, price: 199},
    {id: '2', name: 'Running Socks', quantity: 2, price: 50},
  ],
  shippingAddress: '123 Main St, City, Country',
  paymentMethod: 'Credit Card (**** 1234)',
};

export default function OrderDetails({navigation, route}: OrderDetailsProps) {
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

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Order #{orderDetailsData.orderNumber}
          </Text>
          <Text style={styles.date}>{orderDetailsData.date}</Text>
          <View style={styles.statusContainer}>
            <Text style={styles.statusLabel}>Status: </Text>
            <Text style={styles.status}>{orderDetailsData.status}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Items</Text>
          {orderDetailsData.items.map(item => (
            <View key={item.id} style={styles.itemContainer}>
              <View>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemQuantity}>
                  Quantity: {item.quantity}
                </Text>
              </View>
              <Text style={styles.itemPrice}>${item.price}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Shipping Address</Text>
          <Text style={styles.infoText}>
            {orderDetailsData.shippingAddress}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Method</Text>
          <Text style={styles.infoText}>{orderDetailsData.paymentMethod}</Text>
        </View>

        <View style={styles.totalSection}>
          <Text style={styles.totalLabel}>Total Amount:</Text>
          <Text style={styles.totalAmount}>${orderDetailsData.total}</Text>
        </View>
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
});
