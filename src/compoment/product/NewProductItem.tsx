import React from 'react';
import {StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import {scale, moderateScale} from 'react-native-size-matters';

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
    backgroundColor: '#1a1a1a',
    borderRadius: scale(10),
    padding: scale(10),
    marginRight: scale(10),
    width: scale(150),
  },
  newProductImage: {
    width: scale(130),
    height: scale(130),
    borderRadius: scale(8),
    marginBottom: scale(8),
  },
  productName: {
    color: '#fff',
    fontSize: moderateScale(16),
    fontWeight: '500',
  },
  productPrice: {
    color: '#fff',
    fontSize: moderateScale(14),
    marginTop: scale(4),
  },
});

export default NewProductItem;