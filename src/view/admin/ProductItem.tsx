/* eslint-disable eol-last */
import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';
import {scale, moderateScale} from 'react-native-size-matters';

type Product = {
  id: string;
  name: string;
  price: string;
  description: string;
  image: string;
};

type ProductItemProps = {
  product: Product;
  onEdit: () => void;
  onDelete: () => void;
};

const COLORS = {
  primary: '#1e88e5',
  white: '#ffffff',
  lightGray: '#f5f5f5',
  text: '#333333',
  border: '#e0e0e0',
  error: '#ff4444',
};

export default function ProductItem({product, onEdit, onDelete}: ProductItemProps) {
  return (
    <View style={styles.container}>
      <Image source={{uri: product.image}} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.price}>{product.price}</Text>
        <Text numberOfLines={2} style={styles.description}>
          {product.description}
        </Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity style={styles.editButton} onPress={onEdit}>
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: scale(12),
    backgroundColor: COLORS.white,
    borderRadius: scale(8),
    marginBottom: scale(12),
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  image: {
    width: scale(80),
    height: scale(80),
    borderRadius: scale(8),
  },
  info: {
    flex: 1,
    marginLeft: scale(12),
  },
  name: {
    fontSize: moderateScale(16),
    fontWeight: 'bold',
    color: COLORS.text,
  },
  price: {
    fontSize: moderateScale(14),
    color: COLORS.primary,
    marginVertical: scale(4),
  },
  description: {
    fontSize: moderateScale(12),
    color: COLORS.text,
  },
  actions: {
    justifyContent: 'space-around',
    paddingLeft: scale(8),
  },
  editButton: {
    backgroundColor: COLORS.primary,
    padding: scale(6),
    borderRadius: scale(4),
    marginBottom: scale(8),
  },
  deleteButton: {
    backgroundColor: COLORS.error,
    padding: scale(6),
    borderRadius: scale(4),
  },
  editButtonText: {
    color: COLORS.white,
    fontSize: moderateScale(12),
  },
  deleteButtonText: {
    color: COLORS.white,
    fontSize: moderateScale(12),
  },
});