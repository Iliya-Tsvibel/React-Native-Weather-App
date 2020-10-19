import React, { useState } from 'react';
import { TextInput, Button, Card } from 'react-native-paper';
import { View, Text, FlatList } from 'react-native'
import Header from './Header'
import AsyncStorage from '@react-native-community/async-storage';
import IonIcon from 'react-native-vector-icons/Ionicons'

export default Search = ({ navigation }) => {
    const [city, setCity] = useState('')
    const [cities, setCities] = useState([])
    const fetchCities = (text) => {
        setCity(text)
        fetch("https://api.weather.com/v3/location/search?apiKey=6532d6454b8aa370768e63d6ba5a832e&language=en-US&query=" + text + "&locationType=city&format=json")
            .then(res => res.json())
            .then(data => {
                setCities(data.location.address)
                //setCities(cityData.RESULTS.slice(0,9))
                //console.log(data.location.address)
            })
    }
    const btnClick = async () => {
        await AsyncStorage.setItem("newcity", city)
        navigation.navigate("home", { city: city })
    }
    const listClick = async (cityname) => {
        setCity(cityname)
        await AsyncStorage.setItem("newcity", cityname)
        navigation.navigate("home", { city: cityname })
    }
    return (
        <View style={{ flex: 1 }}>
            <Header name="Search" />
            <TextInput
                label="city name"
                theme={{ colors: { primary: "orange" } }}
                value={city}
                onChangeText={(text) => fetchCities(text)}
            />
            <Button
                icon="content-save"
                mode="contained"
                theme={{ colors: { primary: "orange" } }}
                style={{ margin: 20 }}
                onPress={() => btnClick()}>
                <Text style={{ color: "white" }}>Set as favorite</Text>

            </Button>
            <FlatList
                data={cities}
                renderItem={({ item }) => {
                    return (
                        <Card
                            style={{ margin: 2, padding: 12 }}
                            onPress={() => listClick(item.name)}
                        >
                            <Text>{item.name}</Text>
                        </Card>
                    )
                }}
                keyExtractor={item => item.name}
            />

        </View>
    );

}