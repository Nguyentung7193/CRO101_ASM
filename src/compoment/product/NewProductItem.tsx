import React from 'react';
import {StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import {scale, moderateScale} from 'react-native-size-matters';

const COLORS = {
  primary: '#1e88e5',
  secondary: '#64b5f6',
  white: '#ffffff',
  lightGray: '#f5f5f5',
  text: '#333333',
  textSecondary: '#757575',
};

type NewProductItemProps = {
  item: {
    name: string;
    price: string;
    image: string;
  };
  onPress?: () => void;
};

const NewProductItem = ({item, onPress}: NewProductItemProps) => {
  return (
    <TouchableOpacity style={styles.newProductCard} onPress={onPress}>
      <Image source={{uri: item.image}} style={styles.newProductImage} />
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>{item.price}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  newProductCard: {
    backgroundColor: COLORS.white,
    borderRadius: scale(10),
    padding: scale(10),
    marginRight: scale(10),
    width: scale(150),
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
  newProductImage: {
    width: scale(130),
    height: scale(130),
    borderRadius: scale(8),
    marginBottom: scale(8),
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
});

export default NewProductItem;
