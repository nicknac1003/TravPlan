import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
//screens
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';

import CreateTrip from './screens/CreateTrip';
import TripDash from './screens/TripDash';

//TabNavigator
import SwipeScreen from './screens/SwipeScreen';
import ExploreScreen from './screens/ExploreScreen';
import ItineraryScreen from './screens/ItineraryScreen';
import PreferencesScreen from './screens/PreferencesScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const _headerShown = (route) => {
  const routeName = getFocusedRouteNameFromRoute(route)
  return routeName === 'Dashboard'
}

const TripContainer = (props) => {
    return (
      <Tab.Navigator
        initialRouteName={'Dashboard'}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === 'Dashboard') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (rn === 'Settings') {
              iconName = focused ? 'settings' : 'settings-outline';
            } else if (rn === 'Explore') {
              iconName = focused ? 'airplane' : 'airplane-outline';
            } else if (rn === 'Itinerary') {
              iconName = focused ? 'list' : 'list-outline';
            } else if (rn === 'Swipes') {
              iconName = focused ? 'swap-horizontal' : 'swap-horizontal-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          headerShown: false,
        })}
      >
        <Tab.Screen name={'Dashboard'} component={TripDash} />
        <Tab.Screen name={'Explore'} component={ExploreScreen} />
        <Tab.Screen name={'Itinerary'} component={ItineraryScreen} />
        <Tab.Screen name={'Swipes'} component={SwipeScreen} />
        <Tab.Screen name={'Settings'} component={PreferencesScreen} />
        {/*<Tab.Screen name={'Preferences'} components={PreferencesScreen} />*/}
        
      </Tab.Navigator>
    )
}

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        
        <Stack.Screen options={{headerShown: false}} name='Login' component={LoginScreen}/>
        <Stack.Screen options={{headerShown: false}} name='Register' component={RegisterScreen}/>
        <Stack.Screen options={{headerShown: false}} name='Home' component={HomeScreen}/>
        <Stack.Screen options={{headerShown: false}} name='CreateTrip' component={CreateTrip}/>
        <Stack.Screen options={{headerShown: false}} name='Trip' component={TripContainer}/>
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
