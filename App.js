import React from 'react';
import MapView, { Callout, Circle, Marker } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { StyleSheet, View, Text } from 'react-native';

export default function App() {
  const [pin, setPin] = React.useState({latitude: 37.78825, longitude: -122.4324})
  const [region, setRegion] = React.useState({latitude: 37.78825, longitude: -122.4324,latitudeDelta: 0.0922,longitudeDelta: 0.0421,})
  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete style={styles.search}
      placeholder='Where to?'
      fetchDetails={true}
      GooglePlacesSearchQuery={{
        rankby:'distance'
      }}
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        console.log(data, details);
        //setPin({latitude:details.geometry.location.lat,longitude:details.geometry.location.lng})
        setRegion({latitude:details.geometry.location.lat,longitude:details.geometry.location.lng,latitudeDelta: 0.0922,longitudeDelta: 0.0421,})
      }}
      query={{
        key: 'AIzaSyDBQOf0tvMNiecFD8A5UQ-0JmHW8BL6JAA',
        language: 'en',
        //components:'country:us',
        //types:'establishment',
        radius:30000,
        location:`${region.latitude},${region.longitude}`
      }}
      styles={
        {container:{
          flex:0,position: 'absolute',width: '100%',zIndex: 1,padding:20
        },
        listview:{
          backgroundColor: 'white',
        }}
      }
    />
      <MapView 
      style={styles.map} initialRegion={{
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
      }} provider="google">
        <Marker coordinate={pin} pinColor="red" draggable={true}
      onDragStart={(e) => console.log()}
      onDragEnd={(e) => setPin({latitude:e.nativeEvent.coordinate.latitude,longitude:e.nativeEvent.coordinate.longitude})}>
        <Callout>
          <Text>Initial Position</Text>
        </Callout>
      </Marker>
      <Marker coordinate={region} pinColor="blue" draggable={true}></Marker>
      <Circle center={pin} radius={1000}></Circle>
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop:50,
    flex:1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  search: {
    
    },
});


//AIzaSyDBQOf0tvMNiecFD8A5UQ-0JmHW8BL6JAA