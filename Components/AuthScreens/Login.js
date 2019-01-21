import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, TextInput, TouchableNativeFeedback, AsyncStorage } from 'react-native';

class Login extends Component {

	static navigationOptions={
	    headerStyle: {
	      backgroundColor: 'green'
	    }
  	};

  	constructor(props) {
  		super(props);
  		this.state= {
  			mobile: '',
        password: '',
  		};
  	}

  	loginUser = async () => {
  		var request= {};
  		request['username']= this.state.mobile
      request['password']= this.state.password
  		request['repeatPassword']= this.state.repeat_password

  		fetch(`http://13.127.217.102:8000/user/applogin?mobile=${request['username']}
  			&password=${request['password']}`)
  		.then((res)=> res.json())
  		.then((response)=> {
        alert(JSON.stringify(response))
  			this.setData(response.authToken)
  		});
  	}

    setData= async(auth)=> {
          try {
            await AsyncStorage.setItem('@MySuperStore:key', auth);
            if(this.props.navigation.state.params.entryFees > 0) {
              this.props.navigation.navigate('Wallet', {entryFees: this.props.navigation.state.params.entryFees, match: this.props.navigation.state.params.match});
            }
            else {
              this.props.navigation.navigate('indexOfTab');
            }
            // alert('ko');
          } catch (error) {
            alert('ko');
          }
    }

    fetchit= async()=> {
      try {
        const value = await AsyncStorage.getItem('@MySuperStore:key');
        if (value !== null) {
            // alert(JSON.stringify(value));
        }
       } catch (error) {
            alert('kopas');
       }
    }

	render() {
		return(
			<View style = {{flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', width: '100%',
              paddingVertical: 20, paddingHorizontal: 10}}>

              <TextInput
                style = {{width: '100%', color: '#373737',fontSize: 16}}
                underlineAndroidColor= 'green'
                placeholder='Mobile No.'
                placeholderTextColor= '#aaaeae'
                placeholderTextSize= {18}
                onChangeText={ (text)=> this.setState({mobile: text})}
              />

              <TextInput
                style = {{width: '100%', color: '#373737',fontSize: 16}}
                underlineAndroidColor= 'green'
                placeholder='Password'
                placeholderTextColor= '#aaaeae'
                placeholderTextSize= {18}
                secureTextEntry={true}
                onChangeText={ (text)=> this.setState({password: text})}
              />

              <TouchableNativeFeedback onPress={()=> this.loginUser()}
               style= {{ width: '50%', height: 80, justifyContent: 'center', alignItems: 'center', padding: 4, elevation: 4, backgroundColor: 'green'}}>
               <View style= {{ width: '50%', height: 40, justifyContent: 'center', alignItems: 'center', padding: 4, elevation: 4, backgroundColor: 'green'}}>
              	<Text>
              		Login Now!
              	</Text>
              	</View>
              </TouchableNativeFeedback>

              </View>
		);
	}
}

export default Login;