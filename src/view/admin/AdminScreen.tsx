import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Text,
  Alert,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import axios from 'axios';
import {scale, moderateScale} from 'react-native-size-matters';
import ProductItem from './ProductItem';
import ProductForm from './ProductForm';

// Define base URL for API
const BASE_URL = 'http://localhost:3000';

type Product = {
  id: string;
  name: string;
  price: string;
  description: string;
  image: string;
  isNewArrival: boolean;
};

const COLORS = {
  primary: '#1e88e5',
  white: '#ffffff',
  lightGray: '#f5f5f5',
  text: '#333333',
  error: '#ff4444',
};

export default function AdminScreen() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/products`);
      setProducts(response.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch products');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (data: Omit<Product, 'id'>) => {
    try {
      const response = await axios.post(`${BASE_URL}/products`, data);
      setProducts([...products, response.data]);
      setShowForm(false);
      Alert.alert('Success', 'Product created successfully');
    } catch (err) {
      Alert.alert('Error', 'Failed to create product');
      console.error(err);
    }
  };

  const handleUpdate = async (id: string, data: Partial<Product>) => {
    try {
      const response = await axios.put(`${BASE_URL}/products/${id}`, data);
      setProducts(products.map(p => (p.id === id ? response.data : p)));
      setEditingProduct(null);
      setShowForm(false);
      Alert.alert('Success', 'Product updated successfully');
    } catch (err) {
      Alert.alert('Error', 'Failed to update product');
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this product?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await axios.delete(`${BASE_URL}/products/${id}`);
              setProducts(products.filter(p => p.id !== id));
              Alert.alert('Success', 'Product deleted successfully');
            } catch (err) {
              Alert.alert('Error', 'Failed to delete product');
              console.error(err);
            }
          },
        },
      ],
    );
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Product Management</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            setEditingProduct(null);
            setShowForm(true);
          }}>
          <Text style={styles.addButtonText}>Add Product</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={products}
        renderItem={({item}) => (
          <ProductItem
            product={item}
            onEdit={() => {
              setEditingProduct(item);
              setShowForm(true);
            }}
            onDelete={() => handleDelete(item.id)}
          />
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />

      {showForm && (
        <ProductForm
          visible={showForm}
          onClose={() => {
            setShowForm(false);
            setEditingProduct(null);
          }}
          onSubmit={data =>
            editingProduct
              ? handleUpdate(editingProduct.id, data)
              : handleCreate(data as Omit<Product, 'id'>)
          }
          initialData={editingProduct}
        />
      )}
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
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: scale(16),
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  title: {
    fontSize: moderateScale(20),
    fontWeight: 'bold',
    color: COLORS.text,
  },
  addButton: {
    backgroundColor: COLORS.primary,
    padding: scale(8),
    borderRadius: scale(8),
  },
  addButtonText: {
    color: COLORS.white,
    fontWeight: '500',
  },
  list: {
    padding: scale(16),
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: COLORS.error,
    fontSize: moderateScale(16),
  },
});
