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
    backgroundColor: '#1a1a1a',
    borderRadius: scale(10),
    padding: scale(10),
    marginHorizontal: scale(16),
    marginBottom: scale(10),
    flexDirection: 'row',
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
    color: '#fff',
    fontSize: moderateScale(16),
    fontWeight: '500',
  },
  productPrice: {
    color: '#fff',
    fontSize: moderateScale(14),
    marginTop: scale(4),
  },
  productDescription: {
    color: '#666',
    fontSize: moderateScale(12),
    marginTop: scale(4),
  },
});

export default ProductItem;