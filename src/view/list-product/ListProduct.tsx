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

const COLORS = {
  primary: '#1e88e5',
  secondary: '#64b5f6',
  white: '#ffffff',
  lightGray: '#f5f5f5',
  text: '#333333',
  textSecondary: '#757575',
};

// Enhanced mock data
const products = [
  {
    id: '1',
    name: 'Nike Air Max 2024',
    price: '$199',
    description:
      'Revolutionary Air technology with newly engineered mesh upper',
    image:
      'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/1d0b3e69-9048-41d3-a88c-f11f5c3d4276/air-max-90-shoes-N7Tbw0.png',
  },
  {
    id: '2',
    name: 'Nike ZoomX Vaporfly',
    price: '$179',
    description: 'Ultimate racing shoe with responsive foam technology',
    image:
      'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/d3eb254d-0901-4158-956d-4ee96f48a8bb/zoomx-vaporfly-3-road-racing-shoes-mVJdmS.png',
  },
  {
    id: '3',
    name: 'Nike React Infinity',
    price: '$159',
    description: 'Soft and responsive foam for ultimate comfort',
    image:
      'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/7c2fff38-9f89-4ed3-a9cc-1f42d6bf75ac/react-infinity-3-road-running-shoes-S5Srkx.png',
  },
  {
    id: '4',
    name: 'Nike Pegasus 39',
    price: '$129',
    description: 'Versatile daily trainer with proven cushioning',
    image:
      'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/5f9f5f8f-5d56-4b5d-a6b9-3fcf9b9f7d43/pegasus-39-road-running-shoes-kmZSD6.png',
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
});
