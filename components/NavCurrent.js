import { StyleSheet, Text, View, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import React, { useState, useEffect } from 'react'
import tw from 'twrnc'
import * as Location from 'expo-location';
import { useDispatch } from 'react-redux/es'
import { setStart, setDest } from '../slices/navSlices';
import { Icon } from 'react-native-elements'

import * as  NativeComp from 'native-base';


NativeComp.Icon = jest.fn((props) => 'Icon');


const NavCurrent = () => {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    const dispatch = useDispatch()

    useEffect(() => {
        //below code of requesting and extracting current location data is taken from this website: https://stackoverflow.com/questions/62975142/how-can-i-get-current-location-for-using-expo-location-api-with-react-native

        //request for permission for current location
        (async () => {

            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }
            //retrieving current location
            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        })();
    }, []);

    //status of current location retrieval
    let text = 'Waiting..';
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = JSON.stringify(location);

    }
    console.log(text)


    return (
        <View>

            <TouchableOpacity style={tw`items-center flex-row p-5`} onPress={() => {
                //setting origin to current location
                dispatch(setStart({
                    location: { lat: location.coords.latitude, lng: location.coords.longitude },
                    description: 'current location'
                }))
                dispatch(setDest(null))
            }}>
                {/* Adding the location icon */}
                <Icon
                    style={tw`rounded-full mr-4 p-3 bg-white`}
                    name="location-pin"
                    type="entypo"
                    color="black"
                    size={20}
                />
                <Text style={tw`text-lg font-semibold`}> Use Current Location</Text>
            </TouchableOpacity>
        </View>
    )
}

export default NavCurrent

const styles = StyleSheet.create({})