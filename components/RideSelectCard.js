import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, FlatList } from 'react-native'
import React, { useState } from 'react'
import { Icon } from 'react-native-elements'
import tw from 'twrnc'
import { useNavigation } from '@react-navigation/native'
import { Image } from 'react-native'
import { useSelector } from 'react-redux/es'
import { selectTravelTimeInfo } from '../slices/navSlices'

import * as  NativeComp from 'native-base';


NativeComp.Icon = jest.fn((props) => 'Icon');

const data = [
    {
        id: "UberX321",
        title: "Uber X",
        multiplier: 1,
        image: "https://links.papareact.com/7pf"
    },
    {
        id: "UberXL654",
        title: "UberXL",
        multiplier: 1.2,
        image: "https://links.papareact.com/7pf"
    },
    {
        id: "UberXXL654",
        title: "UberXXL",
        multiplier: 1.5,
        image: "https://links.papareact.com/7pf"
    },


]
//surge charges variable for price calculation
const surge_charges = 1.5

const RideSelectCard = () => {
    const navigate = useNavigation()
    const [selected, setSelected] = useState(null);
    const travelTimeInfo = useSelector(selectTravelTimeInfo)
    return (
        <SafeAreaView style={tw`flex-grow bg-white `}>
            <View style={tw`flex-row z-40 `}>
                <TouchableOpacity onPress={() => {
                    //back button navigation
                    navigate.navigate("NavigationCard")
                }}
                    style={tw`left-5 top-3 rounded-full p-3`}>
                    <Icon name="chevron-left" type="fontawesome" />
                </TouchableOpacity>
                {/* Select Ride title */}
                <Text style={tw`py-5 text-center px-20 text-xl `}>Select a Ride ({travelTimeInfo?.distance.text})</Text>
            </View>

            {/* data array above casted into flatlist */}

            <FlatList
                data={data}
                keyExtractor={(item) => item.id}
                style={{ maxHeight: 250 }}
                renderItem={({ item }) => (

                    <TouchableOpacity
                        style={tw`items-center flex-row px-10 justify-between 
                        ${item.id === selected?.id && "bg-gray-200"}`}
                        onPress={() => { setSelected(item) }}>
                        <Image
                            style={{
                                width: 94,
                                height: 100,
                                resizeMode: "contain"
                            }}
                            source={{ uri: item.image }}
                        />
                        <View style={tw`-ml-2`}>
                            <Text style={tw`font-semibold text-xl `}>
                                {item.title}
                            </Text>
                            {/* retrieving travel time */}
                            <Text>
                                Travel time: {travelTimeInfo?.duration.text}

                            </Text>
                        </View>
                        <Text style={tw`ml-2 text-xl `}>
                            {/* calculation of price */}

                            £{((travelTimeInfo?.duration.value * surge_charges * item.multiplier) / 100).toFixed(0)}
                        </Text>

                    </TouchableOpacity>

                )}

            />

            <View>
                <TouchableOpacity disabled={!selected} style={tw`bg-black mb-18 z-40 m-3 py-3 ${!selected && "bg-gray-300"}`}>
                    <Text style={tw`text-center text-white text-xl`}>Choose {selected?.title}</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default RideSelectCard

const styles = StyleSheet.create({})