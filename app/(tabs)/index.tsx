import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useRouter, Stack } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { getItems } from "@/services/api";
import * as Location from 'expo-location';

interface Item {
  _id: string;
  name: string;
  description: string;
  category: string[];
  imageUrl: string[];
  brand: string;
  storeIds: { [key: string]: string };
  lastUpdated: string;
}

export default function Page() {
  const [modalVisible, setModalVisible] = useState(false);
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState<Item[]>([]);
  const [filteredItems, setFilteredItems] = useState<Item[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [permissionStatus, setPermissionStatus] = useState<Location.PermissionStatus | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedItems: Item[] = await getItems();
      setItems(fetchedItems);
      setFilteredItems(fetchedItems);
    };
    fetchData();
  }, []);

  /*useEffect(() => {
      const getLocation = async () => {
          try {
              let { status } = await Location.requestForegroundPermissionsAsync();
              setPermissionStatus(status);

              if (status !== 'granted') {
                  console.log('Permission to access location was denied');
                  return;
              }

              let currentLocation = await Location.getCurrentPositionAsync({
                  accuracy: Location.Accuracy.Highest,
              });
              setLocation(currentLocation);
          } catch (error) {
              console.warn("Failed to get location:", error);
          }
      };
      getLocation();
  }, []); */

  useEffect(() => {
    const filtered = items.filter(
      (item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.some((category) =>
          category.toLowerCase().includes(searchQuery.toLowerCase())
        )
    );
    setFilteredItems(filtered);
  }, [searchQuery, items]);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    if (category === "All") {
      setFilteredItems(items);
    } else {
      const filtered = items.filter((item) => item.category.includes(category));
      setFilteredItems(filtered);
    }
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
        <Text style={styles.headerTitle}>Home</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <MaterialCommunityIcons
            name="magnify"
            size={24}
            color={Colors.secondary}
          />
          <TextInput
            placeholder="What are you looking for?"
            placeholderTextColor={"#5c5c5c"}
            style={styles.searchInput}
            autoCorrect={false}
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
          />
        </View>
      </View>

      {/* Category Tabs */}
      <View style={styles.categoryTabs}>
        {[
          "All",
          "Dairy",
          "Electronics",
          "Beauty",
          "Clothing",
        ].map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryTab,
              selectedCategory === category && styles.activeCategoryTab,
            ]}
            onPress={() => handleCategorySelect(category)}
          >
            <Text
              style={[
                styles.categoryTabText,
                selectedCategory === category && styles.activeCategoryTabText,
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Items List */}
      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item._id || Math.random().toString()}
        renderItem={({ item }) => (
        <TouchableOpacity onPress={() => router.push(`./product/${item._id}`)}>
            <View style={styles.itemContainer}>
                <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{item.name || "Unknown Item"}</Text>
                {/*<Text style={styles.itemPrice}>${item.price || "N/A"}</Text>*/}
                <Text style={styles.itemPrice}>${"L-H"}</Text>
                <TouchableOpacity style={styles.addToCartButton}>
                    <Text style={styles.addToCartText}>Add to cart</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.imageContainer}>
            <Image
                source={{
                  uri: item.imageUrl && item.imageUrl.length > 0 ? item.imageUrl[0] : 'fallback-image-url',
                }}
                style={styles.itemImage}
              />
            </View>
          </View>
        </TouchableOpacity>
        )}
      />
    </View>
  );
}

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
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.homeBgColor,
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 50,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: Colors.tertiary,
    paddingLeft: 10,
    height: "100%",
  },
  categoryTabs: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderBottomColor: "#dce0e5",
  },
  categoryTab: {
    paddingVertical: 10,
    borderBottomColor: "transparent",
    borderBottomWidth: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  activeCategoryTab: {
    borderBottomColor: Colors.tertiary,
    borderBottomWidth: 3,
  },
  categoryTabText: {
    color: Colors.secondary,
    fontWeight: "bold",
    fontFamily: "WorkSans",
  },
  activeCategoryTabText: {
    color: Colors.tertiary,
  },
  itemContainer: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    backgroundColor: "#f0f0f0",
  },
  itemDetails: {
    flex: 2,
    justifyContent: 'center',
    paddingRight: 20,
  },
  itemName: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.tertiary,
  },
  itemPrice: {
    fontSize: 14,
    color: Colors.secondary,
    marginVertical: 4,
  },
  addToCartButton: {
    backgroundColor: Colors.homeBgColor,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  addToCartText: {
    fontSize: 14,
    color: Colors.tertiary,
    fontWeight: "500",
  },
});
