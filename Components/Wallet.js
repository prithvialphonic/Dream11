import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, TextInput, TouchableNativeFeedback } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

class Wallet extends Component {

	static navigationOptions={
	    headerStyle: {
	      backgroundColor: 'green'
	    }
  	};

  	constructor(props) {
  		super(props);
  		this.state= {
  			mobile: '',
  			user: '',
  			password: '',
  			repeat_password: '',
  			email: ''
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

	render() {
    const match = this.props.navigation.state.params.match;
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
                  onPress= {()=> this.go()}
                  style= {{ width: '50%', justifyContent: 'center', alignItems: 'center', height: 40, borderRadius: 10, backgroundColor: 'green'}}>
                    <Text>
                      Pay!
                    </Text>
                  </TouchableNativeFeedback>

              </View>
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