import { useState } from 'react';
import { TextInput, View, StyleSheet, Alert } from 'react-native';

import PrimaryButton from '../components/ui/PrimaryButton';
import Title from '../components/ui/Title'
import Card from '../components/ui/Card'
import InstructionText from '../components/ui/InstructionText';
import Color from '../constants/colors'

function StartGameScreen({onPickNumber}) {

    //Nombre saisie
    const [enteredNumber, setEnteredNumber] = useState('');

    /**
     * Met a jour la valeur de enteredNumber en fonction du texte saisie
     * @param {*} enteredText 
     */
    function numberInputHandler(enteredText) {
        setEnteredNumber(enteredText);
    }

    /**
     * Reset le text saisie et l'affichage
     */
    function resetInputHandler() {
        setEnteredNumber('');
    }

    /**
     * Verifie que le nombre saisie est valide
     * @returns 
     */
    function confirmInputHandler() {
        const chosenNumber = parseInt(enteredNumber);
        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            Alert.alert(
            'Invalid number!',
            'Number has to be a number between 1 and 99.',
            [{ text: 'Okay', style: 'destructive', onPress: resetInputHandler }]
            );
            return;
        }
        onPickNumber(chosenNumber)
    }

  return (
    <View style={styles.rootContainer}>
      <Title>Guess my number</Title>
      <Card>
        <InstructionText style={styles.instuctionText}>Enter a number</InstructionText>
        <TextInput
          style={styles.numberInput}
          maxLength={2}
          keyboardType="number-pad"
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={numberInputHandler}
          value={enteredNumber}
        />
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={resetInputHandler}>Reset</PrimaryButton>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={confirmInputHandler}>Confirm</PrimaryButton>
          </View>
        </View>
      </Card>
    </View>
    
  );
}

export default StartGameScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    marginTop: 100,
    alignItems: 'center'
  },
  numberInput: {
    height: 50,
    width: 50,
    fontSize: 32,
    borderBottomColor: Color.accent500,
    borderBottomWidth: 2,
    color: Color.accent500,
    marginVertical: 8,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  buttonContainer: {
    flex: 1,
  },
});