import { ImageBackground, StyleSheet, Text, View, KeyboardAvoidingView, TextInput, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import background from '../assets/images/background.png'
const RegisterScreen = () => {
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    
    const navigation = useNavigation();

    const handleRegister = () => {
        console.log(name, email, password);
        /**
         * TODO:
         * register user to database
         * sign in user
         * navigate to home screen
         */
        navigation.navigate('Home');
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
                    <Text style={styles.signupText}>have an account?</Text>
                    <TouchableOpacity
                    onPress={() => navigation.navigate('Login')}
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
        marginTop: 300,
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
    },
    button: {
        width: '42%',
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
})


