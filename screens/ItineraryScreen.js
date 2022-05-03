import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native'
import React from 'react'
import { useUser } from '../hooks/UserProvider';
const ItineraryScreen = ({ route, navigation }) => {
  const { user, trip } = useUser();
  const tripStart = new Date(trip.tripDateStart._seconds * 1000);

  const _getString = (date) => {
    let diff = tripStart.getTime() - Date.now();
    let days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days > 0){
      return `${days} days away`;
    } else if (days === 0){
      return `Today`;
    } else if (days === 1){
      return `Tomorrow`;
    } else {
      return `${-days} days ago`;
    }
  }
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.topContainer}>
        {/*<Text>{JSON.stringify(trip)}</Text>*/}
        <View style={styles.dateContainer}>
          <View style={styles.dateNumericContainer}>
            <Text style={styles.dateNumericText}>{tripStart.toLocaleString('en-us', {  day: 'numeric' })}</Text>
          </View>
          <View style={styles.dateWordContainer}>
            <Text style={styles.dateShortText}>{tripStart.toLocaleString('en-us', {  weekday: 'short' })}</Text>
            <Text style={styles.myText}>{`${tripStart.toLocaleString('en-us', {  month: 'short' })} ${tripStart.getFullYear()}`}</Text>
          </View>
        </View>
        <View style={styles.iconContainer}>
          <Text style={styles.iconText}>{_getString(tripStart)}</Text>
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.carousel}>

        </View>
        <ScrollView>

        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

export default ItineraryScreen

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#faf9f9',
  },
  topContainer: {
    height: '20%',
    flex: 1,
    flexDirection: 'row',
  },
  bottomContainer: {
    height: '85%',
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 32,
  },
  iconContainer: {
    width: '50%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  iconText: {
    backgroundColor: '#e9f4ef',
    color: '#4bc292',
    fontSize: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
    overflow: 'hidden',
  },
  dateContainer: {
    width: '50%',
    height: '100%',
    flex: 1,
    flexDirection: 'row',
  },
  dateNumericContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    width: '50%',
    height: '100%',
  },
  dateWordContainer: {
    justifyContent: 'center',
    width: '50%',
    height: '100%',
  },
  dateNumericText: {
    fontSize: 50,
    color: 'black',
  },
  dateShortText: {
    color: '#A3A6AB',
  },
  myText: {
    color: '#A3A6AB',
  }
})