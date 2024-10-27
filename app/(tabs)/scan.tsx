import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import React from 'react';
import { Octicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import Colors from "@/constants/Colors";

export default function Page() {
  return (
    <View style={styles.container}>
        <Stack.Screen
            options={{
            headerTransparent: true,
            headerTitle: "",
            }}
        />
        {
            <View style={styles.header}>
            <Text style={styles.headerText}>Scan</Text>
            <TouchableOpacity style={styles.flashlightButton}>
                <MaterialCommunityIcons
                name="flashlight"
                size={24}
                color={Colors.tertiary}
                />
            </TouchableOpacity>
            </View>
        }
        <ScrollView>
            <Text style={styles.sectionTitle}>How it works</Text>
            <View style={styles.infoContainer}>
            <View style={styles.infoText}>
                <Text style={styles.stepTitle}>1. Scan a barcode</Text>
                <Text style={styles.stepDescription}>
                Add items to your cart or check prices instantly
                </Text>
            </View>
            </View>
            <View style={styles.infoContainer}>
            <View style={styles.infoText}>
                <Text style={styles.stepTitle}>2. Compare prices</Text>
                <Text style={styles.stepDescription}>
                Find the best deals from your favorite stores
                </Text>
            </View>
            </View>
            <View style={styles.infoContainer}>
            <View style={styles.infoText}>
                <Text style={styles.stepTitle}>3. Check out</Text>
                <Text style={styles.stepDescription}>
                Get groceries delivered in as fast as 30 minutes
                </Text>
            </View>
            </View>
        </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "space-between",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 65,
    backgroundColor: "#fff",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.tertiary,
    flex: 1,
    textAlign: "center",
    fontFamily: "WorkSans",
  },
  flashlightButton: {
    justifyContent: "center",
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: Colors.tertiary,
    paddingHorizontal: 16,
    paddingBottom: 12,
    paddingTop: 0,
    fontFamily: "WorkSans",
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
  },
  infoText: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: Colors.tertiary,
    fontFamily: "WorkSans",
  },
  stepDescription: {
    fontSize: 14,
    color: "#637588",
    fontFamily: "WorkSansR",
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 16,
  },
  categoryItem: {
    width: "30%",
    alignItems: "center",
  },
  categoryImage: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 100,
    backgroundColor: "#ccc",
  },
});