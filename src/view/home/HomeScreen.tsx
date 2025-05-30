import React, {useState} from 'react';
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

const newProducts = [
  {
    id: '1',
    name: 'Product 1',
    price: '$99',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: '2',
    name: 'Product 2',
    price: '$149',
    image: 'https://via.placeholder.com/150',
  },
];

const allProducts = [
  {
    id: '1',
    name: 'Product 1',
    price: '$99',
    description: 'Product description',
    image: 'https://via.placeholder.com/150',
  },
];

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    'MenuHome' | 'Home'
  >;
};

export default function HomeScreen({navigation}: HomeScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleProductPress = () => {
    navigation.navigate('ProductDetails');
  };

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
              onPress={() => handleProductPress()}
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
            <ProductItem item={item} onPress={() => handleProductPress()} />
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
  section: {
    marginVertical: scale(10),
  },
  sectionTitle: {
    color: '#fff',
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    marginHorizontal: scale(16),
    marginBottom: scale(10),
  },
  newProductsList: {
    paddingHorizontal: scale(16),
  },
});