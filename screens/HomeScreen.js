import { StyleSheet, Text, TouchableOpacity, View, SafeAreaView } from 'react-native'
import React from 'react'
import {useEffect, useState} from 'react'
import { EvilIcons } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';
const HomeScreen = ({route}) => {
    const userData = route.params
    const [trips, setTrips] = useState([])
    const [currIndex, setCurrIndex] = useState(0)

    const navigation = useNavigation();
    useEffect(() => {
        console.log('HOME', userData);
        fetchUserTrips();
    }, [])

    const fetchUserTrips = () => {
        fetch(`https://us-central1-travplan-347915.cloudfunctions.net/getTripsForUser?email=${userData.user.id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(res =>{
            console.log('ttttttttttttttttttttttt')
            console.log('status', res.status);
            setTrips([]);
        })
        .catch((err)=> console.error(err))
        
    }

    const handleCreateTrip = () => {
        navigation.navigate('CreateTrip', {userData: userData})
    }

    const TripContainer = (props) => {
        if (trips.length > 0) {
            return (
                <View styles={styles.tripsContainer}>
                    <Text styles={styles.tripsTitle}>Your Trips</Text>
                    <View> 
                        <TouchableOpacity onPress={() => setCurrIndex(currIndex-1)}>
                            <EvilIcons name="arrow-left" size={24} color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.mainTrips} onPress={() => {navigation.navigate('TripDashboard', {trip: trip[currIndex], user: userData})}}>
                            <Text>{'Atlanta Trip'}</Text>
                            <Text>{'Atlanta'}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setCurrIndex(currIndex+1)}>
                            <EvilIcons name="arrow-right" size={24} color="black" />
                        </TouchableOpacity>
                    </View>
                </View>
            )
        } else {
            return (
                <View styles={styles.tripsContainer}>
                    <Text style={styles.tripsTitle}>You have no trips</Text>
                </View>
            )
        }
        return (null);
    }

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.headContainer}>
            <Text style={styles.headTitle}>Want to Travel?</Text>
            <Text style={styles.headTitle}>Lets Go!</Text>
        </View>
        <TripContainer />
        <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.newTripButton} onPress={handleCreateTrip}>
                <Text style={styles.newTripText}>Create New Trip</Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FF9D9D',
        alignItems: 'center',
    },
    tripsTitle: {
        fontSize: 30,
        fontWeight: '100',
    },
    headTitle: {
        fontSize: 40,
    },
    headContainer: {
        maxHeight: '20%',
        width: '80%',
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
        marginTop: 30,
        paddingBottom: 10,
    },
    tripsContainer: {
        minHeight: '60%',
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 20,
    },
    newTripButton: {
        backgroundColor: 'rgb(0,0,0)',
        borderRadius: 5,
        padding: 10,
        paddingHorizontal: 120,
    },
    newTripText: {
        color: 'white',
        fontSize: 20,
    },
})
//Nscholz6@gatech.edu