import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, TextInput, TouchableNativeFeedback } from 'react-native';

class Register extends Component {

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

  	signupUser() {
  		var request= {};
  		request['username']= this.state.mobile
  		request['email']= this.state.email
  		request['name']= this.state.user
  		request['password']= this.state.password
  		request['repeatPassword']= this.state.repeat_password

  		fetch(`http://13.127.217.102:8000/user/register?username=${request['username']}
  			&email=${request['email']}&repeatPassword=${request['repeatPassword']}&password=${request['password']}&name=${request['name']}`)
  		.then((res)=> res.json())
  		.then((response)=> {
  			if(response.message === 'success') {
  				this.props.navigation.navigate('Login');
  			}
  		});
  	}

	render() {
		return(
			<View style = {{flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', width: '100%',
              paddingVertical: 20, paddingHorizontal: 10}}>
              <TextInput
                style = {{width: '100%', color: '#373737',fontSize: 16}}
                underlineAndroidColor= 'green'
                placeholder='Username'
                placeholderTextColor= '#aaaeae'
                placeholderTextSize= {18}
                onChangeText={ (text)=> this.setState({username: text})}
              />

             <TextInput
                style = {{width: '100%', color: '#373737',fontSize: 16}}
                underlineAndroidColor= 'green'
                placeholder='Email'
                placeholderTextColor= '#aaaeae'
                placeholderTextSize= {18}
                onChangeText={ (text)=> this.setState({email: text})}
                keyboardType= 'email-address'
              />


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

              <TextInput
                style = {{width: '100%', color: '#373737',fontSize: 16}}
                underlineAndroidColor= 'green'
                placeholder='Confirm Password'
                placeholderTextColor= '#aaaeae'
                placeholderTextSize= {18}
                secureTextEntry={true}
                onChangeText={ (text)=> this.setState({repeat_password: text})}
              />

              <TouchableNativeFeedback onPress={()=> this.signupUser()}
               style= {{ width: '50%', height: 80, justifyContent: 'center', alignItems: 'center', padding: 4, elevation: 4, backgroundColor: 'green'}}>
               <View style= {{ width: '50%', height: 40, justifyContent: 'center', alignItems: 'center', padding: 4, elevation: 4, backgroundColor: 'green'}}>
              	<Text>
              		Sign Up Now!
              	</Text>
              	</View>
              </TouchableNativeFeedback>

              </View>
		);
	}
}

export default Register;