import React, { Component } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    View,
    TextInput,
    ProgressBarAndroid,
    Text,
    Image,
    AsyncStorage,
    ScrollView,
    ActivityIndicator
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
const data = require('../Dummy/Contest');
const player = require('../Dummy/player');

Props = {};
class ContestDetails extends Component<Props> {

  static navigationOptions={
    headerStyle: {
      backgroundColor: 'green'
    }
  };
  
    constructor(props) {
    super(props);
    
     this.state={ 
       enough: false,
       dataTemp:'',
       ready:true,
       myPlayers: [],
       data: {},
       countPlayers: 0,
       squad: ''
    };
  };

  componentDidMount() {
    var request = {}
    request['unique_id'] = 73;   
    fetch('http://13.127.217.102:8000/getMatchDetails?unique_id=73', {
      method: 'POST',
      headers: {
        'Access-Control-Allow-Credentials': true,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request)
    })
    .then((response)=> response.json())
    .then((responseJson)=> {
      this.setState({ data: responseJson });
      this.setState({ squad: responseJson.squad[0] });
    });
  }
  
  selectPlayer=(player)=> {
    var myPlayers= []
    if(this.state.countPlayers >= 6) {
      alert('Limit Up!')
    }

    else {
      var len = this.state.myPlayers.length + 1
      if(this.state.myPlayers.length < 1) {
        myPlayers.push(player);
        this.setState({ myPlayers: myPlayers });
      }

      else {
        for(var i=0; i < this.state.myPlayers.length; i++) {
          if(player.pid == this.state.myPlayers[i].pid) {
            // alert('idhar');
            break;
          }
          else {
            myPlayers = player
          // alert('hii');
          }

        }
          // alert(JSON.stringify(myPlayers));
          this.setState(prevState => ({
            myPlayers: [ ...prevState.myPlayers, myPlayers ]
          }));
          this.setState({ countPlayers: this.state.myPlayers.length + 1})
      }
    }

  }

  removePlayer(value) {
    var a = Object.assign(this.state.myPlayers);
    a.splice(value,1)
    this.setState({ myPlayers: a})
  }

  imagesOnly() {
        return this.state.myPlayers.map((item, idx)=> {
          return (
            <View key= {idx} style= {{flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center'}}>
            <View key= {idx} style= {{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginHorizontal: 8}}>
              <Image key= {idx} source={{ uri: item.imageUrl }} style= {{width: 50, height: 50, borderRadius: 50, alignSelf: 'center'}} resizeMode= 'cover' />
              <Entypo key= {idx} name= 'circle-with-minus' size= {18} color= 'red' style= {{ alignSelf: 'flex-start', position: 'relative', marginLeft: -8}}
                onPress= {()=> this.removePlayer(idx)} />
            </View>
              <Text key= {idx} style= {{position: 'relative', fontSize: 8}}>
                {item.name}
              </Text>
              </View>
            )
        });
  }

  renderPlayers(data) {
    return player.default.map((item, idx)=> {
      return (
          <View key= {idx} style= {styles.infinite}>
            <Image key= {idx} source={{ uri: item.imageUrl }} style= {{width: 50, height: 50, borderRadius: 50, alignSelf: 'center'}} resizeMode= 'cover' />
            <View key= {idx} style= {{flexDirection: 'column', justifyContent: 'space-around', width: '35%'}}>
              <Text key= {idx} style= {{alignSelf: 'center'}}>
                {item.name}
              </Text>

              <Text key= {idx} style= {{alignSelf: 'center', padding: 4}}>
                {item.playingRole}
              </Text>
            </View>
            <View key= {idx} style= {{width: '30%', alignItems: 'center', justifyContent: 'center'}}>
            <Entypo key= {idx} name= 'circle-with-plus' color= 'green' size= {22}  onPress= {()=> this.selectPlayer(item)} />
            </View>
          </View>
        );
    });
  }

    render() {
      alert(JSON.stringify(this.state.squad.name));
      const dif = data.default.contestDTOs[1].totalCount - data.default.contestDTOs[1].playingCount
      const match = this.props.navigation.state.params.data;
      let total = data.default.contestDTOs[1].totalCount
      let playing = data.default.contestDTOs[1].playingCount
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
                  <Text>{match.startTime}</Text>
                  </View>
                  </View>
                </View>

                <View style= {styles.headings}>
                  <Text>
                    Info
                  </Text>

                  <Text>
                    Player
                  </Text>

                  <Text>
                    Points
                  </Text>
                </View>

                <ScrollView showsVerticalScrollIndicator= {false}>
                    {
                      this.renderPlayers(data)
                    }
                  </ScrollView>

                  <View style= {{height: '25%', width: '100%', padding: 4, backgroundColor: 'gray', flexDirection:'column', justifyContent: 'space-between', alignItems: 'center', alignSelf: 'flex-end'}}>
                    <View style= {{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
                      <Text style={{alignSelf: 'flex-start', fontSize: 10}}>
                        Your Players
                      </Text>
                      <Text style={{alignSelf: 'center', fontSize: 10}}>
                        {this.state.countPlayers} / 6
                      </Text>
                    </View>
                    <View style= {{height: '80%', width: '100%'}}>
                   <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                      {
                        this.imagesOnly()
                      }
                   </ScrollView>
                   </View>
                   <TouchableOpacity style= {styles.nextPageFinal} onPress= {()=> this.props.navigation.navigate('SuperPlayer', { 
                    players: this.state.myPlayers,
                    match: match
                  })}>
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
    innerContainer: {
      width: '100%',
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'flex-start',
      flexDirection: 'column',
      padding: 4,
      margin: 4
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
    }
});

export default ContestDetails;