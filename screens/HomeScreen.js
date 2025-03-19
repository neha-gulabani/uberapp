import { StyleSheet, Text, View, SafeAreaView, Image } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import NavOptions from '../components/NavOptions'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { GOOGLE_MAPS_API } from "@env"
import { useDispatch } from 'react-redux/es'
import { setStart, setDest } from '../slices/navSlices'
import NavCurrent from '../components/NavCurrent'


const HomeScreen = () => {
    const dispatch = useDispatch()
    return (
        <SafeAreaView style={tw`bg-white h-full`}>
            <View style={tw`p-5`}>
                {/* Uber logo */}
                <Image
                    style={{ width: 100, resizeMode: `contain`, height: 100 }}
                    source={{
                        uri: "https://links.papareact.com/gzs"
                    }} />
                {/* Origin text box with suggestions */}
                <View style={{ height: 280 }}>
                    <GooglePlacesAutocomplete
                        placeholder="Where from?"
                        onPress={(data, details = null) => {

                            dispatch(setStart({
                                location: details.geometry.location,
                                description: data.description
                            }))
                            dispatch(setDest(null))
                        }}
                        style={{
                            container: {
                                flex: 0,
                                zIndex: 5000,
                            },
                            textInput: {
                                fontSize: 18
                            }
                        }}
                        query={{
                            key: GOOGLE_MAPS_API,
                            language: 'en'
                        }}
                        listViewDisplayed={true}
                        returnKeyType={"search"}
                        fetchDetails={true}
                        nearbyPlacesAPI='GooglePlaceSearch'
                        debounce={4000}
                        minLength={2}
                        textInputProps={{ onBlur: () => { } }}

                    />
                    {/* Current location feature */}
                    <NavCurrent />

                </View>

                {/* Get a ride and eats buttons on the home screen */}

                <NavOptions />

            </View>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({

})