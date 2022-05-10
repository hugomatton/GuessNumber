import { useState } from 'react';
import { StyleSheet, ImageBackground, SafeAreaView} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading'

import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen'
import GameOverScreen from './screens/GameOverScreen';

import Color from './constants/colors'

export default function App() {

  const [userNumber, setUserNumber] = useState()
  const [gameIsOver, setGameIsOver] = useState(true)
  const [guessRounds, setGuessRounds] = useState(0)

  const [fontsLoaded] = useFonts({ //Boolean indiquan si la font est chargée ou non
    'open-sans':require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold':require('./assets/fonts/OpenSans-Bold.ttf'),
  })

  function pickedNumberHandler(pickedNumber){
    setUserNumber(pickedNumber)
    setGameIsOver(false)
  }

  function gameOverHandler(numberOfRounds){
    setGameIsOver(true)
    setGuessRounds(numberOfRounds)
  }

  function startNewGameHandler(){
    setUserNumber(null)
    setGuessRounds(0)
  }

  if(!fontsLoaded){
    return <AppLoading/>
  }

  //Variable qui contient le screen que l'on affiche
  let screen = <StartGameScreen onPickNumber={pickedNumberHandler}/>

  //Si un nombre est choisi alors l'écran affiché est l'écran de jeu
  if(userNumber){
    screen = <GameScreen onGameOver={gameOverHandler} userNumber={userNumber}/>
  }

  if(gameIsOver && userNumber){
    screen = <GameOverScreen 
                userNumber={userNumber} 
                roundsNumber={guessRounds} 
                onStartNewGame={startNewGameHandler}
              />
  }

  return (
    <LinearGradient colors={[Color.primary700, Color.accent500]} style={styles.rootScreen}>
      <ImageBackground 
        source={require('./assets/images/background.png')} 
        resizeMode='cover'
        style={styles.rootScreen}
        imageStyle={styles.backgroundImage}
      >
        <SafeAreaView style={styles.rootScreen}>
          {screen}
        </SafeAreaView>
      </ImageBackground>
    </LinearGradient>
    
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1
  },
  backgroundImage: {
    opacity: 0.15
  }
});
