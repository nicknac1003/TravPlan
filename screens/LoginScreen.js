import { ImageBackground, StyleSheet, Text, View, KeyboardAvoidingView, TextInput, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import background from '../assets/images/background.png'
import { useNavigation } from '@react-navigation/native'
const LoginScreen = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    
    const navigation = useNavigation();

    const handleLogin = () => {
        //console.log(email, password);
        Keyboard.dismiss();
        fetch('https://us-central1-travplan-347915.cloudfunctions.net/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        .then(res=> {
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
                            user: data
                        });
                    });
                    break;
                default:
                    alert('Something went wrong');
                    break;
            }
        })
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
                    <Text style={styles.title}>Login</Text>
                </View>
                <View style={styles.inputContainer}>
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
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.resetPassword}>
                        <Text style={styles.resetText}>Forgot Password?</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    onPress={handleLogin}
                    style={styles.button}
                    >
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.signupContainer}>
                    <Text style={styles.signupText}>Don't have an account?</Text>
                    <TouchableOpacity
                    onPress={() => navigation.navigate('Register')}
                    >
                        <Text style={styles.signupButton}>Sign up</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('Swipes')}><Text>swpies</Text></TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>
        
      </ImageBackground>
    </KeyboardAvoidingView>
  )
}

export default LoginScreen

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
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'left',
    },
    buttonContainer: {
        width: '80%',
        marginTop: 20,
        marginBottom: 20,
        flexDirection: 'row',
    },
    button: {
        width: '40%',
        borderWidth: 2,
        borderColor: 'rgba(255,255,255,0.7)',
        borderRadius: 10,
        paddingVertical: 15,
        paddingHorizontal: 30,
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
    resetPassword: {
        flex: 1,
        width: '40%',
        justifyContent: 'center',
        alignItems: 'center',

    },
    resetText: {
        color: 'rgb(255,255,255)',
        fontSize: 15,
        textAlign: 'left',
        fontWeight: 'bold',
    },
})