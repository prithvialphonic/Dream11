import React, { Component } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    View,
    TextInput,
    Text,
    Image,
    AsyncStorage,
    ScrollView,
    ActivityIndicator
} from 'react-native';

Props = {};
class Welcome extends Component<Props> {

  static navigationOptions={
    header: null
  };
  
    constructor(props) {
    super(props);
    
     this.state={ 
       email:null,
       password:null,
       dataTemp:'',
       ready:true,
       message:''       
    };
  };

    render() {
        return (
          <View style={{flex:1, justifyContent: 'space-around', backgroundColor: 'white', flexDirection: 'column', width: '100%', alignItems: 'center'}}>       
                <Image style={styles.imageTop} resizeMode= "contain"
                    source={require('../Images/wc.png')}/>

                <TouchableOpacity style={styles.submitButtonPlay}
                  onPress= {()=> this.props.navigation.navigate('MainScreen')}
                >
                    <Text style={styles.submitButtonTextPlay}>Let's Play</Text>
                </TouchableOpacity>

            <View style= {styles.lowerLogin}>                  
                <TouchableOpacity style={styles.submitButton}>
                    <Text style={styles.submitButtonText}>Sign Up</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.submitButton}>
                    <Text style={styles.submitButtonText}>Login</Text>
                </TouchableOpacity>
            </View>                  
        </View>
    );
    }
}

const styles = StyleSheet.create({
    innerContainer: {
        flex : 1,
        backgroundColor: 'red',
    },
    overlayView: {
      width: '94%',
      height: '96%',
      padding: 10,
      marginTop: 10,
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: '#00000070',
      borderRadius: 4,
      justifyContent: 'space-around'
    },
    lowerLogin: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    submitButtonPlay: { 
      padding: 10, 
      backgroundColor: 'red', 
      width : 100,
      height: 100,
      elevation : 4,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 50
    },
    submitButton: {
      margin: 10,
      backgroundColor: 'white', 
      width : '45%',
      height: 40,
      elevation : 2,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 4
    },
    submitButtonText: { 
      color: 'red', 
      fontWeight: 'bold', 
      textAlign: 'center'
    },
    submitButtonTextPlay: { 
      color: 'white', 
      fontWeight: 'bold', 
      textAlign: 'center'
    },
    imageTop : {
      width : 200, 
      height : 300 , 
      marginTop : '1%',
    },
    forgetButtonText: { 
      color: '#3f6ab4', 
      fontWeight: 'bold', 
      textAlign: 'center',
      marginTop : 5 
    },
    signUpButtonText: { 
      color: 'white', 
      alignSelf: 'center', 
      fontWeight: 'bold', 
      textAlign: 'center', 
      marginTop: 25 
    }
});

export default Welcome;