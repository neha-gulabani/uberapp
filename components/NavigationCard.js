import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { GOOGLE_MAPS_API } from "@env"
import { useDispatch } from 'react-redux/es'
import { useNavigation } from '@react-navigation/native'
import { setDest } from '../slices/navSlices'
import { Icon } from 'react-native-elements'

import * as  NativeComp from 'native-base';


NativeComp.Icon = jest.fn((props) => 'Icon');



const NavigationCard = () => {
    const dispatch = useDispatch()
    const navigate = useNavigation()
    return (
        <SafeAreaView style={tw`bg-white flex-1`}>
            <Text style={tw` py-5 text-center text-xl`}>Good Morning!</Text>
            <View style={tw`border-t border-gray-200 flex-shrink`}>
                <View  >
                    <GooglePlacesAutocomplete
                        placeholder="where to?"
                        styles={styles}
                        nearbyPlacesAPI='GooglePlacesSearch'
                        debounce={400}
                        returnKeyType={"search"}
                        minLength={2}
                        listView={styles.list}
                        onPress={(data, details = null) => {
                            //setting destination and dispatching it
                            dispatch(setDest({
                                location: details.geometry.location,
                                description: data.description
                            }))
                            //navigate to the ride options
                            navigate.navigate('RideSelectCard')

                        }}
                        fetchDetails={true}
                        enablePoweredByContainer={false}
                        query={{
                            key: GOOGLE_MAPS_API,
                            language: 'en'
                        }}
                    />
                </View>

            </View>
            {/* setting home address */}

            <TouchableOpacity style={tw`items-center flex-row bg-white p-3 `}
                onPress={() => {
                    // dispatching home address and setting it as destination
                    dispatch(setDest({
                        location: { lat: 51.113090, lng: 1.171670 },
                        description: 'home'
                    }))
                    //navigate to the ride options card
                    navigate.navigate('RideSelectCard')
                }}>
                <Icon
                    style={tw`rounded-full mr-4 p-3 z-0 bg-gray-300  `}
                    name={"home"}
                    type="ionicon"
                    color="white"
                    size={18}
                />
                <View>
                    <Text style={tw`text-lg font-semibold `}>Home</Text>
                    <Text style={tw`text-gray-600`}>Coombe Wood, Conduit Lane, London, UK</Text>
                </View>
            </TouchableOpacity>



            <View style={tw`bg-white flex-row py-2 border-gray-100 justify-evenly border-t mt-auto  `}>
                <TouchableOpacity
                    onPress={() => { navigate.navigate('RideSelectCard') }}
                    style={tw`py-3 flex rounded-full w-24 bg-black px-4 justify-between flex-row `}>
                    <Icon name="car" type="font-awesome" color="white" size={16} />
                    <Text style={tw`text-center text-white `}>Rides</Text>
                </TouchableOpacity>
                <TouchableOpacity style={tw`rounded-full flex justify-between flex-row  w-24 py-3 px-4 `}>
                    <Icon name="fast-food-outline" type="ionicon" color="black" size={16} />
                    <Text style={tw`text-center`}>Eats</Text>

                </TouchableOpacity>
            </View>


        </SafeAreaView>
    )
}

export default NavigationCard

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        paddingTop: 20,
        flex: 0,
        zIndex: 1000
    },
    textInput: {
        backgroundColor: "#e1e1e3",
        borderRadius: 0,
        fontSize: 18,
        zIndex: 1000
    },
    textInputContainer: {
        paddingHorizontal: 20,
        paddingBottom: 0,
        flex: 0

    },
    list: {

        zIndex: 1000,
        position: 'absolute',
        elevation: 100,
        flex: 0



    }

})