import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Item, CartItem } from './types';

const apiClient = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_BASE_URL,
    headers: {
        'X-API-Key': process.env.EXPO_PUBLIC_API_KEY,
        'Content-Type': 'application/json',
    }
})


export const getItems = async () => {
    try {
        const response = await apiClient.get(`/items`)
        return response.data
    } catch (error) {
        console.warn('Error fetching items:', error)
        throw error
    }
}

export const getItemById = async(id: string | string[]) => {
    try {
        const response = await apiClient.get(`/items/${id}`);
        return response.data
    } catch (error) {
        console.warn('Error fetching items:', error)
        throw error
    }
}

export const getStoresByItemAndLocation = async(id: string | string[], longitude: number, latitude: number): Promise<any> => {
    try {
        const response = await apiClient.get(`/stores/${id}`, {
            params: {
                longitude,
                latitude
            }
        })
        return response.data;
    } catch(err) {
        console.warn("Error fetching stores: ", err)
        throw err;
    }
}


  export const saveCart = async (cartData: CartItem[]): Promise<void> => {
    try {
      await AsyncStorage.setItem("cart", JSON.stringify(cartData));
    } catch (err) {
      console.warn("Error saving cart data: ", err);
      throw err;
    }
  };
  
  export const getCart = async (): Promise<CartItem[]> => {
    try {
      const cartData = await AsyncStorage.getItem("cart");
      return cartData != null ? JSON.parse(cartData) : [];
    } catch (err) {
      console.warn("Error retrieving cart data:", err);
      throw err;
    }
  };
  

export const clearCart = async(): Promise<void> => {
    try {
        await AsyncStorage.removeItem('cart')
    } catch(err) {
        console.warn("Error clearing the cart:" , err)
        throw err
    }
}