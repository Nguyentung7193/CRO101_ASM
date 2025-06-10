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

const COLORS = {
  primary: '#1e88e5',
  secondary: '#64b5f6',
  white: '#ffffff',
  lightGray: '#f5f5f5',
  text: '#333333',
  textSecondary: '#757575',
};

// Update mock data with better product information
const cartItems = [
  {
    id: '1',
    name: 'Nike Air Max 2024',
    price: 199,
    quantity: 1,
    image:
      'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/1d0b3e69-9048-41d3-a88c-f11f5c3d4276/air-max-90-shoes-N7Tbw0.png',
  },
  {
    id: '2',
    name: 'Nike ZoomX Vaporfly',
    price: 179,
    quantity: 2,
    image:
      'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/d3eb254d-0901-4158-956d-4ee96f48a8bb/zoomx-vaporfly-3-road-racing-shoes-mVJdmS.png',
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
    backgroundColor: COLORS.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: scale(16),
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
    backgroundColor: COLORS.white,
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
    elevation: 2,
    shadowColor: COLORS.primary,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
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
  cartList: {
    padding: scale(16),
  },
  footer: {
    padding: scale(16),
    borderTopWidth: 1,
    borderTopColor: COLORS.lightGray,
    backgroundColor: COLORS.white,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: scale(16),
  },
  totalLabel: {
    color: COLORS.text,
    fontSize: moderateScale(18),
  },
  totalAmount: {
    color: COLORS.primary,
    fontSize: moderateScale(20),
    fontWeight: 'bold',
  },
  checkoutButton: {
    backgroundColor: COLORS.primary,
    borderRadius: scale(8),
    padding: scale(16),
    alignItems: 'center',
    elevation: 2,
    shadowColor: COLORS.primary,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  checkoutButtonText: {
    color: COLORS.white,
    fontSize: moderateScale(16),
    fontWeight: 'bold',
  },
});
