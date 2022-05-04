import { ImageBackground, StyleSheet, Text, View, KeyboardAvoidingView, TextInput, TouchableOpacity, Keyboard, TouchableWithoutFeedback, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import background from '../assets/images/background.png'
import DateTimePicker from '@react-native-community/datetimepicker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
const RegisterScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [birthday, setBirthday] = useState(null);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const navigation = useNavigation();
    const handleRegister = () => {
        console.log(name, email, password, birthday);
        /**
         * TODO:
         * register user to database
         * sign in user
         * navigate to home screen
         */
        fetch('https://us-central1-travplan-347915.cloudfunctions.net/signUp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                },
            body: JSON.stringify({
                fullName: name,
                email: email,
                password: password,
                dob: birthday
                })
            })
            .then(res => {
                let statusCode = res.status;
                console.log(statusCode);
                switch(statusCode) {
                    case 400:
                        alert('error');
                        console.log(JSON.stringify(res))
                        break;
                    case 200:
                        res.json().then(data => {
                            fetch('https://us-central1-travplan-347915.cloudfunctions.net/login', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    email: data.email,
                                    password: data.password
                                })
                            })
                            .then(res => {
                                let statusCode = res.status;
                                console.log(statusCode);
                                switch(statusCode) {
                                    case 404:
                                        alert('Email or password incorrect');
                                        break;
                                    case 200:
                                        res.json().then(data => {
                                            console.log(data);
                                            navigation.navigate('Home', {
                                                userData: data
                                            });
                                        });
                                        break;
                                    default:
                                        alert('Something went wrong');
                                        break;
                                }
                            }
                            )})
                        break;
                    default:
                        alert('Something went wrong');
                        break;
                }
            })
        //navigation.navigate('Home');
    }

    

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        //console.warn("A date has been picked: ", date);
        setBirthday(date);
        hideDatePicker();
    };

  return (
    <KeyboardAvoidingView style={styles.container} behavior='padding'>
      <ImageBackground
        source={background}
        style={styles.background}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Register</Text>
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Full Name"
                        placeholderTextColor="rgba(255,255,255,0.7)"
                        value={name}
                        onChangeText={text => setName(text)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        placeholderTextColor="rgba(255,255,255,0.7)"
                        value={email}
                        onChangeText={text => setEmail(text)}

                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        placeholderTextColor="rgba(255,255,255,0.7)"
                        value={password}
                        onChangeText={text => setPassword(text)}
                        secureTextEntry
                    />
                    <View style={styles.dateContainer}>
                        <Text style={styles.dateText}>Birthday</Text>
                        <View style={styles.datePicker}>
                            <TouchableOpacity
                                onPress={showDatePicker}
                                style={styles.chooseButton}>
                                <Text
                                    style={styles.chosenDateText}>
                                    {birthday === null ? 'Choose Birthday'
                                        : birthday.toLocaleDateString('en-us', {year: 'numeric', month: 'long', day: 'numeric' })}
                                </Text>
                            </TouchableOpacity>
                            <DateTimePickerModal
                                isVisible={isDatePickerVisible}
                                mode="date"
                                onConfirm={handleConfirm}
                                onCancel={hideDatePicker}
                            />
                        </View>
                    </View>
                </View>
                <View style={styles.buttonsContainer}>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Login')}
                            style={styles.backButton}
                        >
                            <Text style={styles.backButtonText}>Back</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            onPress={handleRegister}
                            style={styles.button}
                        >
                            <Text style={styles.buttonText}>Register</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </TouchableWithoutFeedback>
      </ImageBackground>
    </KeyboardAvoidingView>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({
    background: {
        width: '100%',
        height: '100%',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputContainer: {
        width: '80%',
    },
    input: {
        paddingHorizontal: 15,
        paddingVertical: 18,
        borderRadius: 10,
        marginTop: 25,
        borderWidth: 2,
        fontSize: 15,
        borderColor: 'rgba(255,255,255,0.7)',
        color: 'rgb(255,255,255)',
    },
    titleContainer: {
        marginTop: 125,
        width: '80%',
        borderRadius: 10,
        backgroundColor: 'gray',
        opacity: 0.8,
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    title: {
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    buttonContainer: {
        width: '60%',
        marginTop: 40,
        marginBottom: 40,
    },
    button: {
        width: '80%',
        borderWidth: 2,
        borderColor: 'rgba(255,255,255,0.7)',
        borderRadius: 10,
        paddingVertical: 15,
    },
    backButton: {
        width: '50%',
        borderWidth: 2,
        borderColor: 'rgba(255,255,255,0.7)',
        borderRadius: 10,
        paddingVertical: 15,
    },
    buttonText: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 20,
        color: 'rgb(255,255,255)',
    },
    backButtonText: {
        textAlign: 'center',
        fontSize: 20,
        color: 'rgb(255,255,255)',
    },
    datePicker: {
        width: '60%',

    },
    dateContainer: {
        width: '100%',
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    dateText: {
        color: 'rgba(255,255,255,0.7)',
        fontSize: 15,
        width: '40%',
    },
    chosenDateText: {
        color: 'rgb(255,255,255)',
        fontSize: 15,
        textAlign: 'center',
    },
    chooseButton: {
        width: '100%',
        color: 'rgb(255,255,255)',
        borderWidth: 2,
        borderColor: 'rgba(255,255,255,0.7)',
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 15,
    },
    buttonsContainer: {
        flex: 1,
        width: '70%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
})


