import { StyleSheet, Text, View, ImageBackground, SafeAreaView, TouchableWithoutFeedback, Keyboard, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Background from '../assets/images/Atlanta.png'
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../hooks/UserProvider';
import DateTimePickerModal from "react-native-modal-datetime-picker";
const CreateTrip = ({ route }) => {
    const [tripName, setTripName] = useState('');
    const [tripDestination, setTripDestination] = useState('');
    const [tripStartDate, setTripStartDate] = useState(new Date());
    const [tripEndDate, setTripEndDate] = useState(new Date());
    const [isStartDatePickerVisible, setStartDatePickerVisibility] = useState(false);
    const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);
    const { user, setTrip } = useUser();
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
                email: user.email,
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
                        setTrip(data);
                        navigation.replace('Trip')
                    });
                    break;
            }
        });
    }

    const showStartDatePicker = () => {
        setStartDatePickerVisibility(true);
    };
    const hideStartDatePicker = () => {
        setStartDatePickerVisibility(false);
    };
    const handleStartConfirm = (date) => {
        //console.warn("A date has been picked: ", date);
        setTripStartDate(date);
        hideStartDatePicker();
    };

    const showEndDatePicker = () => {
        setEndDatePickerVisibility(true);
    };
    const hideEndDatePicker = () => {
        setEndDatePickerVisibility(false);
    };
    const handleEndConfirm = (date) => {
        //console.warn("A date has been picked: ", date);
        setTripEndDate(date);
        hideEndDatePicker();
    };

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
                                <View style={styles.datePicker}>
                                    <TouchableOpacity
                                        onPress={showStartDatePicker}
                                        style={styles.chooseButton}>
                                        <Text
                                            style={styles.chosenDateText}>
                                            {tripStartDate === null ? 'Choose Start'
                                                : tripStartDate.toLocaleDateString('en-us', {year: 'numeric', month: 'long', day: 'numeric' })}
                                        </Text>
                                    </TouchableOpacity>
                                    <DateTimePickerModal
                                        isVisible={isStartDatePickerVisible}
                                        mode="date"
                                        onConfirm={handleStartConfirm}
                                        onCancel={hideStartDatePicker}
                                    />
                                </View>
                            </View>
                            <View style={styles.dateEntry}>
                                <Text style={styles.dateText}>End Date</Text>
                                <View style={styles.datePicker}>
                                    <TouchableOpacity
                                        onPress={showEndDatePicker}
                                        style={styles.chooseButton}>
                                        <Text
                                            style={styles.chosenDateText}>
                                            {tripEndDate === null ? 'Choose End'
                                                : tripEndDate.toLocaleDateString('en-us', {year: 'numeric', month: 'long', day: 'numeric' })}
                                        </Text>
                                    </TouchableOpacity>
                                    <DateTimePickerModal
                                        isVisible={isEndDatePickerVisible}
                                        mode="date"
                                        onConfirm={handleEndConfirm}
                                        onCancel={hideEndDatePicker}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.center}>
                        <Text style={styles.destinationText}>Atlanta</Text>
                    </View>
                    <View style={styles.buttonsContainer}>
                        <View style={styles.cancelButtonContainer}>
                            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
                                <Text style={styles.buttonText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.button} onPress={handleGo}>
                                <Text style={styles.buttonText}>Let's Go!</Text>
                            </TouchableOpacity>
                        </View>
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
        paddingVertical: 5,
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
        marginTop: 10,
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
    },
    cancelButtonContainer: {
        width: '60%',
    },
    button: {
        width: '60%',
        backgroundColor: 'rgba(0,0,0,0.6)',
        paddingVertical: 5,
        borderRadius: 5,
        borderWidth: 2,
    },
    buttonText: {
        fontSize: 20,
        color: 'white',
        textAlign: 'center',
    },
    chosenDateText: {
        color: 'black',
        fontSize: 15,
        textAlign: 'center',
    },
    chooseButton: {
        width: '100%',
        color: 'black',
        borderWidth: 2,
        borderColor: 'rgba(0,0,0,0.6)',
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 15,
    },
    buttonsContainer: {
        marginTop: 25,
        width: '80%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
})