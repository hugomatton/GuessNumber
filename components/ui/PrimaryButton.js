import {View, Text, Pressable, StyleSheet} from 'react-native'

import Colors from '../../constants/colors'

//props children --> ce que l'on met entre les balises
function PrimaryButton({children, onPress}){

    function pressHandler(){
        onPress()
    }

    return(
        <View style={styles.buttonOuterContainer}>
            <Pressable 
                //on peut combiner les tyles avec une array
                style={({pressed}) => 
                    pressed 
                    ? [styles.pressed, styles.buttonInnerContainer] 
                    : styles.buttonInnerContainer} 
                onPress={pressHandler} 
                android_ripple={{color: Colors.primary600}}>
                <Text style={styles.buttonText}>{children}</Text>
            </Pressable>
        </View>
    )
}

export default PrimaryButton

const styles = StyleSheet.create({
    buttonOuterContainer: {
        borderRadius: 28,
        margin: 4,
        overflow: 'hidden' //Ce qui sort du container est caché
    },
    buttonInnerContainer : {
        backgroundColor: Colors.primary500,
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    buttonText: {
        color : 'white',
        textAlign: 'center'
    },
    pressed: {
        opacity: 0.75
    }
})