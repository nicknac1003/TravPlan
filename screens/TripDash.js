import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native'
import React from 'react'
import { useUser } from '../hooks/UserProvider';
const TripDash = ({ route, navigation }) => {
    const {user, trip} = useUser()
    //const navigation = useNavigation();
  return (
    <SafeAreaView>
        {/* header */}
        <View style={styles.header}>
            <TouchableOpacity style={styles.HomeButton}onPress={()=>{navigation.navigate('Home')}}>
                <Text style={styles.HomeButtonText}>Back to Trips</Text>
            </TouchableOpacity>
        </View>  
        <View>
            <Text style={styles.tripName}>{trip.tripName}</Text>
        </View>
        
    </SafeAreaView>
  )
}

export default TripDash

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '27%',
        padding: 10,
    },
    HomeButton: {
        backgroundColor: '#FF9D9D',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },
    HomeButtonText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    tripName: {
        fontSize: 30,
        fontWeight: '200',
        marginBottom: 30,
        textAlign: 'center',
    },
})