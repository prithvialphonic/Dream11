import React, { Component } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    View,
    TextInput,
    Text,
    ProgressBarAndroid,
    Image,
    AsyncStorage,
    ScrollView,
    Dimensions,
    ActivityIndicator,
    Modal,
    TouchableHighlight
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
const data = require('../Dummy/Contest');

Props = {};

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
class Contests extends Component<Props> {

  static navigationOptions={
    headerStyle: {
      backgroundColor: 'green'
    }
  };
  
    constructor(props) {
    super(props);
    
     this.state={ 
        contestDTO: '',
        teamsquad1: '',
        teamsquad2: '',
        teamname2: '',
        teamname1: '',
        smallContest: [],
        bigContest: [],
        modalVisible: false,
        winningBreakup: []
    };
    this.contestInaam= {
      name: '0 - 5 Overs',
      spotsLeft: 975,
      prize: 25000,
      winners: 10000,
      fees: 25,
      totalteams: 1000
    }
    this.renderModalContent = this.renderModalContent.bind(this);
  };

  renderModalContent(data) {
    return data.map((item, idx)=> {
      return (<View key={idx}
                style= {{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 1, borderColor: 'gray', width: '90%', height: 50, borderRadius: 10, backgroundColor: '#f5f6fa', marginBottom: 10, padding: 4, elevation: 4}}>
                  <Text key={idx}>
                    {item.rankString}
                  </Text>
                  <Text key={idx}>
                    {item.winningAmount}
                  </Text>
              </View>)
    })
    alert(JSON.stringify(data))
  }

