import React, { Component } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    TouchableHighlight,
    View,
    TextInput,
    Text,
    Image,
    AsyncStorage,
    ScrollView,
    ActivityIndicator,
    Alert,
    Animated,
    Dimensions
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

Props = {};

const deviceWidth = Dimensions.get('window').width
const FIXED_BAR_WIDTH = 280
const BAR_SPACE = 10

class SuperPlayer extends Component<Props> {

  static navigationOptions={
    headerStyle: {
      backgroundColor: 'green'
    }
  };
  
    constructor(props) {
    super(props);
    
     this.state={ 
       index: Number,
       animVal: new Animated.Value(0),
       itemWidth: 0
    };
  };

  componentDidMount() {
    // this.carouselHandle(this.props.navigation.state.params.players);
    this.routeFunction(this.props.navigation.state.params.players);
  }

  routeFunction(val){
        var numItems = val.length;
            let itemWidth = (280 / numItems) - ((numItems - 1) * 10)
                this.setState({itemWidth: itemWidth});
  }

  checkAuth(match) {
    Alert.alert(
      'Not Logged in!',
      'Please sign up or log in to continue',
      [
        {text: 'Sign Up', onPress: () => this.props.navigation.navigate('Register', { entryFees: 25, match: this.props.navigation.state.params.match })},
        {text: 'Log In', onPress: () => this.props.navigation.navigate('Login', { entryFees: 25, match: this.props.navigation.state.params.match })},
      ],
      { cancelable: false }
    )
  }

  chooseSuper(value) {
    if(arguments[1] === 1) {
      this.refs.scrollView.scrollTo({ x: (( (value + 1) - 1 ) * deviceWidth ), y: 0, animated: true });
    }
    if(arguments[1] === 2) {
      this.refs.scrollView1.scrollTo({ x: (( (value + 1) - 1 ) * 50 ), y: 0, animated: true });
    }
    this.setState({ index: value })
  }

  imagesOnly(data) {
        return data.map((item, idx)=> {
          return (
            <View key= {idx} style= {{width: deviceWidth, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center'}}>
            <View key= {idx} style= {this.state.index === idx ? styles.dilemma1 : styles.dilemma}>
            <TouchableHighlight key= {idx} style= {this.state.index === idx ? styles.dilemma1 : styles.dilemma}
            onPress= {()=> this.chooseSuper(idx, 2)}>
              <Image key= {idx} source={{ uri: item.imageUrl }} style= {{width: 190, height: 190, borderRadius: 95, alignSelf: 'center', padding: 20}} resizeMode= 'cover' 
               />
            </TouchableHighlight>
            </View>
              <Text key= {idx} style= {{position: 'relative', fontSize: 18}}>
                {item.name}
              </Text>
              </View>
            )
        });
  }

  castPlayers(data) {
    return data.map((item, idx)=> {
          return (
            <View key= {idx} style= {{flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center'}}>
            <TouchableHighlight onPress= {()=> this.chooseSuper(idx, 1)}>
            <View key= {idx} style= {{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginHorizontal: 8}}>
              <Image key= {idx} source={{ uri: item.imageUrl }} style= {{width: 50, height: 50, borderRadius: 50, alignSelf: 'center'}} resizeMode= 'cover'
              />
              <Entypo name= "star" size= {20} color= "#ff9f1a" style= {this.state.index === idx ? styles.tag : styles.tag1} onPress= {()=> this.chooseSuper(idx)} />
            </View>
            </TouchableHighlight>
              <Text key= {idx} style= {{position: 'relative', fontSize: 8}}>
                {item.name}
              </Text>
              </View>
            )
        });
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

    render() {
      const match = this.props.navigation.state.params.match;
      const players = this.props.navigation.state.params.players;
        return (
          <View style= {{flex: 1, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', height: '100%'}}>
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

                <View style= {styles.headings}>
                  <Text>
                    Select your SuperPlayer for 2X Points
                  </Text>
                </View>

                <ScrollView ref= "scrollView" horizontal  showsHorizontalScrollIndicator= {false}>
                    {
                      this.imagesOnly(players)
                    }
                  </ScrollView>

                  
                  <View style= {{height: '25%', width: '100%', padding: 4, backgroundColor: 'gray', flexDirection:'column', justifyContent: 'space-between', alignItems: 'center', alignSelf: 'flex-end'}}>
                    <View style= {{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
                      <Text style={{alignSelf: 'flex-start', fontSize: 10}}>
                        Your Players
                      </Text>
                    </View>
                    <View style= {{height: '80%', width: '100%'}}>
                   <ScrollView ref= "scrollView1" horizontal showsHorizontalScrollIndicator={false}>
                      {
                        this.castPlayers(players)
                      }
                   </ScrollView>
                   </View>
                   <TouchableOpacity style= {styles.nextPageFinal} onPress={()=> this.checkAuth(match)}>
                    <Text style={{alignSelf: 'center', fontSize: 12}}>
                      Next
                    </Text>
                   </TouchableOpacity>
                  </View>
             </View>
    );
    }
}

const styles = StyleSheet.create({
    dilemma: {
      flexDirection: 'row', 
      justifyContent: 'center', 
      alignItems: 'center', 
      marginHorizontal: 40,
      width: 190,
      height: 190,
      backgroundColor: 'white',
      borderRadius: 95
    },
    dilemma1: {
      flexDirection: 'row', 
      justifyContent: 'center', 
      alignItems: 'center', 
      marginHorizontal: 40,
      width: 200,
      height: 200,
      borderRadius: 100,
      backgroundColor: '#ff9f1a'
    },
    track: {
      backgroundColor: '#ccc',
      overflow: 'hidden',
      height: 2,
    },
    innerContainer: {
      width: '100%',
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'flex-start',
      flexDirection: 'column',
      padding: 4,
      margin: 4
    },
    tag: {
      alignSelf: 'flex-start', 
      position: 'relative', 
      marginLeft: -8
    },
    tag1: {
      alignSelf: 'flex-start', 
      position: 'relative', 
      marginLeft: -8,
      opacity: 0
    },
    nextPage: {
      backgroundColor: '#32ff7e',
      width: '25%', 
      opacity: 0.4,
      alignItems: 'center', 
      marginTop: -14, 
      justifyContent: 'center', 
      flexDirection: 'column', 
      padding: 4
    },
    nextPageFinal: {
      backgroundColor: '#32ff7e',
      width: '25%', 
      opacity: 1,
      alignItems: 'center', 
      marginTop: -14, 
      justifyContent: 'center', 
      flexDirection: 'column', 
      padding: 4
    },
    barContainer: {
      position: 'absolute',
      zIndex: 2,
      top: 15,
      flexDirection: 'row',
       overflow: 'hidden',
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
    teamText: {
      fontSize: 18,
      alignSelf: 'center',
      fontWeight: 'bold',
      margin: 8
    },
    chooseText: {
      fontSize: 18,
      fontWeight: 'bold',
      margin: 1
    },
    chooseTextHead: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#ff9f43',
      margin: 8
    },
    headings: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 4,
    },
    scroll: {
      flex:1,
      width: '100%'
    },
    infinite: {
      width: '100%',
      height: 60,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#f1f2f6',
      margin: 4,
      paddingHorizontal: 14 
    },
    bar: {
      backgroundColor: '#5294d6',
      height: 2,
      position: 'absolute',
      left: 0,
      top: 0,
    },
    container: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }
});

export default SuperPlayer;