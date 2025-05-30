import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {scale, moderateScale} from 'react-native-size-matters';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/AppNavigator';

// Mock data
const productData = {
  id: '1',
  name: 'Nike Air Max 2024',
  price: '$199',
  description:
    'The Nike Air Max 2024 updates the iconic look with new colors and materials. The revolutionary Air technology combines with a newly engineered mesh upper to deliver enhanced breathability and maximum comfort. Perfect for both athletic performance and casual wear.',
  image:
    'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/1d0b3e69-9048-41d3-a88c-f11f5c3d4276/air-max-90-shoes-N7Tbw0.png',
  features: [
    'Engineered mesh upper',
    'Nike Air cushioning',
    'Rubber outsole',
    'Foam midsole',
    'Traditional lacing',
  ],
  colors: ['Black/White', 'Red/Black', 'Blue/White'],
  sizes: ['US 7', 'US 8', 'US 9', 'US 10', 'US 11'],
};

type ProductDetailsProps = NativeStackScreenProps<
  RootStackParamList,
  'ProductDetails'
>;

export default function ProductDetails({navigation}: ProductDetailsProps) {
  const [quantity, setQuantity] = useState(1);

  const handleIncreaseQuantity = () => setQuantity(prev => prev + 1);
  const handleDecreaseQuantity = () => {
    if (quantity > 1) setQuantity(prev => prev - 1);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.imageContainer}>
          <Image
            source={{uri: productData.image}}
            style={styles.productImage}
          />
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.productName}>{productData.name}</Text>
            <Text style={styles.productPrice}>{productData.price}</Text>
          </View>

          <Text style={styles.description}>{productData.description}</Text>

          <View style={styles.featuresContainer}>
            <Text style={styles.featuresTitle}>Features:</Text>
            {productData.features.map((feature, index) => (
              <Text key={index} style={styles.featureItem}>
                • {feature}
              </Text>
            ))}
          </View>

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
        <TouchableOpacity style={styles.addToCartButton}>
          <Text style={styles.addToCartText}>Add to Cart</Text>
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
  imageContainer: {
    position: 'relative', // Add this to position the back button
  },
  productImage: {
    width: '100%',
    height: scale(300),
    resizeMode: 'cover',
  },
  content: {
    padding: scale(16),
  },
  header: {
    padding: scale(16),
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  backButton: {
    position: 'absolute',
    top: scale(16),
    left: scale(16),
    backgroundColor: 'rgba(0,0,0,0.5)', // Semi-transparent background
    width: scale(40),
    height: scale(40),
    borderRadius: scale(20),
    justifyContent: 'center',
    alignItems: 'center',
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
  productName: {
    color: '#fff',
    fontSize: moderateScale(24),
    fontWeight: 'bold',
    marginBottom: scale(8), // Add margin bottom to create space
  },
  productPrice: {
    color: '#fff',
    fontSize: moderateScale(20),
    fontWeight: '500',
  },
  description: {
    color: '#666',
    fontSize: moderateScale(14),
    lineHeight: scale(20),
    marginBottom: scale(24),
  },
  featuresContainer: {
    marginBottom: scale(24),
  },
  featuresTitle: {
    color: '#fff',
    fontSize: moderateScale(16),
    fontWeight: 'bold',
    marginBottom: scale(8),
  },
  featureItem: {
    color: '#fff',
    fontSize: moderateScale(14),
    marginBottom: scale(4),
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scale(24),
  },
  quantityLabel: {
    color: '#fff',
    fontSize: moderateScale(16),
    marginRight: scale(16),
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    borderRadius: scale(8),
    padding: scale(4),
  },
  quantityButton: {
    width: scale(40),
    height: scale(40),
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    color: '#fff',
    fontSize: moderateScale(20),
  },
  quantityText: {
    color: '#fff',
    fontSize: moderateScale(16),
    marginHorizontal: scale(16),
  },
  footer: {
    padding: scale(16),
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  addToCartButton: {
    backgroundColor: '#fff',
    borderRadius: scale(8),
    padding: scale(16),
    alignItems: 'center',
  },
  addToCartText: {
    color: '#000',
    fontSize: moderateScale(16),
    fontWeight: 'bold',
  },
});