  componentWillMount() {
    var request = {}
    request['contestId'] = 6
    fetch('http://13.127.217.102:8000/getWinningBreakUp', {
      method: 'POST',
            headers: {
                'Access-Control-Allow-Credentials': true,
                'Content-Type': 'application/json',
            },
      body: JSON.stringify(request)
    })
    .then((response)=> response.json())
    .then((res)=> {
      this.setState({ winningBreakup: res.distributionDTO });
      // alert(JSON.stringify(this.state.winningBreakup[0]));
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

  truncate(string) {
      if (string.length >= 10) return string.substring(0, 10) + '...';
      else return string;
  }

    render() {
      const match = this.props.navigation.state.params.data;
      const dif = data.default.contestDTOs[1].totalCount - data.default.contestDTOs[1].playingCount
      let total = data.default.contestDTOs[1].totalCount
      let playing = data.default.contestDTOs[1].playingCount
      // alert(JSON.stringify(this.state.winningBreakup));
        return (
             <ScrollView showsVerticalScrollIndicator= {false}>
              <View style={{flex:1, justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>       

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
                  <Text>{this.secondsToString(match.startTime)}</Text>
                  </View>
                  </View>
                </View>

                  <Text style= {{ fontSize: 18, alignSelf: 'center', margin: 4}}>
                      Choose from below contests to PLAY!
                  </Text>


                  <View style= {{flexDirection: 'row', padding: 2, justifyContent: 'space-around', borderWidth: 1, borderColor: '#ff9f43', width: '90%', elevation: 2}}>
                    <Entypo name= "arrow-bold-right" size= {20} color= "red" style= {{alignSelf: 'center'}} />
                    <View style= {{ flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center'}}>
                      <Text style= {styles.chooseTextHead}>
                        SHORT CONTESTS TO PLAY
                      </Text>

                      <Text style= {styles.chooseTextHead}>
                        Quick & Win BIG!
                      </Text>
                    </View>
                  </View>

                  <View style= {{flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', width: '100%', padding: 4}}>
                  <View style= {{flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', borderWidth: 2, backgroundColor: 'white', borderColor: 'green', width: '98%', padding: 4, margin: 4}}>
                    <Text style= {{fontSize: 16, fontStyle: 'bold'}}>
                      0 - 5 Overs
                    </Text>

                  <View style= {{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>

                    <View style= {{flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginHorizontal: 10}}>
                      <Text style= {{alignSelf: 'center', fontSize: 12}}>
                        Prize Money
                      </Text>
                      <Text style= {{alignSelf: 'center', fontSize: 12, color: '#44bd32'}}>
                        {data.default.contestDTOs[1].totalPrize} 
                      </Text>
                    </View>

                    <View style= {{flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginHorizontal: 10}}>
                      
                      <Text style= {{alignSelf: 'center', fontSize: 12}}>
                        Winners
                      </Text>
                      <Text 
                        onPress= {()=> this.setState({ modalVisible: true })}
                        style= {{alignSelf: 'center', fontSize: 12, color: '#44bd32'}}>
                          10,000 
                        <Entypo 
                          onPress= {()=> this.setState({ modalVisible: true })}
                          name= "chevron-small-up" size= {20} color= 'gray' style= {{ alignSelf: 'center'}} />
                      </Text>
                    </View>

                    <View style= {{flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginHorizontal: 10}}>
                      
                      <Text style= {{alignSelf: 'center', fontSize: 12}}>
                        Entry Fees
                      </Text>
                      <View style= {{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
                      <FontAwesome5 name= "rupee-sign" size= {14} color="green" />
                      <Text style= {{alignSelf: 'center', fontSize: 12, color: '#44bd32'}}>
                        {data.default.contestDTOs[1].entryFees} 
                      </Text>
                      </View>
                    </View>

                      <TouchableOpacity 
                        onPress= {()=>this.props.navigation.navigate('ContestDetails', {data: match, contestname: this.contestInaam})}
                        style= {{justifyContent: 'center', alignItems: 'center', width: 80, height: 40, backgroundColor: '#44bd32', borderRadius: 18, margin: 2, padding: 2, elevation: 4}}>
                        <Text>Join Now !
                        </Text>
                      </TouchableOpacity>
                    
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
                  </View>


                  <View style= {{flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#F8EFBA', width: '94%', padding: 8}}>
                  <View style= {{flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', borderWidth: 2, backgroundColor: 'white', borderColor: 'green', width: '100%', padding: 10, margin: 10}}>
                    <Text style= {{fontSize: 16, fontStyle: 'bold'}}>
                    5 - 10 Overs
                    </Text>

                  <View style= {{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>

                    <View style= {{flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginHorizontal: 10}}>
                      <Text style= {{alignSelf: 'center', fontSize: 12}}>
                        Prize Money
                      </Text>
                      <Text style= {{alignSelf: 'center', fontSize: 12, color: '#44bd32'}}>
                        {data.default.contestDTOs[1].totalPrize} 
                      </Text>
                    </View>

                    <View style= {{flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginHorizontal: 10}}>
                      
                      <Text style= {{alignSelf: 'center', fontSize: 12}}>
                        Winners
                      </Text>
                      <Text style= {{alignSelf: 'center', fontSize: 12, color: '#44bd32'}}>
                        10,000 
                      </Text>
                    </View>

                    <View style= {{flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginHorizontal: 10}}>
                      
                      <Text style= {{alignSelf: 'center', fontSize: 12}}>
                        Entry Fees
                      </Text>
                      <View style= {{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
                      <FontAwesome5 name= "rupee-sign" size= {14} color="green" />
                      <Text style= {{alignSelf: 'center', fontSize: 12, color: '#44bd32'}}>
                        {data.default.contestDTOs[1].entryFees} 
                      </Text>
                      </View>
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

                  <TouchableOpacity style= {{justifyContent: 'center', alignItems: 'center', width: '50%', height: 30, backgroundColor: '#44bd32', borderRadius: 4, margin: 2, padding: 2, elevation: 4}}>
                    <Text>Join Now !
                    </Text>
                  </TouchableOpacity>
                      
                  </View>
                  </View>


                  <View style= {{flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#F8EFBA', width: '94%', padding: 8}}>
                  <View style= {{flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', borderWidth: 2, backgroundColor: 'white', borderColor: 'green', width: '93%', padding: 10, margin: 10}}>
                    <Text style= {{fontSize: 16, fontStyle: 'bold'}}>
                      10 - 15 Overs
                    </Text>

                  <View style= {{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>

                    <View style= {{flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginHorizontal: 10}}>
                      <Text style= {{alignSelf: 'center', fontSize: 12}}>
                        Prize Money
                      </Text>
                      <Text style= {{alignSelf: 'center', fontSize: 12, color: '#44bd32'}}>
                        {data.default.contestDTOs[1].totalPrize} 
                      </Text>
                    </View>

                    <View style= {{flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginHorizontal: 10}}>
                      
                      <Text style= {{alignSelf: 'center', fontSize: 12}}>
                        Winners
                      </Text>
                      <Text style= {{alignSelf: 'center', fontSize: 12, color: '#44bd32'}}>
                        10,000 
                      </Text>
                    </View>

                    <View style= {{flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginHorizontal: 10}}>
                      
                      <Text style= {{alignSelf: 'center', fontSize: 12}}>
                        Entry Fees
                      </Text>
                      <View style= {{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
                      <FontAwesome5 name= "rupee-sign" size= {14} color="green" />
                      <Text style= {{alignSelf: 'center', fontSize: 12, color: '#44bd32'}}>
                        {data.default.contestDTOs[1].entryFees} 
                      </Text>
                      </View>
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

                  <TouchableOpacity style= {{justifyContent: 'center', alignItems: 'center', width: '50%', height: 30, backgroundColor: '#44bd32', borderRadius: 4, margin: 2, padding: 2, elevation: 4}}>
                    <Text>Join Now !
                    </Text>
                  </TouchableOpacity>
                      
                  </View>
                  </View>

                  <View style= {{flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#F8EFBA', width: '94%', padding: 8}}>
                  <View style= {{flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', borderWidth: 2, backgroundColor: 'white', borderColor: 'green', width: '93%', padding: 10, margin: 10}}>
                    <Text style= {{fontSize: 16, fontStyle: 'bold'}}>
                      15 - 20 Overs
                    </Text>

                  <View style= {{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>

                    <View style= {{flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginHorizontal: 10}}>
                      <Text style= {{alignSelf: 'center', fontSize: 12}}>
                        Prize Money
                      </Text>
                      <Text style= {{alignSelf: 'center', fontSize: 12, color: '#44bd32'}}>
                        {data.default.contestDTOs[1].totalPrize} 
                      </Text>
                    </View>

                    <View style= {{flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginHorizontal: 10}}>
                      
                      <Text style= {{alignSelf: 'center', fontSize: 12}}>
                        Winners
                      </Text>
                      <Text style= {{alignSelf: 'center', fontSize: 12, color: '#44bd32'}}>
                        10,000 
                      </Text>
                    </View>

                    <View style= {{flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginHorizontal: 10}}>
                      
                      <Text style= {{alignSelf: 'center', fontSize: 12}}>
                        Entry Fees
                      </Text>
                      <View style= {{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
                      <FontAwesome5 name= "rupee-sign" size= {14} color="green" />
                      <Text style= {{alignSelf: 'center', fontSize: 12, color: '#44bd32'}}>
                        {data.default.contestDTOs[1].entryFees} 
                      </Text>
                      </View>
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

                  <TouchableOpacity style= {{justifyContent: 'center', alignItems: 'center', width: '50%', height: 30, backgroundColor: '#44bd32', borderRadius: 4, margin: 2, padding: 2, elevation: 4}}>
                    <Text>Join Now !
                    </Text>
                  </TouchableOpacity>
                      
                  </View>
                  </View>


                  <View style= {{flexDirection: 'row', padding: 2, justifyContent: 'space-around', borderWidth: 1, borderColor: '#ff9f43', width: '90%', elevation: 2}}>
                    <Entypo name= "arrow-bold-right" size= {20} color= "red" style= {{alignSelf: 'center'}} />
                    <View style= {{ flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center'}}>
                      <Text style= {styles.chooseTextHead1}>
                        LONGER MATCHES TO PLAY
                      </Text>


                      <Text style= {styles.chooseTextHead1}>
                        MEGA WINNING!
                      </Text>
                    </View>
                  </View>

                  <Modal
                  style={{alignSelf: 'center'}}
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                      Alert.alert('Modal has been closed.');
                    }}>
                      <View 
                        style= {{width: width, height: height, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: "#00000040"}}>
                      <View
                        style= {{width: '70%', height: '70%', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: "white", borderRadius: 40}}>
                        <View style= {{flexDirection: 'row', justifyContent: 'space-between', width: '100%', alignItems: 'center', padding: 30}}>
                          <Text>
                            Ranks
                          </Text>
                          <Text>
                            Winning Amount
                          </Text>
                        </View>
                          {
                            this.renderModalContent(this.state.winningBreakup)
                          }
                          
                        <TouchableHighlight
                          style= {{position: 'absolute', bottom: 4, marginTop: 4, justifyContent: 'center', alignItems: 'center', width: 80, height: 40, borderWidth: 1, borderRadius: 10, borderColor: 'green'}}
                          onPress={() => {
                            this.setState({ modalVisible: false })
                          }}>
                          <Text style= {{color: 'green'}}>Back</Text>
                        </TouchableHighlight>
                    </View>
                    </View>
                  </Modal>

        </View>
      </ScrollView>
    );
    }
}

const styles = StyleSheet.create({
    innerContainer: {
      flex : 1,
      width: '100%',
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'flex-start',
      flexDirection: 'column',
      padding: 2,
    },
    headerView: {
      borderWidth: 2,
      padding: 6,
      width: '100%',
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
    chooseTextHead1: {
      fontSize: 18,
      fontWeight: 'bold',
      color: 'green',
      margin: 8
    }
});

export default Contests;