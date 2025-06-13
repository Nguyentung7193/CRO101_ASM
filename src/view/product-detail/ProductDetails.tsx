/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import {scale, moderateScale} from 'react-native-size-matters';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/AppNavigator';

type ProductDetailsProps = NativeStackScreenProps<
  RootStackParamList,
  'ProductDetails'
>;

type Product = {
  id: string;
  name: string;
  price: string;
  description: string;
  image: string;
  isNewArrival: boolean;
};

export default function ProductDetails({
  navigation,
  route,
}: ProductDetailsProps) {
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProductDetails();
  }, []);

  const fetchProductDetails = async () => {
    try {
      const productId = route.params?.productId;
      const response = await fetch(
        `http://localhost:3000/products/${productId}`,
      );
      const data = await response.json();
      setProduct(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching product details:', error);
      setLoading(false);
    }
  };

  const handleIncreaseQuantity = () => setQuantity(prev => prev + 1);
  const handleDecreaseQuantity = () => {
    if (quantity > 1) setQuantity(prev => prev - 1);
  };

  const addToCart = async () => {
    try {
      // Giả sử userId được lưu sau khi đăng nhập
      const userId = '3'; // Thay thế bằng userId thực từ authentication
      // Kiểm tra xem user đã có giỏ hàng chưa
      const cartResponse = await fetch(
        `http://localhost:3000/carts?userId=${userId}`,
      );
      const existingCarts = await cartResponse.json();
      const cart = existingCarts[0];

      if (cart) {
        // Cập nhật giỏ hàng hiện có
        const updatedItems = [...cart.items];
        const existingItemIndex = updatedItems.findIndex(
          item => item.productId === product?.id,
        );

        if (existingItemIndex >= 0) {
          updatedItems[existingItemIndex].quantity += quantity;
        } else {
          updatedItems.push({
            productId: product?.id,
            quantity: quantity,
            name: product?.name,
            price: product?.price,
            image: product?.image,
          });
        }

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
      } else {
        // Tạo giỏ hàng mới
        await fetch('http://localhost:3000/carts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId,
            items: [
              {
                productId: product?.id,
                quantity: quantity,
                name: product?.name,
                price: product?.price,
                image: product?.image,
              },
            ],
          }),
        });
      }

      Alert.alert('Added to cart successfully!');
      navigation.goBack();
    } catch (error) {
      console.error('Error adding to cart:', error);
      Alert.alert('Failed to add to cart');
    }
  };

  if (loading || !product) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.imageContainer}>
          <Image source={{uri: product.image}} style={styles.productImage} />
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.productName}>{product.name}</Text>
            <Text style={styles.productPrice}>{product.price}</Text>
          </View>

          <Text style={styles.description}>{product.description}</Text>

          <View style={styles.quantityContainer}>
            <Text style={styles.quantityLabel}>Quantity:</Text>
            <View style={styles.quantityControls}>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={handleDecreaseQuantity}>
                <Text style={styles.quantityButtonText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantityText}>{quantity}</Text>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={handleIncreaseQuantity}>
                <Text style={styles.quantityButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.addToCartButton} onPress={addToCart}>
          <Text style={styles.addToCartText}>
            Add to Cart - {product.price}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  imageContainer: {
    position: 'relative',
    backgroundColor: '#f5f5f5',
  },
  productImage: {
    width: '100%',
    height: scale(300),
    resizeMode: 'cover',
  },
  content: {
    padding: scale(16),
    backgroundColor: '#ffffff',
  },
  header: {
    padding: scale(16),
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
    backgroundColor: '#ffffff',
  },
  backButton: {
    position: 'absolute',
    top: scale(16),
    left: scale(16),
    backgroundColor: '#1e88e5',
    width: scale(40),
    height: scale(40),
    borderRadius: scale(20),
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  backButtonText: {
    color: '#ffffff',
    fontSize: moderateScale(24),
  },
  productName: {
    color: '#333333',
    fontSize: moderateScale(24),
    fontWeight: 'bold',
    marginBottom: scale(8),
  },
  productPrice: {
    color: '#1e88e5',
    fontSize: moderateScale(20),
    fontWeight: '500',
  },
  description: {
    color: '#757575',
    fontSize: moderateScale(14),
    lineHeight: scale(20),
    marginBottom: scale(24),
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scale(24),
    backgroundColor: '#f5f5f5',
    padding: scale(16),
    borderRadius: scale(8),
  },
  quantityLabel: {
    color: '#333333',
    fontSize: moderateScale(16),
    marginRight: scale(16),
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: scale(8),
    padding: scale(4),
    borderWidth: 1,
    borderColor: '#64b5f6',
  },
  quantityButton: {
    width: scale(40),
    height: scale(40),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1e88e5',
    borderRadius: scale(20),
    margin: scale(4),
  },
  quantityButtonText: {
    color: '#ffffff',
    fontSize: moderateScale(20),
  },
  quantityText: {
    color: '#333333',
    fontSize: moderateScale(16),
    marginHorizontal: scale(16),
  },
  footer: {
    padding: scale(16),
    borderTopWidth: 1,
    borderTopColor: '#f5f5f5',
    backgroundColor: '#ffffff',
  },
  addToCartButton: {
    backgroundColor: '#1e88e5',
    borderRadius: scale(8),
    padding: scale(16),
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#1e88e5',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  addToCartText: {
    color: '#ffffff',
    fontSize: moderateScale(16),
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
