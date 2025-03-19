import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Maps from '../components/Maps'
import tw from 'twrnc'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import NavigationCard from '../components/NavigationCard'
import RideSelectCard from '../components/RideSelectCard'

const MapScreens = () => {
    const Stack = createNativeStackNavigator()
    return (
        <View>
            {/* showing maps and selecting destination and rides */}

            <View style={tw`h-1/2`}>
                <Maps />
            </View>

            <View style={tw`h-1/2`}>
                <Stack.Navigator>
                    <Stack.Screen
                        name="NavigationCard"
                        component={NavigationCard}
                        options={{
                            headerShown: false
                        }}
                    />
                    <Stack.Screen
                        name="RideSelectCard"
                        component={RideSelectCard}
                        options={{
                            headerShown: false
                        }}
                    />
                </Stack.Navigator>

            </View>
        </View>
    )
}

export default MapScreens

const styles = StyleSheet.create({})