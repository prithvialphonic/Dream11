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
    Modal,
    Dimensions,
    Picker
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';


var widthD = Dimensions.get('window').width;
var heightD = Dimensions.get('window').height;
let h_ = heightD / 2

Props = {};
class My_Leagues extends Component<Props> {

  static navigationOptions={
    headerVisible: false,
    headerStyle: {
      backgroundColor: 'green'
    }
  };

  constructor(props) {
    super(props);
     this.state={ 
        sport: 'Cricket',
        ahem: 'Select Sport',
        trigger: true,
        tab: true,
        currentPage: 1,
        incomeMatch: {},
        matchArray: []
     };
  };

  componentWillMount() {
    // var paytmdetails = {
    //   generationUrl: "http://13.127.217.102:8000/payment/initiatePayment",
    //   validationUrl: "http://13.127.217.102:8000/paymnet/paytmResponse",
    //   mid: "Powerp53888329068377", // Prod
    //   industryType: "Retail", //Prod
    //   website: "APPSTAGING", //prod
    //   channel: "WAP",
    //   amount: "5",
    //   orderId: "bd81545637220384",
    //   requestType: "DEFAULT",
    //   email: "arpitshukla2013@gmail.com",
    //   phone: "7777777777",
    //   theme: null,
    //   custId: "9988344556",
    // }
    // paytm.startPayment(paytmdetails);
    var d
    var request= {}
        request['start'] = 0;
        request['maxResults'] = 25;

    fetch('http://13.127.217.102:8000/getFutureMatches',{
  method: 'POST',
  headers: {
    'Access-Control-Allow-Credentials': true,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(request),
})
    .then((res)=> res.json())
    .then((responseJson)=> {
      this.setState({ incomeMatch: responseJson,
                      matchArray: responseJson.matches });
    });
  }

  goThrough() {
    this.props.navigation.navigate('MainScreen');
  }

  secondsToString( millisecond ) {
    let seconds= millisecond / 1000000
    var day, hour, minute, sec;
    day = Math.floor(seconds / 86400);
    let h = seconds % 86400
    hour = Math.floor(h / 3600)
    let m = h % 3600
    minute = Math.floor(m / 60)
    // alert(sec)
    return (' ' +day+ ' days ' + hour+ ' hours ' + minute + ' minutes ' );
  }

    render() {
      // var a = this.state.incomeMatch.matches
      // alert(JSON.stringify(this.state.incomeMatch));
        return (
          <View style={{flex:1, backgroundColor: 'white', flexDirection: 'column', width: '100%', alignItems: 'center'}}>       
          <View style= {styles.innerContainer}>
            <View style= {styles.pickerView}>
              <TouchableOpacity onPress= {()=> this.setState({ tab: true })} 
                style= {!this.state.tab ? styles.tabButtonDown : styles.tabButton}> 
                <Text>             
                  Cricketer
                </Text>             
              </TouchableOpacity>

              <TouchableOpacity onPress= {()=> this.setState({ tab: false })} 
                style= {this.state.tab ? styles.tabButtonDown : styles.tabButton}>              
                <Text>             
                  Football
                </Text>
              </TouchableOpacity>              
            </View>

            </View>

               
        </View>
    );
  }
}

const styles = StyleSheet.create({
    innerContainer: {
        flex : 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modelHandle: {
      backgroundColor: '#f1f2f6',
      justifyContent: 'center',
      alignItems: 'center',
      height: 200,
      width: '60%'
    },
    matchView: {
      width: '100%',
      height: '25%',
      borderColor: 'red',
      borderWidth: 2,
      borderRadius: 2,
    },
    submitButtonText: { 
      color: 'red', 
      fontWeight: 'bold', 
      textAlign: 'center'
    },
    submitButton: {
      margin: 10,
      backgroundColor: 'white', 
      width : '60%',
      height: 50,
      elevation : 2,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 4
    },
    touchMatch: {
      width: widthD - 40,
      height: 140,
      justifyContent: 'space-around',
      alignItems: 'center',
      borderColor: 'red',
      borderWidth: 2,
      borderRadius: 2,
      backgroundColor: 'white',
      margin: 5
    },
    teamText: {
      fontSize: 18,
      alignSelf: 'center',
      fontWeight: 'bold',
      margin: 8
    },
    scrollView: {
      flex: 1,
      width: '100%',
      height: '25%'
    },
    matchRenderer: {
      justifyContent: 'center',
      alignItems: 'center',
      width: '98%'
    },
    pickerView: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
    },
    picker: {
      width: '80%',
      borderColor: 'red',
      borderWidth: 2,
      height: 50,
    },
    tabButton: { 
      width: '35%', 
      height: 40, 
      padding: 4, 
      borderRadius: 4, 
      margin: 4, 
      elevation: 4, 
      backgroundColor: '#2ecc71', 
      justifyContent: 'center', 
      alignItems: 'center'
    },
    tabButtonDown: {
      width: '35%', 
      height: 40, 
      padding: 4, 
      borderRadius: 4, 
      margin: 4, 
      elevation: 4, 
      backgroundColor: '#dcdde1', 
      justifyContent: 'center', 
      alignItems: 'center'
    }
});

export default My_Leagues;