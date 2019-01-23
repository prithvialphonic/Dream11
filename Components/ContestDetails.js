import React, { Component } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    TouchableHighlight,
    View,
    TextInput,
    ProgressBarAndroid,
    Text,
    Image,
    ImageBackground,
    AsyncStorage,
    ScrollView,
    Alert,
    ActivityIndicator,
    Modal,
    FlatList,
    Dimensions
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
const data = require('../Dummy/Contest');
const player = require('../Dummy/player');

Props = {};
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
class ContestDetails extends Component<Props> {

  static navigationOptions={
    header: null
  };
  
    constructor(props) {
    super(props);
    
     this.state={ 
       tab: true,
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
       previewVisible: false
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

  keyExtractor= (item, index) => item._id;

  checkList(match) {
    if(this.state.myPlayers.length > 0 && this.state.myPlayers.length === 6) {
      this.props.navigation.navigate('SuperPlayer', { 
        players: this.state.myPlayers,
        match: match
      });   
    }
  }

  renderGridItem(data) {
      return (
            <View style= {{flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginVertical: 10, marginHorizontal: 30, marginTop: 50}}>
              <Image source= {{ uri: data.imageUrl}} style= {{ width: 50, height: 50, borderRadius: 25 }} />
              <Text style= {{ color: 'white', fontSize: 14}}>
                {data.name}
              </Text>
            </View>
        );
    }

  removePlayer(value) {
    var a = Object.assign(this.state.myPlayers);
    a.splice(value,1)
    var length = a.length;
    this.setState({ myPlayers: a, countPlayers: length });
  }

  removePlayerMain(value) {
    var a = Object.assign(this.state.myPlayers);
    let index = a.indexOf(value)
    a.splice(index, 1)
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

  checkInListPlayer(player, idx) {
    var e = Object.assign(this.state.myPlayers)
    let index = e.indexOf(player)
    if(index === -1) {
      return (<Entypo key= {idx} name= 'circle-with-plus' color= 'green' size= {28}  onPress= {()=> this.selectPlayer(player, idx)} />)
    }
    else {
      return (<Entypo key= {idx} name= 'circle-with-minus' color= 'red' size= {28}  onPress= {()=> this.removePlayerMain(player)} />)
    }
  }

  renderPlayers(data) {
    let team = []
    if(this.state.tab) {
      team = this.state.teamsquad1
    } 
    else {
      team = this.state.teamsquad2
    }
    var e = Object.assign(this.state.myPlayers)

    return team.map((item, idx)=> {
      return (
          <View key= {idx} style= {e.indexOf(item) === -1 ? styles.infinite : styles.infiniteDelect}>
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
              {this.checkInListPlayer(item, idx)}
            </View>
            
          </View>
        );
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
      // alert(JSON.stringify(this.state.teamsquad1[0]));
      const dif = data.default.contestDTOs[1].totalCount - data.default.contestDTOs[1].playingCount
      const match = this.props.navigation.state.params.data;
      let total = data.default.contestDTOs[1].totalCount
      let playing = data.default.contestDTOs[1].playingCount
        return (
             <View style= {{flex: 1, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', height: '100%'}}>
                 <View style= {styles.innerContainer}>
                  <View style= {styles.headerView}>
                  <View style= {{flexDirection: 'row', width: '100%', justifyContent: 'space-between', alignItems: 'center'}}>
                    <AntDesign name= "arrowleft" color= 'black' size= {24}
                      onPress= {()=> this.props.navigation.goBack()}
                    />
                    <View style= {{justifyContent: 'flex-start', alignItems: 'center', left: 0}}>
                      <Text style= {{marginRight: 10}}>{match.type}</Text>
                    </View>
                  </View>

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
                  <Text>{this.secondsToString(match.startTime)}</Text>
                  </View>
                  </View>
                </View>

                  <View style= {{flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white', width: '100%', padding: 4}}>
                    <Text style= {{fontSize: 16, fontStyle: 'bold', borderRadius: 14, elevation: 4, padding: 10}}>
                      Contest 0 - 5 Overs
                    </Text>

                  <View style= {{width: '100%', justifyContent: 'center', alignItems: 'center'}}>

                    <View style= {{flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginHorizontal: 10}}>
                      <Text style= {{alignSelf: 'center', fontSize: 12}}>
                        Prize Money
                      </Text>
                      <Text style= {{alignSelf: 'center', fontSize: 12, color: '#44bd32'}}>
                        {data.default.contestDTOs[1].totalPrize} 
                      </Text>
                    </View>

                    
                    </View>

                    <ProgressBarAndroid
                         style= {{width: '80%'}}
                      styleAttr="Horizontal"
                      indeterminate={false}
                      progress={playing / total}
                    />

                    <View style= {{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
                      <Text style= {{alignSelf: 'flex-start', fontSize: 8}}>
                      {dif} spots left!
                      </Text>

                      <Text style= {{alignSelf: 'flex-end', fontSize: 8}}>
                        {total} Teams
                      </Text>
                  </View>                           
                      
                  </View>

                  <View style= {styles.pickerView}>
                  <TouchableOpacity onPress= {()=> this.setState({ tab: true })} 
                    style= {!this.state.tab ? styles.tabButtonDown : styles.tabButton}> 
                    <Text>             
                      {this.state.teamname1}
                    </Text>             
                  </TouchableOpacity>

                  <TouchableOpacity onPress= {()=> this.setState({ tab: false })} 
                    style= {this.state.tab ? styles.tabButtonDown : styles.tabButton}>              
                    <Text>             
                      {this.state.teamname2}
                    </Text>
                  </TouchableOpacity>              
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

                  {
                    this.state.myPlayers.length === 0 ? (
                      <View style= {{ width: '100%', height: 20, backgroundColor: 'gray', justifyContent: 'center', alignItems: 'center', padding: 4}}>
                        <Text style={{alignSelf: 'flex-start', fontSize: 12}}>
                          Selected Players will be shown here!
                        </Text>
                      </View>) :
                      (<View style= {{height: '22%', width: '100%', padding: 2, backgroundColor: 'gray', flexDirection:'column', justifyContent: 'space-between', alignItems: 'center', alignSelf: 'flex-end', bottom : 0, position: 'absolute'}}>
                    <View style= {{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
                      <Text style={{alignSelf: 'flex-start', fontSize: 12}}>
                        Your Players
                      </Text>
                      <Text style={{alignSelf: 'flex-start', fontSize: 12}}>
                        {this.ratioTeams()}
                      </Text>
                      <Text style={{alignSelf: 'center', fontSize: 12}}>
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

                   {

                    this.state.myPlayers.length === 6 ? 
                    (
                    <View style= {{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', width: '60%'}}>
                      <TouchableOpacity 
                        onPress= {()=> this.setState({ previewVisible: true })}
                        style= {{width: 80, height: 20, marginTop: -14, backgroundColor: '#44bd32', borderRadius: 10}}>
                        <Text style={{alignSelf: 'center', fontSize: 12}}>
                          Preview
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity style= {styles.nextPageFinalActive} onPress= {()=> this.checkList(match)}>
                        <Text style={{alignSelf: 'center', fontSize: 12}}>
                          Next
                        </Text>
                      </TouchableOpacity>
                      </View>
                    ) : 
                    (
                    <View style= {{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', width: '60%'}}>
                      <TouchableOpacity 
                        onPress= {()=> this.setState({ previewVisible: true })}
                        style= {{width: 80, height: 20, marginTop: -14, backgroundColor: '#44bd32', borderRadius: 10}}>
                        <Text style={{alignSelf: 'center', fontSize: 12}}>
                          Preview
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity style= {styles.nextPageFinal}>
                        <Text style={{alignSelf: 'center', fontSize: 12}}>
                          Next
                        </Text>
                      </TouchableOpacity>
                      </View>
                    )
                     
                   }
                  </View>)

                  }

                  <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.previewVisible}
                    >
                      <View 
                        style= {{flex: 1, width: width, height: height, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                        
                        <ImageBackground
                          style= {{ width: width, height: height}}
                          resizeMode= 'cover'
                          source= { require('../Images/gr.png') }
                        >
                          <View style= {{ justifyContent: 'center', alignItems: 'center'}}>
                          <FlatList 
                          style= {{ marginTop: 50}}
                              data={this.state.myPlayers}
                              numColumns= {2}
                              keyExtractor= {this.keyExtractor}
                              renderItem={({item}) => this.renderGridItem(item)}
                          />
                          </View>
                        <TouchableHighlight
                          style= {{position: 'absolute', bottom: 0, left: width / 2 - 40, justifyContent: 'center', alignItems: 'center', width: 80, height: 80, borderRadius: 40, backgroundColor: 'red'}}
                          onPress={() => {
                            this.setState({ previewVisible: false })
                          }}>
                          <Text>Back</Text>
                        </TouchableHighlight>
                        </ImageBackground>
                    </View>
                  </Modal>

             </View>
    );
    }
}

const styles = StyleSheet.create({
    grid: {
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        flex: 1,
    },
    gridItem: {
        margin:5,
        width: 150,
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
    },
    gridItemImage: {
        width: 100,
        height: 100,
        borderWidth: 1.5, 
        borderColor: 'white',
        borderRadius: 50,
    },
    gridItemText: {
        marginTop: 5,
        textAlign:'center',
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
      backgroundColor: '#636e72',
      width: '25%', 
      height: 20,
      opacity: 1,
      alignItems: 'center', 
      marginTop: -14, 
      justifyContent: 'center', 
      flexDirection: 'column', 
      padding: 4
    },
    nextPageFinalActive: {
      backgroundColor: '#32ff7e',
      width: '25%', 
      height: 20,
      opacity: 1,
      alignItems: 'center', 
      marginTop: -14, 
      justifyContent: 'center', 
      flexDirection: 'column', 
      padding: 4
    },
    headerView: {
      padding: 2,
      width: '100%',
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
      width: '98%',
      height: 60,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#f1f2f6',
      margin: 4,
      paddingHorizontal: 14 
    },
    infiniteDelect: {
      width: '98%',
      height: 60,
      borderWidth: 2,
      borderColor: 'green',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#f1f2f6',
      margin: 4,
      paddingHorizontal: 14 
    },
    pickerView: {
      flexDirection: 'row',
      justifyContent: 'center',
      width: '100%',
      alignItems: 'center'
    },
    tabButton: { 
      width: '50%', 
      height: 40, 
      padding: 4, 
      elevation: 4, 
      backgroundColor: '#7bed9f', 
      justifyContent: 'center', 
      alignItems: 'center'
    },
    tabButtonDown: {
      width: '50%', 
      height: 40, 
      padding: 4, 
      elevation: 4, 
      backgroundColor: '#dcdde1', 
      justifyContent: 'center', 
      alignItems: 'center'
    },
});

export default ContestDetails;