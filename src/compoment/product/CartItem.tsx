import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {scale, moderateScale} from 'react-native-size-matters';

type CartItemProps = {
  item: {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
  };
  onUpdateQuantity: (id: string, increment: boolean) => void;
};

const CartItem = ({item, onUpdateQuantity}: CartItemProps) => {
  return (
    <View style={styles.cartItem}>
      <Image source={{uri: item.image}} style={styles.itemImage} />
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>${item.price}</Text>
        <View style={styles.quantityControl}>
          <TouchableOpacity
            onPress={() => onUpdateQuantity(item.id, false)}
            style={styles.quantityButton}>
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{item.quantity}</Text>
          <TouchableOpacity
            onPress={() => onUpdateQuantity(item.id, true)}
            style={styles.quantityButton}>
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cartItem: {
    flexDirection: 'row',
    backgroundColor: '#1a1a1a',
    borderRadius: scale(10),
    padding: scale(10),
    marginBottom: scale(10),
  },
  itemImage: {
    width: scale(80),
    height: scale(80),
    borderRadius: scale(8),
  },
  itemInfo: {
    flex: 1,
    marginLeft: scale(10),
  },
  itemName: {
    color: '#fff',
    fontSize: moderateScale(16),
    fontWeight: '500',
  },
  itemPrice: {
    color: '#fff',
    fontSize: moderateScale(14),
    marginTop: scale(4),
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: scale(8),
  },
  quantityButton: {
    backgroundColor: '#333',
    width: scale(30),
    height: scale(30),
    borderRadius: scale(15),
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    color: '#fff',
    fontSize: moderateScale(16),
  },
  quantityText: {
    color: '#fff',
    fontSize: moderateScale(16),
    marginHorizontal: scale(15),
  },
});

export default CartItem;