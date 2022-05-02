import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import SwipeScreen from './screens/SwipeScreen';
import CreateTrip from './screens/CreateTrip';
import TripDash from './screens/TripDash';
const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        
        <Stack.Screen options={{headerShown: false}} name='Login' component={LoginScreen}/>
        <Stack.Screen options={{headerShown: false}} name='Register' component={RegisterScreen}/>
        <Stack.Screen options={{headerShown: false}} name='Home' component={HomeScreen}/>
        <Stack.Screen options={{headerShown: false}} name='CreateTrip' component={CreateTrip}/>
        <Stack.Screen name='Swipes' component={SwipeScreen}/>
        <Stack.Screen name='TripDash' component={TripDash}/>
      </Stack.Navigator>
    </NavigationContainer>
  );



}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
