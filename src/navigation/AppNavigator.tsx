// src/navigation/AppNavigator.tsx
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SigninScreen from '../view/auth/sign-in/SigninScreen';
import MenuHomeScreen from '../view/Menuhome/MenuHomeScreen';
import HomeScreen from '../view/home/HomeScreen';
import SignUpScreen from '../view/auth/sign-up/SignUpScreen';
import ListProduct from '../view/list-product/ListProduct';
import Profile from '../view/profile/Profile';
import ProductDetails from '../view/product-detail/ProductDetails';
import CartScreen from '../view/cart/CartScreen';
import ListOrderScreen from '../view/list-order/ListOrderScreen';
import OrderDetails from '../view/order-details/OrDerDetails';
import AdminScreen from '../view/admin/AdminScreen';
import UserManagementScreen from '../view/admin/UserManagementScreen';

export type RootStackParamList = {
  Login: undefined;
  MenuHome: undefined;
  Home: undefined;
  SignUp: undefined;
  ListProduct: undefined;
  Profile: undefined;
  Cart: undefined;
  ListOrder: undefined;
  OrderDetails: {
    orderId: string;
  };
  ProductDetails: {
    productId: string;
  };
  AdminScreen: undefined;
  UserManagement: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Login" component={SigninScreen} />
      <Stack.Screen name="MenuHome" component={MenuHomeScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="ListProduct" component={ListProduct} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="ProductDetails" component={ProductDetails} />
      <Stack.Screen name="Cart" component={CartScreen} />
      <Stack.Screen name="ListOrder" component={ListOrderScreen} />
      <Stack.Screen
        name="OrderDetails"
        component={OrderDetails}
        initialParams={{orderId: undefined}}
      />
      <Stack.Screen name="AdminScreen" component={AdminScreen} />
      <Stack.Screen name="UserManagement" component={UserManagementScreen} />
    </Stack.Navigator>
  );
}
