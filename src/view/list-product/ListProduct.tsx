import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from 'react-native';
import React, {useState} from 'react';
import {scale, moderateScale} from 'react-native-size-matters';
import ProductItem from '../../compoment/product/ProductItem';

// Mock data for testing
const products = [
  {
    id: '1',
    name: 'Product 1',
    price: '$99',
    description: 'Product description',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: '2',
    name: 'Product 2',
    price: '$149',
    description: 'Product description',
    image: 'https://via.placeholder.com/150',
  },
];

export default function ListProduct() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <SafeAreaView style={styles.container}>
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

      <FlatList
        data={products}
        renderItem={({item}) => (
          <ProductItem
            item={item}
            onPress={() => console.log('Product pressed:', item)}
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
    backgroundColor: '#000',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    borderRadius: scale(25),
    margin: scale(16),
    padding: scale(4),
  },
  searchInput: {
    flex: 1,
    color: '#fff',
    fontSize: moderateScale(16),
    paddingHorizontal: scale(16),
    paddingVertical: scale(8),
  },
  searchButton: {
    padding: scale(8),
    marginRight: scale(4),
  },
  searchButtonText: {
    fontSize: moderateScale(20),
  },
  productList: {
    padding: scale(16),
  },
});
