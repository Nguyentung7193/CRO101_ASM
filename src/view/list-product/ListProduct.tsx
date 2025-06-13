import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {scale, moderateScale} from 'react-native-size-matters';
import ProductItem from '../../compoment/product/ProductItem';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/AppNavigator';
import {useNavigation} from '@react-navigation/native';

const COLORS = {
  primary: '#1e88e5',
  secondary: '#64b5f6',
  white: '#ffffff',
  lightGray: '#f5f5f5',
  text: '#333333',
  textSecondary: '#757575',
};


type Product = {
  id: string;
  name: string;
  price: string;
  description: string;
  image: string;
};

type ListProductScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'ListProduct'
>;

export default function ListProduct() {
  const navigation = useNavigation<ListProductScreenNavigationProp>();
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

  const handleProductPress = (productId: string) => {
    try {
      navigation.navigate('ProductDetails', {productId});
    } catch (error) {
      console.error('Navigation error:', error);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search products..."
          placeholderTextColor={COLORS.textSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity style={styles.searchButton}>
          <Text style={styles.searchButtonText}>🔍</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={products}
        renderItem={({item}) => (
          <ProductItem
            item={item}
            onPress={() => handleProductPress(item.id)}
          />
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.productList}
      />
    </SafeAreaView>
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
  productList: {
    padding: scale(16),
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
