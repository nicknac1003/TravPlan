import React from 'react'
import { View, Image, StyleSheet, Text } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import abg from '../assets/abg.jpg'
import sv from '../assets/sv.jpg'

export default function SwipeableImage({ user, currentIndex, willLike, willPass }) {
  
  var images = [abg, sv]
  var image = images[currentIndex]
  return (
    <View>
      <Image source={ image } style={styles.photo} />
      {willLike && (
        <View style={styles.likeBox}>
          <Text style={{ ...styles.textPrimary, color: '#64EDCC' }}>LIKE</Text>
        </View>
      )}
      {willPass && (
        <View style={styles.passBox}>
          <Text style={{ ...styles.textPrimary, color: '#F06795' }}>NOPE</Text>
        </View>
      )}
      <View style={styles.textContainer}>
        <View style={styles.textRow}>
          <Text style={[styles.textPrimary, styles.textShadow]}>{user.name}</Text>
          <Text style={[styles.textSecondary, styles.textShadow]}>{user.rating}</Text>
        </View>
      </View>
    </View>
  )
}

const boxStyle = {
  position: 'absolute',
  top: '50%',
  paddingTop: 10,
  paddingBottom: 10,
  paddingLeft: 20,
  paddingRight: 20,
  borderWidth: 3,
  borderRadius: 10,
}

const styles = StyleSheet.create({
  likeBox: {
    ...boxStyle,
    left: 40,
    borderColor: '#64EDCC',
  },
  passBox: {
    ...boxStyle,
    right: 40,
    borderColor: '#F06795',
  },
  photo: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
    borderRadius: 20,
  },
  textContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
  },
  textRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textPrimary: {
    color: 'white',
    fontSize: 35,
    fontWeight: 'bold',
  },
  textSecondary: {
    color: 'white',
    marginLeft: 10,
    fontSize: 25,
  },
  textShadow: {
    textShadowColor: 'rgba(0, 0, 0, 0.80)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
})