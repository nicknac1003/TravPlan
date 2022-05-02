import { StyleSheet, Text, View, ImageBackground, SafeAreaView, TouchableWithoutFeedback, Keyboard, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Background from '../assets/images/Atlanta.png'
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
const CreateTrip = ({ route }) => {
    const userData = route.params.userData;
    const [tripName, setTripName] = useState('');
    const [tripDestination, setTripDestination] = useState('');
    const [tripStartDate, setTripStartDate] = useState(new Date());
    const [tripEndDate, setTripEndDate] = useState(new Date());
    const navigation = useNavigation();
    //https://media.cntraveler.com/photos/57471fe678a2718d4665d5e6/16:9/w_2560%2Cc_limit/atlanta-georgia-skyline-cr-getty.jpg
    const handleGo = () => {
        fetch('https://us-central1-travplan-347915.cloudfunctions.net/createNewTrip', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                tripName: tripName,
                tripDestination: tripDestination,
                tripDateStart: tripStartDate,
                tripDateEnd: tripEndDate,
                tripImage:'https://media.cntraveler.com/photos/57471fe678a2718d4665d5e6/16:9/w_2560%2Cc_limit/atlanta-georgia-skyline-cr-getty.jpg',
                itenerary: [],
                email: userData.user.email,
            })
        })
        .then(res => {
            let statusCode = res.status;
            console.log(statusCode);
            switch(statusCode) {
                case 400:
                    alert('error');
                    console.log(JSON.stringify(res.data))
                    break;
                case 200:
                    res.json().then(data => {
                        console.log(data);
                        navigation.navigate('Home', {
                            user: userData,
                            trip: data
                        });
                    })
                    break;
            }
        });
    }
  return (
    <ImageBackground
        source={Background}
        style={styles.background}
    >
        <SafeAreaView style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    <View style={styles.inputContainer}>
                        <TextInput style={styles.input}
                            placeholder="Trip Name"
                            placeholderTextColor="black"
                            value={tripName}
                            onChangeText={(text) => setTripName(text)}
                        />
                        <TextInput style={styles.input}
                            placeholder="Destination"
                            placeholderTextColor="black"
                            value={tripDestination}
                            onChangeText={(text) => setTripDestination(text)}
                        />
                        <View style={styles.dateContainer}>
                            <View style={styles.dateEntry}>
                                <Text style={styles.dateText}>Start Date</Text>
                                <DateTimePicker
                                    mode="date"
                                    value={tripStartDate}
                                    onChange={(e, date) => setTripStartDate(date)}
                                    style={styles.datePicker}
                                />
                            </View>
                            <View style={styles.dateEntry}>
                                <Text style={styles.dateText}>End Date</Text>
                                <DateTimePicker
                                    mode="date"
                                    value={tripEndDate}
                                    onChange={(e, date) => setTripEndDate(date)}
                                    style={styles.datePicker}
                                />
                            </View>
                        </View>
                    </View>
                    <View style={styles.center}>
                        <Text style={styles.destinationText}>Atlanta</Text>
                    </View>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={handleGo}>
                            <Text style={styles.buttonText}>Lets Go!</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>
            
        </SafeAreaView>
    </ImageBackground>
  )
}

export default CreateTrip

const styles = StyleSheet.create({
    background: {
        width: '100%',
        height: '100%',
    },
    container: {
        flex: 1,
        alignItems: 'center',
    },
    inputContainer: {
        width: '80%',
    },
    input: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 25,
        borderBottomWidth: 2,
        fontSize: 15,
    },
    dateText: {
        fontSize: 15,
        width: '40%',
        
    },
    dateContainer: {
        width: '100%',
        marginTop: 20,
        
    },
    dateEntry: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    datePicker: {
        width: '60%',
    },
    center: {
        marginTop: 20,
        minWidth: '75%',
        height: '40%',
        borderWidth: 10,
        borderBottomWidth: 50,
        borderColor: 'rgba(255,255,255,0.8)',
    },
    destinationText: {
        fontSize: 30,
        fontWeight: 'bold',
        position: 'absolute',
        bottom: -43,
        left: '22%',
    },
    buttonContainer: {
        width: '80%',
        marginTop: 30,
    },
    button: {
        width: '100%',
        backgroundColor: 'rgba(0,0,0,0.6)',
        paddingHorizontal: '30%',
        paddingVertical: 5,
        borderRadius: 5,
        borderWidth: 2,
    },
    buttonText: {
        fontSize: 30,
        color: 'white',
    },
})