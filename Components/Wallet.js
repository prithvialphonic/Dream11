import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, TextInput, TouchableNativeFeedback, WebView } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const myWallet = 50;
class Wallet extends Component {

	static navigationOptions={
	    headerStyle: {
	      backgroundColor: 'green'
	    }
  	};

  	constructor(props) {
  		super(props);
  		this.state= {
  			bool: false,
			updated: false
  		};
  	}

  secondsToString( timeRemaining ) {
    // timeRemaining = timeRemaining / 1000000
    var date = String(new Date(timeRemaining));
    return date;
    // alert(date)
    // return (setInterval(()=> {
    //       this.calculate(timeRemaining)
    //     }, 1000));
  }

  go() {
    alert('here')
  }

  handleResponse(data) {
    // alert(JSON.stringify(data.title));
    if(data.title === 'TXN_SUCCESS') {
      this.setState({ bool : false, updated: true });
      alert('done')
    }
    
    else if (data.title === 'TXN_FAILURE') {
      alert('FAILURE')
    }

    else if (data.title === 'PENDING') {
      alert('PENDING')
    }
  }

  allOf() {
    this.setState({ bool: true });
  }

	render() {
    const match = this.props.navigation.state.params.match;
    if(!this.state.bool) {
		return(
			<View style = {{flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', width: '100%',
              paddingVertical: 20, paddingHorizontal: 10}}>
              
              <View style= {styles.innerContainer}>
                  <View style= {styles.headerView}>
                    <Text>{match.type}</Text>

                    <View style= {{flexDirection: 'row', justifyContent: 'space-around'}}>
                  <Entypo name= "flag" color= "red" size= {14} style= {{alignSelf: 'center'}} />
                    <Text style= {styles.teamText}>
                      {match.team1}
                    </Text>
                    <Text style= {styles.teamText}>
                      Vs.
                    </Text>
                    <Text style= {styles.teamText}>
                      {match.team2}
                    </Text>
                    <Entypo name= "flag" color= "red" size= {14} style= {{alignSelf: 'center'}} />
                  </View>
                  
                  <View style= {{flexDirection: 'row', justifyContent: 'space-around'}}>
                  <Entypo name= "clock" color= "red" size= {14} style= {{alignSelf: 'center'}} />
                  <Text>{this.secondsToString(match.startTime)}</Text>
                  </View>
                  </View>
                </View>

                <View style= {styles.headerView}>
                  <Text>
                    Pay {this.props.navigation.state.params.entryFees} to join
                  </Text>
                </View>
                  <TouchableNativeFeedback 
                  onPress= {()=> this.allOf()}
                  style= {{ width: 100, justifyContent: 'center', alignItems: 'center', height: 30, borderRadius: 4, backgroundColor: 'green', elevation: 4}}>
                    <Text style= {{alignSelf: 'center'}} >
                      Pay!
                    </Text>
                  </TouchableNativeFeedback>

		{
			this.state.updated ? (<View style= {{flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center', backgroundColor: '#00000040'}}>
					      	<Text>UpdatedBalance: </Text>
					      	<Text>{myWallet + 100.00}</Text>
					      </View>) : null
		}
              </View>
		);
  }

    if(this.state.bool)
    return(
      <WebView 
                    source= {{ uri: 'http://13.127.217.102:8000/payment/initiatePaymentWeb?source=android&pgName=paytm&amount=100.00&authToken=8fb7ef13-74cd-426f-8356-d32e2d701b17' }}
                    onNavigationStateChange = {(data) => this.handleResponse(data)}
                  />
    );
	}
}

const styles = StyleSheet.create({
  innerContainer: {
      width: '100%',
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'flex-start',
      flexDirection: 'column',
      padding: 4,
      margin: 4
    },
headerView: {
      borderBottomWidth: 2,
      padding: 6,
      borderTopWidth: 0,
      borderRightWidth: 0,
      borderLeftWidth: 0,
      width: '98%',
      borderColor: 'green',
      elevation: 4,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'  
    },
teamText: {
      fontSize: 18,
      alignSelf: 'center',
      fontWeight: 'bold',
      margin: 8
    },
  });

export default Wallet;
