import {
    ImageBackground,
    StyleSheet,
    Text,
    View,
    KeyboardAvoidingView,
    TextInput,
    TouchableOpacity,
    Keyboard,
    TouchableWithoutFeedback,
    Platform
} from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import background from '../assets/images/background.png'
import DateTimePicker from '@react-native-community/datetimepicker';
const RegisterScreen = () => {
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [birthday, setBirthday] = React.useState(new Date());
    const [showDatePicker, setShowDatePicker] = React.useState(false);

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
    const onChange = (e, date) => {
        setShowDatePicker(Platform.OS === 'ios');
        setBirthday(date);
    }

  return (
    <KeyboardAvoidingView style={styles.container} behavior='padding'>
      <ImageBackground
        source={background}
        style={styles.background}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Glad to have you!</Text>
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
                    <View style={styles.input}>
                        <TouchableOpacity
                            onPress={() => setShowDatePicker(true)}
                        >
                            <Text style={styles.dateText}>Set birthday...</Text>
                        </TouchableOpacity>
                        {showDatePicker ? <DateTimePicker
                            mode="date"
                            value={birthday}
                            is24Hour={true}
                            onChange={onChange}
                            style={styles.datePicker}
                        /> : null}
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                    onPress={handleRegister}
                    style={styles.button}
                    >
                        <Text style={styles.buttonText}>Register</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.signupContainer}>
                    <Text style={styles.signupText}>Have an account?</Text>
                    <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    >
                        <Text style={styles.signupButton}>Log in</Text>
                    </TouchableOpacity>
                </View>
            </View>
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
        marginTop: 200,
        width: '80%',
    },
    title: {
        color: 'black',
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'left',
    },
    buttonContainer: {
        width: '80%',
        marginTop: 20,
        marginBottom: 20,
    },
    button: {
        width: '50%',
        borderWidth: 2,
        borderColor: 'rgba(255,255,255,0.7)',
        borderRadius: 10,
        paddingVertical: 15,
        paddingHorizontal: 30,
        marginLeft: 'auto',
        right: 0,
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 20,
        color: 'rgb(255,255,255)',
    },
    signupContainer: {
        marginTop: 20,
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    signupText: {
        color: 'rgba(255,255,255,0.7)',
        fontSize: 15,
        textAlign: 'left',
    },
    signupButton: {
        color: 'rgb(255,255,255)',
        fontSize: 15,
        textAlign: 'left',
        fontWeight: 'bold',
        textDecorationLine: 'underline',
    },
    datePicker: {
        width: '50%',
        borderWidth: 2,
        borderColor: 'rgba(255,255,255,0.7)',
        borderRadius: 10,
    },
    dateContainer: {
        width: '80%',
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    dateText: {
        color: 'rgba(255,255,255,0.7)',
        fontSize: 15,
        //width: '40%',
    },

})


