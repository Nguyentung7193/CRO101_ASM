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

const COLORS = {
  primary: '#1e88e5',
  secondary: '#64b5f6',
  white: '#ffffff',
  lightGray: '#f5f5f5',
  text: '#333333',
  textSecondary: '#757575',
  lightBlue: '#e3f2fd',
};

const newProducts = [
  {
    id: '1',
    name: 'Nike Air Max 2024',
    price: '$199',
    image:
      'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/1d0b3e69-9048-41d3-a88c-f11f5c3d4276/air-max-90-shoes-N7Tbw0.png',
  },
  {
    id: '2',
    name: 'Nike ZoomX',
    price: '$179',
    image:
      'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/d3eb254d-0901-4158-956d-4ee96f48a8bb/zoomx-vaporfly-3-road-racing-shoes-mVJdmS.png',
  },
  {
    id: '3',
    name: 'Nike React',
    price: '$159',
    image:
      'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/7c2fff38-9f89-4ed3-a9cc-1f42d6bf75ac/react-infinity-3-road-running-shoes-S5Srkx.png',
  },
];

const allProducts = [
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
    name: 'Nike ZoomX',
    price: '$179',
    description: 'Ultimate racing shoe with responsive foam',
    image:
      'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/d3eb254d-0901-4158-956d-4ee96f48a8bb/zoomx-vaporfly-3-road-racing-shoes-mVJdmS.png',
  },
  {
    id: '3',
    name: 'Nike React',
    price: '$159',
    description: 'Soft and responsive foam for ultimate comfort',
    image:
      'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/7c2fff38-9f89-4ed3-a9cc-1f42d6bf75ac/react-infinity-3-road-running-shoes-S5Srkx.png',
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
            <NewProductItem item={item} onPress={() => handleProductPress()} />
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
});
