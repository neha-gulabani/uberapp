import { FlatList, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import tw from "twrnc"
import { Icon } from '@rneui/base'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux/es'
import { selectStart } from '../slices/navSlices'

import * as  NativeComp from 'native-base';


NativeComp.Icon = jest.fn((props) => 'Icon');


const dataOptions = [
    {
        id: '321',
        title: 'Get a ride',
        image: 'https://links.papareact.com/3pn',
        screen: 'MapScreens',
    },
    {
        id: '789',
        title: 'Order food',
        image: 'https://links.papareact.com/28w',
        screen: 'EatsScreen'
    },];

//Creating the rides and eats buttons for the home screen
const NavOptions = () => {
    const navigation = useNavigation();
    const start = useSelector(selectStart)
    return (
        //casting data array above into a flat list 
        <FlatList
            data={dataOptions}
            keyExtractor={(item) => item.id}
            horizontal
            renderItem={({ item }) => (
                <TouchableOpacity
                    onPress={() => {
                        //navigate to the respective screens
                        navigation.navigate(item.screen)
                    }}
                    style={tw`pl-6 p-2 pt-4 bg-gray-200 w-40  m-2 pb-8`}
                    disabled={!start}>
                    <View style={tw`${!start && "opacity-20"}`}>
                        <Image
                            style={{ width: 120, resizeMode: 'contain', height: 120 }}
                            source={{ uri: item.image }}
                        />
                        <Text style={tw`font-semibold text-lg mt-2 `}>{item.title}</Text>
                        <Icon
                            style={tw`mt-4 bg-black p-2 w-10 rounded-full  `}
                            name="arrowright" color="white" type="antdesign" />
                    </View>

                </TouchableOpacity>)}
        />

    )
}

export default NavOptions

