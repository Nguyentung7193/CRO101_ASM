import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {scale, moderateScale} from 'react-native-size-matters';

type OrderItemProps = {
  item: {
    id: string;
    orderNumber: string;
    date: string;
    status: string;
    total: number;
  };
  onPress?: () => void;
};

const OrderItem = ({item, onPress}: OrderItemProps) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.header}>
        <Text style={styles.orderNumber}>Order #{item.orderNumber}</Text>
        <Text style={styles.date}>{item.date}</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.row}>
          <Text style={styles.label}>Status:</Text>
          <Text style={styles.status}>{item.status}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Total:</Text>
          <Text style={styles.total}>${item.total}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1a1a1a',
    borderRadius: scale(10),
    padding: scale(16),
    marginBottom: scale(10),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: scale(10),
  },
  orderNumber: {
    color: '#fff',
    fontSize: moderateScale(16),
    fontWeight: 'bold',
  },
  date: {
    color: '#666',
    fontSize: moderateScale(14),
  },
  content: {
    gap: scale(8),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
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
  total: {
    color: '#fff',
    fontSize: moderateScale(16),
    fontWeight: '500',
  },
});

export default OrderItem;
