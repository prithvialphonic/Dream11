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
    ActivityIndicator,
    WebView
} from 'react-native';
import paytm from 'react-native-paytm';

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
       message:'',
       incomeMatch: {}
    };
  };

  componentDidMount= async()=> {
      try {
        const value = await AsyncStorage.getItem('@MySuperStore:key');
        if (value !== null) {
            this.props.navigation.navigate('indexOfTab');
        }
       } catch (error) {
            alert('Not auth Token');
       }
  }

  someFunc() {
    var request= {}
    request['pgName'] = "paytm";
    request['source'] = "android";
    request['amount'] = 190;
    request['authToken'] = "8fb7ef13-74cd-426f-8356-d32e2d701b17";

    fetch('http://13.127.217.102:8000/payment/initiatePayment',{
    method: 'POST',
    headers: {
    'Access-Control-Allow-Credentials': true,
    'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
    })
    .then((res)=> res.json())
    .then((responseJson)=> {
    this.setState({ incomeMatch: responseJson.params });
    // alert(JSON.stringify(this.state.incomeMatch));
    var a = []
    a = Object.assign(this.state.incomeMatch)
    // this.call(a);
    //                 matchArray: responseJson.matches });
    });
  }

  call(a) {
    var paytmdetails = {
      mid: a.MID,
      industryType: a.INDUSTRY_TYPE_ID, //Prod
      website: a.WEBSITE, //prod
      channel: 'WEB',
      amount: a.TXN_AMOUNT,
      orderId: a.ORDER_ID,
      email: a.EMAIL,
      phone: a.MOBILE_NO,
      custId: 'cust121',
      checksumhash: a.CHECKSUMHASH,
      callback: a.CALLBACK_URL,
      mode:'Staging',
    }     
    // alert(JSON.stringify(a))
    
    paytm.startPayment(paytmdetails);
  }

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
                <TouchableOpacity style={styles.submitButton} onPress= {()=> this.props.navigation.navigate('Register')}>
                    <Text style={styles.submitButtonText}>Sign Up</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.submitButton} onPress= {()=> this.props.navigation.navigate('Login')}>
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