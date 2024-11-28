import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Stack } from 'expo-router';
import Colors from "@/constants/Colors";
import { getCart, clearCart } from '@/services/api';
import { Image } from 'react-native';


interface CartItemProps {
  id: number;
  name: string;
  size: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

const CartItem: React.FC<CartItemProps> = ({
  id,
  name,
  size,
  price,
  imageUrl,
  quantity,
}) => {
  const [itemQuantity, setItemQuantity] = useState<number>(quantity);

  const handleDecrease = () => {
    if (itemQuantity > 1) {
      setItemQuantity(itemQuantity - 1);
    }
  };

  const handleIncrease = () => {
    setItemQuantity(itemQuantity + 1);
  };

  return (
    <View style={styles.cartItemContainer}>
      <View style={styles.cartItemDetails}>
        <Image source={{ uri: imageUrl }} style={styles.cartItemImage} />
        <View style={styles.cartItemInfo}>
          <Text style={styles.cartItemName}>{name}</Text>
          <Text style={styles.cartItemSize}>Size: {size}</Text>
          <Text style={styles.cartItemPrice}>${price}</Text>
        </View>
      </View>
    </View>
  );
};

const ShoppingBag: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItemProps[]>([]);

  // Load cart items on mount
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const items = await getCart()
        console.log(items)
  
        // Map Item[] to CartItemProps[]
        const mappedItems: CartItemProps[] = items.map((item) => ({
          id: Number(item._id),
          name: item.name,
          size: "Default Size",
          price: item.staticPrice || 0, 
          imageUrl: item.imageUrl[0], 
          quantity: 1,
        }));
  
        setCartItems(mappedItems);
      } catch (err) {
        console.error(err);
      }
    };
  
    fetchCartItems();
  }, []);
  
  

  const handleComparePrices = () => {
    Alert.alert('Compare Prices', 'Compare Prices functionality not implemented yet.');
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerTransparent: true,
          headerTitle: "",
        }}
      />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Shopping Cart</Text>
      </View>

      {/* Cart Items */}
      <ScrollView style={styles.cartItemsContainer}>
        {cartItems.map((item) => (
          <CartItem
            key={item.id}
            id={item.id}
            name={item.name}
            size={item.size}
            price={item.price}
            imageUrl={item.imageUrl}
            quantity={item.quantity}
          />
        ))}
      </ScrollView>

      {/* Compare Prices Button */}
      <View style={styles.compareButtonContainer}>
        <TouchableOpacity
          style={styles.compareButton}
          onPress={handleComparePrices}
          accessibilityLabel="Compare Prices"
        >
          <Text style={styles.compareButtonText} numberOfLines={1} ellipsizeMode="tail">
            Compare Prices
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ShoppingBag;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingTop: 65,
        paddingBottom: 30,
        backgroundColor: "#fff",
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: Colors.tertiary,
        fontFamily: "WorkSans",
        flex: 1,
        textAlign: "center",
    },
    cartItemsContainer: {
        flex: 1,
        paddingHorizontal: 16,
        marginTop: 10,
    },
    cartItemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fcfaf8',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    cartItemDetails: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    cartItemImage: {
        width: 70,
        height: 70,
        borderRadius: 10,
        backgroundColor: '#f3ece7',
    },
    cartItemInfo: {
        marginLeft: 10,
        flex: 1,
    },
    cartItemName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1b130d',
    },
    cartItemSize: {
        fontSize: 14,
        color: '#9a6e4c',
        marginTop: 4,
    },
    cartItemPrice: {
        fontSize: 14,
        color: '#9a6e4c',
        marginTop: 2,
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    quantityButton: {
        backgroundColor: '#f3ece7',
        width: 28,
        height: 28,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
    },
    quantityButtonText: {
        fontSize: 18,
        color: '#1b130d',
        fontWeight: 'bold',
    },
    quantityText: {
        marginHorizontal: 8,
        fontSize: 16,
        color: '#1b130d',
        fontWeight: '500',
    },
    totalsContainer: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        backgroundColor: '#fcfaf8',
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 2,
    },
    totalLabel: {
        fontSize: 16,
        color: '#9a6e4c',
    },
    totalValue: {
        fontSize: 16,
        color: '#1b130d',
        fontWeight: 'bold',
    },
    compareButton: {
        flex: 1,
        minWidth: 84,
        maxWidth: 480,
        backgroundColor: "#1568c1",
        paddingVertical: 12,
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        height: 48,
        overflow: 'hidden',
    },
    compareButtonText: {
        color: Colors.white,
        fontSize: 16,
        fontWeight: 'bold',
        letterSpacing: 0.24, 
    },
    footerNav: {
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: '#f3ece7',
        backgroundColor: '#fcfaf8',
        paddingVertical: 10,
    },
    navItem: {
        flex: 1,
        alignItems: 'center',
    },
    navItemActive: {
        flex: 1,
        alignItems: 'center',
    },
    navText: {
        fontSize: 10,
        color: '#9a6e4c',
        marginTop: 4,
    },
    navTextActive: {
        color: '#1b130d',
        fontWeight: 'bold',
    },
    compareButtonContainer: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        paddingVertical: 12,
    }
})