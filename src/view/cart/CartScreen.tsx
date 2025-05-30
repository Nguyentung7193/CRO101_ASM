/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {scale, moderateScale} from 'react-native-size-matters';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/AppNavigator';
import CartItem from '../../compoment/product/CartItem';

type CartScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Cart'>;
};

// Mock data for cart items
const cartItems = [
  {
    id: '1',
    name: 'Product 1',
    price: 99,
    quantity: 1,
    image: 'https://via.placeholder.com/150',
  },
  {
    id: '2',
    name: 'Product 2',
    price: 149,
    quantity: 2,
    image: 'https://via.placeholder.com/150',
  },
];

export default function CartScreen({navigation}: CartScreenProps) {
  const [items, setItems] = useState(cartItems);

  const updateQuantity = (id: string, increment: boolean) => {
    setItems(
      items.map(item => {
        if (item.id === id) {
          return {
            ...item,
            quantity: increment
              ? item.quantity + 1
              : Math.max(0, item.quantity - 1),
          };
        }
        return item;
      }),
    );
  };

  const getTotal = () => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Shopping Cart</Text>
      </View>

      <FlatList
        data={items}
        renderItem={({item}) => (
          <CartItem item={item} onUpdateQuantity={updateQuantity} />
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.cartList}
      />

      <View style={styles.footer}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Total:</Text>
          <Text style={styles.totalAmount}>${getTotal()}</Text>
        </View>
        <TouchableOpacity style={styles.checkoutButton}>
          <Text style={styles.checkoutButtonText}>Checkout</Text>
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
  cartList: {
    padding: scale(16),
  },
  footer: {
    padding: scale(16),
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: scale(16),
  },
  totalLabel: {
    color: '#fff',
    fontSize: moderateScale(18),
  },
  totalAmount: {
    color: '#fff',
    fontSize: moderateScale(20),
    fontWeight: 'bold',
  },
  checkoutButton: {
    backgroundColor: '#fff',
    borderRadius: scale(8),
    padding: scale(16),
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: '#000',
    fontSize: moderateScale(16),
    fontWeight: 'bold',
  },
});
