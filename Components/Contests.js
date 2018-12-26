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
    ActivityIndicator
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
const data = require('../Dummy/Contest');

Props = {};
class Contests extends Component<Props> {

  static navigationOptions={
    headerStyle: {
      backgroundColor: 'green'
    }
  };
  
    constructor(props) {
    super(props);
    
     this.state={ 
       email:null,
       password:null,
       dataTemp:'',
       ready:true,
       message:''       
    };
  };

  componentDidMount() {
    fetch('http://13.127.217.102:8000/getFutureMatches')
    .then((response)=> response.json())
    .then((res)=> {
      this.setState({ email: res });
    });
  }

    render() {
      const match = this.props.navigation.state.params.data;
      const dif = data.default.contestDTOs[1].totalCount - data.default.contestDTOs[1].playingCount
      let total = data.default.contestDTOs[1].totalCount
      let playing = data.default.contestDTOs[1].playingCount
      // alert(JSON.stringify(this.state.email));
        return (
             <ScrollView showsVerticalScrollIndicator= {false}>
              <View style={{flex:1, justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>       

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

                  <View style= {{flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#F8EFBA', width: '94%', padding: 8}}>
                  <View style= {{flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', borderWidth: 2, backgroundColor: 'white', borderColor: 'green', width: '93%', padding: 10, margin: 10}}>
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

                  <TouchableOpacity 
                    onPress= {()=>this.props.navigation.navigate('ContestDetails', {data: match})}
                    style= {{justifyContent: 'center', alignItems: 'center', width: '50%', height: 30, backgroundColor: '#44bd32', borderRadius: 4, margin: 2, padding: 2, elevation: 4}}>
                    <Text>Join Now !
                    </Text>
                  </TouchableOpacity>
                      
                  </View>
                  </View>


                  <View style= {{flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#F8EFBA', width: '94%', padding: 8}}>
                  <View style= {{flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', borderWidth: 2, backgroundColor: 'white', borderColor: 'green', width: '93%', padding: 10, margin: 10}}>
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

                  <View style= {{ backgroundColor: 'green', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', borderWidth: 1, borderColor: 'red', width: '98%', padding: 8, margin: 10}}>
                  <TouchableOpacity>
                  <FontAwesome5 name= "baseball-ball" size= {18} color= 'white' style= {{alignSelf: 'center'}} />
                    <Text style= {{color: 'white'}}>0 - 10 Overs
                    </Text>
                  </TouchableOpacity>
                  </View>

                  <View style= {{ backgroundColor: 'green', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', borderWidth: 1, borderColor: 'red', width: '98%', padding: 8, margin: 10}}>
                  <TouchableOpacity>
                    <FontAwesome5 name= "baseball-ball" size= {18} color= 'white' style= {{alignSelf: 'center'}} />
                    <Text style= {{color: 'white'}}>10 - 20 Overs
                    </Text>
                  </TouchableOpacity>
                  </View>

                  <View style= {{ backgroundColor: 'green', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', borderWidth: 1, borderColor: 'red', width: '98%', padding: 8, margin: 10}}>
                  <TouchableOpacity>
                  <FontAwesome5 name= "baseball-ball" size= {18} color= 'white' style= {{alignSelf: 'center'}} />
                    <Text style= {{color: 'white'}}>0 - 20 Overs
                    </Text>
                  </TouchableOpacity>
                  </View>

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
      padding: 4,
      margin: 10
    },
    headerView: {
      borderWidth: 2,
      padding: 6,
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
    chooseTextHead1: {
      fontSize: 18,
      fontWeight: 'bold',
      color: 'green',
      margin: 8
    }
});

export default Contests;