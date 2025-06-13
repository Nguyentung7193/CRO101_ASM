/* eslint-disable no-catch-shadow */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {scale, moderateScale} from 'react-native-size-matters';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/AppNavigator';
import CartItem from '../../compoment/product/CartItem';
import CheckoutModal, {
  CheckoutFormData,
} from '../../components/modal/CheckoutModal';

type CartScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Cart'>;
};

type CartItem = {
  productId: string;
  quantity: number;
  name: string;
  price: string;
  image: string;
};

type Cart = {
  id: string;
  userId: string;
  items: CartItem[];
};

const COLORS = {
  primary: '#1e88e5',
  secondary: '#64b5f6',
  white: '#ffffff',
  lightGray: '#f5f5f5',
  text: '#333333',
  textSecondary: '#757575',
};

export default function CartScreen({navigation}: CartScreenProps) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isCheckoutModalVisible, setIsCheckoutModalVisible] = useState(false);

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const userId = '3'; // Replace with actual logged in user ID
      const response = await fetch(
        `http://localhost:3000/carts?userId=${userId}`,
      );
      const carts: Cart[] = await response.json();
      const userCart = carts[0];

      if (userCart && userCart.items) {
        setItems(userCart.items);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching cart:', error);
      setError('Failed to load cart items');
      setLoading(false);
    }
  };

  const updateQuantity = async (productId: string, increment: boolean) => {
    try {
      const userId = '3'; // Replace with actual logged in user ID
      const response = await fetch(
        `http://localhost:3000/carts?userId=${userId}`,
      );
      const carts: Cart[] = await response.json();
      const cart = carts[0];

      if (cart) {
        const updatedItems = cart.items.map(item => {
          if (item.productId === productId) {
            return {
              ...item,
              quantity: increment
                ? item.quantity + 1
                : Math.max(1, item.quantity - 1),
            };
          }
          return item;
        });

        await fetch(`http://localhost:3000/carts/${cart.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...cart,
            items: updatedItems,
          }),
        });

        setItems(updatedItems);
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const handleCheckout = async (formData: CheckoutFormData) => {
    try {
      const userId = '3'; // Replace with actual logged in user ID
      const total = getTotal();

      // Create new order
      const orderResponse = await fetch('http://localhost:3000/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          items: items,
          totalAmount: total,
          shippingAddress: formData.shippingAddress,
          phoneNumber: formData.phoneNumber,
          orderDate: new Date().toISOString(),
          status: 'pending',
        }),
      });

      if (orderResponse.ok) {
        // Clear cart after successful order
        const cartResponse = await fetch(
          `http://localhost:3000/carts?userId=${userId}`,
        );
        const carts = await cartResponse.json();
        const cart = carts[0];

        if (cart) {
          await fetch(`http://localhost:3000/carts/${cart.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              ...cart,
              items: [],
            }),
          });

          setItems([]);
          setIsCheckoutModalVisible(false);
          Alert.alert('Order placed successfully!');
        }
      }
    } catch (error) {
      console.error('Error creating order:', error);
      Alert.alert('Failed to place order');
    }
  };

  const getTotal = () => {
    return items.reduce((sum, item) => {
      const price = parseFloat(item.price.replace('$', ''));
      return sum + price * item.quantity;
    }, 0);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading cart...</Text>
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
        <Text style={styles.headerTitle}>Shopping Cart</Text>
      </View>

      {items.length === 0 ? (
        <View style={styles.emptyCart}>
          <Text style={styles.emptyCartText}>Your cart is empty</Text>
        </View>
      ) : (
        <>
          <FlatList
            data={items}
            renderItem={({item}) => (
              <CartItem
                item={item}
                onUpdateQuantity={increment =>
                  updateQuantity(item.productId, increment)
                }
              />
            )}
            keyExtractor={item => item.productId}
            contentContainerStyle={styles.cartList}
          />

          <View style={styles.footer}>
            <View style={styles.totalContainer}>
              <Text style={styles.totalLabel}>Total:</Text>
              <Text style={styles.totalAmount}>${getTotal().toFixed(2)}</Text>
            </View>
            <TouchableOpacity
              style={styles.checkoutButton}
              onPress={() => setIsCheckoutModalVisible(true)}>
              <Text style={styles.checkoutButtonText}>Checkout</Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      <CheckoutModal
        visible={isCheckoutModalVisible}
        onClose={() => setIsCheckoutModalVisible(false)}
        onSubmit={handleCheckout}
        totalAmount={getTotal()}
      />
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
  },
  emptyCart: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyCartText: {
    fontSize: moderateScale(16),
    color: COLORS.textSecondary,
  },
});
