import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import {useEffect, useState} from 'react'
const HomeScreen = ({route, navigation}) => {
    const userData = route.params
    const [trips, setTrips] = useState([])
    useEffect(() => {
        fetchUserTrips();
    })

    const fetchUserTrips = async () => {
        const response = await fetch('https://us-central1-travplan-347915.cloudfunctions.net/getUserTrips', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: userData.user.id
            })
        })
        const data = await response.json();
        console.log(data);
        setTrips(data);
    }

    const handleCreateTrip = () => {

    }

    const TripContainer = (props) => {
        console.log(trips)
        if (trips.length > 0) {
            return (
                <View styles={styles.tripsContainer}>
                    <Text>Your Trips</Text>
                </View>
            )
        } else {
            return (
                <View styles={styles.tripsContainer}>
                    <Text>You have no trips</Text>
                </View>
            )
        }
        return (null);
    }

  return (
    <View style={styles.container}>
        <View styles={styles.TitleContainer}> 
            <Text>Want to Travel?</Text>
            <Text>Lets Go!</Text>
        </View>
        <TripContainer />
        <View styles={styles.newTripContainer}>
            <TouchableOpacity style={styles.newTripButton} onPress={handleCreateTrip}>
                <Text style={styles.newTripText}>Add New Trip</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FF9D9D',
        alignItems: 'center',
        justifyContent: 'center',
    },
})