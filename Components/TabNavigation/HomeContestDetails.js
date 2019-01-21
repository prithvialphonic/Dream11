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
    Alert,
    ActivityIndicator
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
const data = require('../../Dummy/Contest');
const player = require('../../Dummy/player');

Props = {};
class HomeContestDetails extends Component<Props> {

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
       squad: '',
       teamsquad1: [],
       teamsquad2: [],
       allPlayers: [],
       teamname2: '',
       teamname1: '',
    };
  };

  truncate(string) {
      if (string.length >= 10) return string.substring(0, 10) + '...';
      else return string;
  }

  componentWillMount() {
    fetch('http://13.127.217.102:8000/getMatchDetails?unique_id=73')
    .then((response)=> response.json())
    .then((res)=> {
      this.setState({ contestDTO: res.contestDTOs,
                      teamsquad1: res.squad[0].players,
                      teamsquad2: res.squad[1].players,
                      teamname1:  res.squad[0].name,
                      teamname2:  res.squad[1].name
      });
      this.happenBefore(this.state.teamsquad1, this.state.teamsquad2)
    });
  }

  ratioTeams() {
    var a = Object.assign(this.state.myPlayers);
    var team1 = [];
    var team2 = [];

    a.map((player, idx)=> {
      if(player.team === this.state.teamname1) {
        team1.push(player)
      }
      else{
        team2.push(player)
      }
    });

    return (<Text>{this.state.teamname1} - {team1.length} / {this.state.teamname2} - {team2.length}</Text>)
  }

  happenBefore(data, data2) {
    var a=[]
    var b=[]
    var c=[]
    a = Object.assign(data)
    c = Object.assign(data2)
    var a = Object.assign(data)
      for( var i in a) {
        // alert('aya')
        a[i]['team'] = this.state.teamname1
      }
      for( var i in c) {
        // alert('aya')
        c[i]['team'] = this.state.teamname2
      }
    b = a.concat(data2)
    this.setState({ allPlayers: b });
    // alert(JSON.stringify(b))
  }
  
  selectPlayer=(player, idx)=> {
    var e = Object.assign(this.state.myPlayers)
    let index = e.indexOf(player)
    var length = e.length
    if(length === 6) {
      Alert.alert(
        'Maximum Players Chosen!',
        'Limit is 6 players',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')}
        ],
        { cancelable: false }
      )
    }
    else {
      var count = 1
      if(length === 0) {
        e.push(player)
        count  = 2
      }
      if(index === -1 && count === 1) {
        e.push(player)
      }

      length = e.length;

      this.setState({ myPlayers: e, countPlayers: length });
    }

  }

  checkList(match) {
    if(this.state.myPlayers.length > 0 && this.state.myPlayers.length === 6) {
      this.props.navigation.navigate('SuperPlayer', { 
        players: this.state.myPlayers,
        match: match
      });   
    }
  }

  removePlayer(value) {
    var a = Object.assign(this.state.myPlayers);
    a.splice(value,1)
    var length = a.length;
    this.setState({ myPlayers: a, countPlayers: length });
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
    return data.map((item, idx)=> {
      return (
          <View key= {idx} style= {styles.infinite}>
            <Image key= {idx} source={{ uri: item.imageUrl }} style= {{width: 50, height: 50, borderRadius: 50, alignSelf: 'center'}} resizeMode= 'cover' />
            <View key= {idx} style= {{flexDirection: 'column', justifyContent: 'space-around', width: '35%'}}>
              <Text key= {idx} style= {{alignSelf: 'center'}}>
                {item.name}
              </Text>

              <Text key= {idx} style= {{alignSelf: 'center', padding: 4}}>
                {item.team}
              </Text>
            </View>
            <View key= {idx} style= {{width: '30%', alignItems: 'center', justifyContent: 'center'}}>
            <Entypo key= {idx} name= 'circle-with-plus' color= 'green' size= {28}  onPress= {()=> this.selectPlayer(item, idx)} />
            </View>
          </View>
        );
    });
  }

    render() {
      // alert(JSON.stringify(this.state.teamsquad1[0]));
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
                      {this.truncate(match.team1)}
                    </Text>
                    <Text style= {styles.teamText}>
                      Vs.
                    </Text>
                    <Text style= {styles.teamText}>
                      {this.truncate(match.team2)}
                    </Text>
                    <Entypo name= "flag" color= "red" size= {14} style= {{alignSelf: 'center'}} />
                  </View>
                  
                  <View style= {{flexDirection: 'row', justifyContent: 'space-around'}}>
                  <Entypo name= "clock" color= "red" size= {14} style= {{alignSelf: 'center'}} />
                  {/**<Text>{match.startTime}</Text>**/}
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
                      this.renderPlayers(this.state.allPlayers)
                    }
                  </ScrollView>

                  <View style= {{height: '25%', width: '100%', padding: 4, backgroundColor: 'gray', flexDirection:'column', justifyContent: 'space-between', alignItems: 'center', alignSelf: 'flex-end', bottom : 0, position: 'absolute'}}>
                    <View style= {{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
                      <Text style={{alignSelf: 'flex-start', fontSize: 10}}>
                        Your Players
                      </Text>
                      <Text style={{alignSelf: 'flex-start', fontSize: 10}}>
                        {this.ratioTeams()}
                      </Text>
                      <Text style={{alignSelf: 'center', fontSize: 10}}>
                        {this.state.countPlayers} / 6
                      </Text>
                    </View>
                    <View style= {{height: '80%', width: '100%'}}>
                   {
                    this.state.myPlayers.length === 0 ? (<Text style= {{ fontSize: 15, color: 'green', alignSelf: 'center' }}>Please choose players to display here!</Text>) : (
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            {
                              this.imagesOnly()
                            }
                        </ScrollView>
                      )
                   }
                   </View>
                   <TouchableOpacity style= {styles.nextPageFinal} onPress= {()=> this.checkList(match)}>
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

export default HomeContestDetails;