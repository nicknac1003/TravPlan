import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import React from 'react'

const TripDash = ({ route }) => {
    const tripData = route.params.tripData;
    const userData = route.params.userData;
  return (
    <SafeAreaView>
      <Text>{JSON.stringify(tripData)}</Text>
    </SafeAreaView>
  )
}

export default TripDash

const styles = StyleSheet.create({})