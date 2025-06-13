import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Text,
  FlatList,
} from 'react-native';
import {scale, moderateScale} from 'react-native-size-matters';
import NewProductItem from '../../compoment/product/NewProductItem';
import ProductItem from '../../compoment/product/ProductItem';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/AppNavigator';

const COLORS = {
  primary: '#1e88e5',
  secondary: '#64b5f6',
  white: '#ffffff',
  lightGray: '#f5f5f5',
  text: '#333333',
  textSecondary: '#757575',
  lightBlue: '#e3f2fd',
};

type Product = {
  id: string;
  name: string;
  price: string;
  description?: string;
  image: string;
  isNewArrival: boolean;
};

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    'MenuHome' | 'Home'
  >;
};

export default function HomeScreen({navigation}: HomeScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:3000/products');
      const data = await response.json();
      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };

  const newProducts = products.filter(product => product.isNewArrival);
  const allProducts = products;

  const handleProductPress = (productId: string) => {
    navigation.navigate('ProductDetails', {productId});
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search products..."
          placeholderTextColor="#666"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity style={styles.searchButton}>
          <Text style={styles.searchButtonText}>🔍</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>New Arrivals</Text>
        <FlatList
          horizontal
          data={newProducts}
          renderItem={({item}) => (
            <NewProductItem
              item={item}
              onPress={() => handleProductPress(item.id)}
            />
          )}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
          style={styles.newProductsList}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>All Products</Text>
        <FlatList
          data={allProducts}
          renderItem={({item}) => (
            <ProductItem
              item={item}
              onPress={() => handleProductPress(item.id)}
            />
          )}
          keyExtractor={item => item.id}
          scrollEnabled={false}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.lightGray,
    borderRadius: scale(25),
    margin: scale(16),
    padding: scale(4),
    borderWidth: 1,
    borderColor: COLORS.secondary,
  },
  searchInput: {
    flex: 1,
    color: COLORS.text,
    fontSize: moderateScale(16),
    paddingHorizontal: scale(16),
    paddingVertical: scale(8),
  },
  searchButton: {
    padding: scale(8),
    marginRight: scale(4),
    backgroundColor: COLORS.primary,
    borderRadius: scale(20),
  },
  searchButtonText: {
    fontSize: moderateScale(20),
    color: COLORS.white,
  },
  section: {
    marginVertical: scale(10),
  },
  sectionTitle: {
    color: COLORS.text,
    fontSize: moderateScale(20),
    fontWeight: 'bold',
    marginHorizontal: scale(16),
    marginBottom: scale(10),
  },
  newProductsList: {
    paddingHorizontal: scale(16),
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
