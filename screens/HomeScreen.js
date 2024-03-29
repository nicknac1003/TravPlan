import { StyleSheet, Text, TouchableOpacity, View, SafeAreaView, ImageBackground, Button } from 'react-native'
import React from 'react'
import {useEffect, useState} from 'react'
import { EvilIcons } from '@expo/vector-icons'; 
import { useNavigation, useIsFocused } from '@react-navigation/native';
import Swiper from 'react-native-swiper';
import * as Progress from 'react-native-progress';
import { useUser } from '../hooks/UserProvider';
const HomeScreen = ({route}) => {
    const [trips, setTrips] = useState([])
    const [currIndex, setCurrIndex] = useState(0)
    const [loading, setLoading] = useState(true)
    const { user, setTrip } = useUser();

    const navigation = useNavigation();
    const isFocused = useIsFocused();
    useEffect(() => {
        //console.log('HOME', userData);
        console.log(user)
        fetchUserTrips();
    }, [isFocused])

    const fetchUserTrips = () => {
        setLoading(true)
        fetch(`https://us-central1-travplan-347915.cloudfunctions.net/getTripsForUser?email=${user.email}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(res =>{
            let statusCode = res.status;
            setLoading(false);
            switch(statusCode) {
                case 404:
                    alert('you dont exist');
                    break;
                case 200:
                    res.json().then(data => {
                        //console.log(data);

                        setTrips([...data]);
                    });
                    break;
                }
        })
        .catch((err)=> console.error(err))
        
    }

    const handleCreateTrip = () => {
        navigation.navigate('CreateTrip');
    }

    const handlePress = (trip) => {
        setTrip(trip);
        navigation.navigate('Trip');
    }

    const TripContainer = (props) => {
        if (trips.length > 0) {
            return (
                <View style={styles.tripsContainer}>
                    <Text style={styles.tripsTitle}>Your Trips</Text>
                    <View style={styles.tripControl}> 
                        <Swiper style={styles.swipeWrapper} showsButtons={true} loop={false} >
                            {trips.map((trip, index) => {
                                return (
                                    <ImageBackground
                                        source={{uri: trip.tripImage}}
                                        style={styles.tripImage}
                                        key={index}
                                    >
                                        <TouchableOpacity style={styles.tripButton} onPress={()=>handlePress(trip)}>
                                            <View style={styles.tripText}>
                                                <Text style={styles.tripName}>{trip.tripName}</Text>
                                                <Text style={styles.tripDestination}>{trip.tripDestination}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </ImageBackground>
                                )})}
                        </Swiper>
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
            <Text style={styles.headTitle}>Let's Go!</Text>
        </View>
        {
            loading ?
            <Progress.CircleSnail size={100} color={['black']} />
            :
            <TripContainer />
        }
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
    tripImage: {
        width: '100%',
        height: '100%',
    },
    container: {
        flex: 1,
        backgroundColor: '#FF9D9D',
        alignItems: 'center',
    },
    tripsTitle: {
        fontSize: 30,
        fontWeight: '100',
        marginBottom: 30,
        textAlign: 'center',
    },
    headTitle: {
        fontSize: 40,
    },
    tripControl: {
        flexDirection: 'row',
        width: '100%',
        height: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
    },
    tripButton: {
        width: '100%', 
        height: '100%',
    },
    tripText: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        overflow: 'hidden',
    },
    tripName: {
        fontSize: 25,
        fontWeight: '500',
        marginBottom: 5,
        color: 'white',
    },
    tripDestination: {
        fontSize: 20,
        fontWeight: '200',
        color: 'white',
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
        width: '80%',
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
        paddingHorizontal: 100,
        paddingVertical: 20,
    },
    newTripText: {
        color: 'white',
        fontSize: 20,
    },
    mainTrips: {
        borderWidth: 1,
    },
})
//Nscholz6@gatech.edu