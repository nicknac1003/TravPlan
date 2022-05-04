import React, { useState, useEffect, useRef } from 'react'
import {StyleSheet, Image, Text, SafeAreaView, View, ImageBackground, Platform} from 'react-native'
import abg from '../assets/SwipeImgs/abg.jpg'
import sv from '../assets/SwipeImgs/sv.jpg'
import h from '../assets/SwipeImgs/hawks.jpg'
import pcm from '../assets/SwipeImgs/pcm.jpg'
import ga from '../assets/SwipeImgs/ga.jpeg'
import b from '../assets/SwipeImgs/Braves.jpg'
import ppp from '../assets/SwipeImgs/ppp.jpg'
import Swiper from 'react-native-deck-swiper'
import { LinearGradient } from 'expo-linear-gradient';
import { Entypo, AntDesign } from '@expo/vector-icons'; 
import { TouchableOpacity } from 'react-native-gesture-handler'

function SwipeScreen({ routes, navigation}) {
  const data = [
    {
      name:"Atlanta Botanical Gardens",
      rating:"4.8",
      image: abg,
      id: 1,
    }, 
    {
      name:"SkyView Atlanta",
      rating:"4.0",
      image: sv,
      id: 2,
    }, 
    {
      name:"Hawks Game",
      rating:"4.6",
      image: h,
      id: 3,
    }, 
    {
      name:"Ponce City Market",
      rating:"4.6",
      image: pcm,
      id: 4,
    }, 
    {
      name:"Georgia Aquarium",
      rating:"4.6",
      image: ga,
      id: 5,
    }, 
    {
      name:"Braves Game",
      rating:"4.2",
      image: b,
      id: 6,
    }, 
    {
      name:"Picnic at Piedmont Park",
      rating:"4.8",
      image: ppp,
      id: 7,
    }]
    const [places, setPlaces] = useState([]);
    const swipeRef = useRef(null);

    useEffect(() => {
      setPlaces([...data]);
    }, [])

    const handlePass = (data) => {
      if (data)
        console.log(`PASS ${data.name}`)
    }

    const handleLike = (data) => {
      if (data)
        console.log(`LIKE ${data.name}`)
    }

    return (

      <SafeAreaView style={styles.container}>

        <View style={styles.swipeContainer}>
          <Swiper cards={places}
            ref={swipeRef}
            useViewOverflow={Platform.OS === 'ios'}
            containerStyle={{ backgroundColor: 'transparent'}}
            stackSize={3}
            stackSeparation={0}
            cardIndex={0}
            animateCardOpacity
            onSwipedLeft={(currentIndex) => handlePass(data[currentIndex])}
            onSwipedRight={(currentIndex) => handleLike(data[currentIndex])}
            onSwipedAll={() => setPlaces([])}
            verticalSwipe={false}
            overlayLabels={{
              left: {
                title: 'NOPE',
                  style: {
                    label: {

                      color: 'red',
                      marginLeft: 'auto',
                      right: 0,
                      width: '38%',
                      borderWidth: 4,
                      borderColor: 'red',
                      padding: 2,
                      margin: 10,
                    },
                  },
                },
                right: {
                title: 'LIKE',
                  style: {
                    label: {
                      color: '#4DED30',
                      borderWidth: 4,
                      borderColor: '#4DED30',
                      width: '38%',
                      paddingVertical: 2,
                      paddingHorizontal: 2,
                      marginLeft: 10,
                      marginTop: 10,
                    },
                  },
                },
            }}
            renderCard={(card) => (card) ? (
              <View key={card.id} style={styles.cardContainer}>
                <ImageBackground
                  source={card.image}
                  style={styles.cardImage}
                >
                  <LinearGradient
                    // Background Linear Gradient
                    colors={['transparent', 'rgba(0,0,0,0.6)']}
                    style={styles.darken}
                  />
                  <View style={styles.cardTextContainer}>
                    <Text style={styles.cardName}>{card.name}</Text>
                    <View style={styles.ratingContainer}>
                      <Entypo name="star" size={20} color="white" />
                      <Text style={styles.cardRating}>{card.rating}</Text>
                    </View>
                    
                  </View>
                </ImageBackground>
              </View>
            ) : (
              <View style={styles.endCardContainer}>
                <Text style={styles.endCardText}>No More Places</Text>
                <Image
                  style={{height: 80, width: '100%'}}
                  width={100}
                  height={100}
                  source={{uri: "https://links.papareact.com/6gb"}}
                  
                />
              </View>
            )}
          />

        </View>
        <View style={styles.buttonContainer}>
          <View
              style={styles.noButton}>
            <Text>Dislike</Text>
          </View>
          <View
              style={styles.yesButton}>
            <Text>Like</Text>
          </View>
        </View>
      </SafeAreaView>

    )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  swipeContainer: {
    flex: 1,
    marginTop: -6,
  },
  cardContainer: {
    backgroundColor: 'red',
    height: '75%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  cardTextContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    position: 'absolute',
    bottom: 0,
    marginHorizontal: 20,
    marginVertical: 20,
  },
  cardName: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
  },
  cardRating: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    paddingLeft: 5,
  },
  darken: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  ratingContainer: {
    flexDirection: 'row',
  },
  endCardContainer: {
    position: 'relative',
    backgroundColor: 'white',
    height: '75%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  endCardText: {
    color: 'black',
    fontWeight: 'bold',
    paddingBottom: 5,
  },
  buttonContainer: {
    height: '10%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 40,
  },
  noButton: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    width: 70,
    height: 70,
    backgroundColor: '#fecaca',
  },
  yesButton: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    width: 70,
    height: 70,
    backgroundColor: '#bbf7d0',
  }
})

export default SwipeScreen
