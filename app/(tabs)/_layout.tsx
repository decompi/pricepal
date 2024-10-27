import { View, TouchableOpacity, StyleSheet } from 'react-native'
import { Tabs } from 'expo-router'
import Octicons from '@expo/vector-icons/Octicons'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import Colors from "@/constants/Colors"

export default function Layout() {
    return (
        <Tabs screenOptions={{
            tabBarStyle: styles.tabBarStyle,
            tabBarShowLabel: true,
            tabBarActiveTintColor: 'black',
            tabBarInactiveTintColor: "#999",
            tabBarLabelStyle: styles.tabBarLabelStyle
        }}>
            <Tabs.Screen 
                name='index'
                options= {{
                    title: "Home",
                    tabBarIcon: ({ color }) => (
                        <Octicons name="home" size={24} color={color} />
                    ),
                    tabBarButton: (props) => (
                        //
                        <TouchableOpacity {...props} />
                    )
                }}  
            />
            {<Tabs.Screen 
                name='cart' 
                options= {{
                    title: "Cart",
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="cart" size={24} color={color} />
                    ),
                    tabBarButton: (props) => (
                        <TouchableOpacity {...props} />
                    )
                }}  
            />}
            <Tabs.Screen 
                name='scan' 
                options= {{
                    title: "Scan",
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="barcode-scan" size={24} color={color} /> 
                    ),
                    tabBarButton: (props) => (
                        <TouchableOpacity {...props} />
                    )
                }}  
            />
            <Tabs.Screen 
                name='account' 
                options= {{
                    title: "Profile",
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="account-circle-outline" size={24} color={color} />
                    ),
                    tabBarButton: (props) => (
                        <TouchableOpacity {...props} />
                    )
                }}  
            />
        </Tabs>
    )
}

const styles = StyleSheet.create({
    tabBarStyle: {
        backgroundColor: Colors.bgColor,
        borderTopWidth: 0,
        paddingVertical: 0,
        paddingHorizontal: 30,
    },
    tabBarLabelStyle: {
        fontSize: 12,
        fontFamily: 'WorkSansR'
    }
})