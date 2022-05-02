import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import SwipeScreen from './screens/SwipeScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const swipesRef = useRef(null)

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{headerShown: false}} name='Login' component={LoginScreen}/>
        <Stack.Screen options={{headerShown: false}} name='Register' component={RegisterScreen}/>
        <Stack.Screen options={{headerShown: false}} name='Home' component={HomeScreen}/>
        <Stack.Screen options={{headerShown: false}} name='SwipeScreen' component={SwipeScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );

//   function handleLike() {
//     console.log('like')
//     nextUser()
//   }

//   function handlePass() {
//     console.log('pass')
//     nextUser()
//   }

//   function nextUser() {
//     const nextIndex = users.length - 2 === currentIndex ? 0 : currentIndex + 1
//     setCurrentIndex(nextIndex)
//   }


//   return (
//     <View style={styles.container}>
//       <View style={styles.swipes}>
//           <SwipeScreen
//             ref={swipesRef}
//             currentIndex={currentIndex}
//             users={users}
//             handleLike={handleLike}
//             handlePass={handlePass}
//           ></SwipeScreen>
              
//       </View>
//     </View>
//   )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
