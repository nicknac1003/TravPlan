import React, { useState } from 'react'
import { StyleSheet, Image, Text } from 'react-native'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import { RectButton } from 'react-native-gesture-handler'
import SwipeableImage from './SwipeableImage'
import abg from '../assets/abg.jpg'
import sv from '../assets/sv.jpg'

function SwipeScreen({ currentIndex, handleLike, handlePass, swipesRef}) {
  const [willLike, setWillLike] = useState(false)
  const [willPass, setWillPass] = useState(false)
  const users = [{"name":"Atlanta Botanical Gardens","rating":"4.8"}, {"name":"SkyView Atlanta","rating":"4.0"}, {"name":"Hawks Game","rating":"4.6"}, {"name":"Ponce City Market","rating":"4.6"}, {"name":"Georgia Aquarium","rating":"4.6"}, {"name":"Braves Game","rating":"4.2"}, {"name":"Picnic at Piedmont Park","rating":"4.8"}]
  var currentIndex= 0

  function handleLike() {
    console.log('like')
    nextUser()
  }

  function handlePass() {
    console.log('pass')
    nextUser()
  }

  function nextUser() {
    const nextIndex = users.length - 2 === currentIndex ? 0 : currentIndex + 1
    currentIndex = nextIndex
  }

  function handleLikePress() {
    swipesRef.current.openLeft()
  }
  function handlePassPress() {
    swipesRef.current.openRight()
  }

  const renderLeftActions = () => {
    return (
      <RectButton style={styles.container}>
        <SwipeableImage user={users[currentIndex + 1]} currentIndex = {currentIndex+1} willLike={willLike} willPass={willPass}></SwipeableImage>
      </RectButton>
    )
  }

  const renderRightActions = () => {
    return (
      <RectButton style={styles.container}>
        <SwipeableImage user={users[currentIndex + 1]} currentIndex = {currentIndex+1} willLike={willLike} willPass={willPass}></SwipeableImage>
      </RectButton>
    )
  }

  // const str = images[currentIndex]

  return (
    //<Text>{str}</Text>
    <Swipeable
      ref={swipesRef}
      friction={2}
      leftThreshold={40}
      rightThreshold={40}
      renderLeftActions={renderLeftActions}
      renderRightActions={renderRightActions}
      onSwipeableLeftOpen={() => {
        setWillLike(false)
        handleLike()
      }}
      onSwipeableRightOpen={() => {
        setWillPass(false)
        handlePass()
      }}
      onSwipeableLeftWillOpen={() => setWillLike(true)}
      onSwipeableRightWillOpen={() => setWillPass(true)}
    >
      <SwipeableImage user={users[currentIndex]} currentIndex = {currentIndex} willLike={willLike} willPass={willPass} />
    </Swipeable>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default React.forwardRef((props, ref) => <SwipeScreen swipesRef={ref} {...props}></SwipeScreen>)
