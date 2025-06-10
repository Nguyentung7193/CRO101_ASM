import React from 'react';
import {StyleSheet, Text, TouchableOpacity, Image, View} from 'react-native';
import {scale, moderateScale} from 'react-native-size-matters';

type ProductItemProps = {
  item: {
    name: string;
    price: string;
    description: string;
    image: string;
  };
  onPress?: () => void;
};

const COLORS = {
  primary: '#1e88e5',
  secondary: '#64b5f6',
  white: '#ffffff',
  lightGray: '#f5f5f5',
  text: '#333333',
  textSecondary: '#757575',
};

const ProductItem = ({item, onPress}: ProductItemProps) => {
  return (
    <TouchableOpacity style={styles.productCard} onPress={onPress}>
      <Image source={{uri: item.image}} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>{item.price}</Text>
        <Text style={styles.productDescription}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  productCard: {
    backgroundColor: COLORS.white,
    borderRadius: scale(10),
    padding: scale(10),
    marginHorizontal: scale(16),
    marginBottom: scale(10),
    flexDirection: 'row',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
  },
  productImage: {
    width: scale(100),
    height: scale(100),
    borderRadius: scale(8),
  },
  productInfo: {
    flex: 1,
    marginLeft: scale(10),
  },
  productName: {
    color: COLORS.text,
    fontSize: moderateScale(16),
    fontWeight: '500',
  },
  productPrice: {
    color: COLORS.primary,
    fontSize: moderateScale(14),
    fontWeight: 'bold',
    marginTop: scale(4),
  },
  productDescription: {
    color: COLORS.textSecondary,
    fontSize: moderateScale(12),
    marginTop: scale(4),
  },
});

export default ProductItem;
