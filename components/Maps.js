import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MapView, { Marker } from 'react-native-maps'
import tw from 'twrnc'
import { useDispatch, useSelector } from 'react-redux/es'
import { selectStart, selectDest, setTravelTimeInfo } from '../slices/navSlices'
import MapViewDirections from 'react-native-maps-directions'
import { GOOGLE_MAPS_API } from "@env"
import { useRef } from 'react'
import { useEffect } from 'react'




const Maps = () => {
    const start = useSelector(selectStart)
    const dest = useSelector(selectDest)
    const ref = useRef(null)
    const dispatch = useDispatch();


    useEffect(() => {
        console.log(start.description)

        if (!start || !dest) return;
        //zooming and fitting markers
        ref.current.fitToSuppliedMarkers(['start', 'destination'], {
            edgePadding: { right: 50, top: 50, left: 50, bottom: 50 }
        })

    }, [start, dest])

    useEffect(() => {
        if (!start || !dest) return;
        //retrieving travel time and distance 
        const travelTime = async () => {
            const startLocation = start.location.lat + "," + start.location.lng;
            const destLocation = dest.location.lat + "," + dest.location.lng;

            let apiURL = "https://maps.googleapis.com/maps/api/distancematrix/json?";

            let parameter = `origins=${startLocation}&destinations=${destLocation}&key=${GOOGLE_MAPS_API}`;
            let finalURL = `${apiURL}${encodeURI(parameter)}`;

            let fetchingResult = await fetch(finalURL); // call API
            let res = await fetchingResult.json(); // extract json

            console.log(res.rows[0].elements[0]);
            //dispatching travel time and distance data
            dispatch(setTravelTimeInfo(res.rows[0].elements[0]))


        }

        travelTime();

    }, [start, dest, GOOGLE_MAPS_API])


    return (
        // shows the map 
        <MapView
            ref={ref}
            style={tw`flex-1`}
            mapType="mutedStandard"
            initialRegion={{
                latitude: start.location.lat,
                longitude: start.location.lng,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
            }}
        >
            {/* shows the route between origin and destination */}
            {start && dest && (
                <MapViewDirections
                    origin={{
                        latitude: start.location.lat,
                        longitude: start.location.lng,

                    }}
                    destination={{
                        latitude: dest.location.lat,
                        longitude: dest.location.lng,

                    }}
                    apikey={GOOGLE_MAPS_API}
                    strokeWidth={3}
                    strokeColor="black"
                />

            )}

            {/* shows the origin on the map */}
            {start?.location && (
                <Marker
                    title="Origin"
                    description={start.description}
                    coordinate={{
                        latitude: start.location.lat,
                        longitude: start.location.lng,

                    }}
                    identifier="origin"
                />
            )}

            {/* shows the destination on the map */}

            {dest?.location && (
                <Marker
                    title="Destination"
                    description={dest.description}
                    coordinate={{
                        latitude: dest.location.lat,
                        longitude: dest.location.lng,

                    }}
                    identifier="destination"
                />
            )}

        </MapView>

    )
}

export default Maps

const styles = StyleSheet.create({})