import React, { useEffect, useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { getItemById } from '@/services/api';
import { View, Text, StyleSheet, Image, ActivityIndicator, TouchableOpacity, FlatList, Dimensions, ScrollView, Alert } from 'react-native';
import Colors from "@/constants/Colors";
import AntDesign from '@expo/vector-icons/AntDesign';
import { useLocationAndStores } from '@/hooks/useLocationAndStores'; // Import the custom hook

interface Item {
    _id: string;
    name: string;
    description: string;
    category: string[];
    imageUrl: string[];
    brand: string;
    storeIds: { [key: string]: string };
    lastUpdated: string;
    staticPrice: string;
}

const { width } = Dimensions.get('window');

export default function ProductDetailsPage() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const router = useRouter();
    const [item, setItem] = useState<Item | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeSlide, setActiveSlide] = useState(0);

    //const { location, stores, permissionStatus, errorMsg } = useLocationAndStores(id as string);

    useEffect(() => {
        let isMounted = true;

        const fetchItem = async () => {
            try {
                const fetchedItem = await getItemById(id as string);
                if (isMounted) setItem(fetchedItem);
            } catch (err) {
                console.error("Failed to fetch item details:", err);
                if (isMounted) Alert.alert('Error', 'Failed to fetch item details.');
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        fetchItem();

        return () => {
            isMounted = false;
        };
    }, [id]);

    /*useEffect(() => {
        if (errorMsg) {
            Alert.alert('Location Error', errorMsg);
        }
    }, [errorMsg]);*/

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000FF" />
            </View>
        );
    }

    if (!item || !item.imageUrl || item.imageUrl.length === 0) {
        return (
            <View style={styles.container}>
                <Text>Item not found</Text>
            </View>
        );
    }

    const renderItem = ({ item: imageUri }: { item: string }) => (
        <Image source={{ uri: imageUri }} style={styles.productImage} />
    );

    return (
        <View style={styles.container}>
            {/* PRODUCT HEADER */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <AntDesign name="arrowleft" size={30} color="black" />
                </TouchableOpacity>
                <Text style={styles.pageTitle}>Product Details</Text>
                {/* Add a placeholder view to balance the header layout */}
                <View style={{ width: 30 }} />
            </View>
    
            {/* Scrollable Content */}
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* IMAGE CAROUSEL */}
                <FlatList
                    data={item.imageUrl}
                    renderItem={renderItem}
                    keyExtractor={(imageUri, index) => `${imageUri}-${index}`}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    style={styles.carousel}
                    onScroll={(event) => {
                        const contentOffsetX = event.nativeEvent.contentOffset.x;
                        const slideIndex = Math.round(contentOffsetX / width);
                        if (slideIndex !== activeSlide) {
                            setActiveSlide(slideIndex);
                        }
                    }}
                    scrollEventThrottle={16}
                />
    
                {/* Pagination Dots */}
                <View style={styles.paginationContainer}>
                    {item.imageUrl.map((_, index) => (
                        <View
                            key={index}
                            style={[
                                styles.dot,
                                { opacity: index === activeSlide ? 1 : 0.3 }
                            ]}
                        />
                    ))}
                </View>
    
                {/* NAME & DESCRIPTION */}
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.productDescription}>{item.description}</Text>
    
                {/* Nearest Stores and Distances */}
                {/*<Text style={styles.sectionTitle}>Nearest Stores</Text>*/}
                {/*stores === null ? (
                    <Text>Searching for nearby stores...</Text>
                ) : stores.length > 0 ? (
                    stores.map((store, index) => (
                        <View key={index} style={styles.storeRow}>
                            <Text style={styles.storeName}>{store.name}</Text>
                            <Text style={styles.storeDistance}>{store.distance} km away</Text>
                        </View>
                    ))
                ) : (
                    <Text>No stores found nearby</Text>
                )*/}
    
                {/* Add to Cart Button */}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.addToCartButton}>
                        <Text style={styles.buttonText}>Add to Cart</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}

export const options = {
    headerShown: false,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: 50,
        paddingBottom: 20,
        paddingHorizontal: 16,
        backgroundColor: "#fff",
        borderBottomWidth: 0,
        borderBottomColor: "#ddd",
        zIndex: 10,
    },
    pageTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: Colors.tertiary,
        textAlign: "center",
        flex: 1,
        fontFamily: "WorkSans",
    },
    productImage: {
        width: width,
        height: 300,
        resizeMode: "contain",
    },
    carousel: {
        marginBottom: 20,
    },
    paginationContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: 10,
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: 'black',
        marginHorizontal: 4,
    },
    productName: {
        fontSize: 24,
        fontWeight: "bold",
        fontFamily: "WorkSans",
        marginBottom: 8,
        paddingHorizontal: 16,
    },
    productDescription: {
        fontSize: 16,
        color: "#777",
        marginBottom: 16,
        paddingHorizontal: 16,
        fontFamily: "WorkSansR",
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
        paddingHorizontal: 16,
    },
    storeRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    storeName: {
        fontSize: 16,
        fontWeight: "500",
    },
    storeDistance: {
        fontSize: 14,
        color: "#777",
    },
    storePrice: {
        fontSize: 16,
        fontWeight: "bold",
        color: Colors.tertiary,
    },
    buttonContainer: {
        marginTop: 20,
        paddingHorizontal: 16,
        marginBottom: 20,
    },
    addToCartButton: {
        backgroundColor: "#1568c1",
        padding: 12,
        borderRadius: 8,
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
    },
    scrollContent: {
        paddingBottom: 20,
    },
});
