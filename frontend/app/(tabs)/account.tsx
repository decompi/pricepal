import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

export default function Page() {
    return (
      <View style={styles.container}>
          <Stack.Screen
              options={{
              headerTransparent: true,
              headerTitle: "",
              }}
          />
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: "#fff"
    }
})