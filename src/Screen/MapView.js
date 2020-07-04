import React, { Component } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, Image, ImageBackground, Picker, TextInput, ActivityIndicator } from "react-native";
import { connect } from 'react-redux';
import { logOut } from '../Action/authAction';
import { bindActionCreators } from 'redux';
import { images } from "../Constants";
import { heightScale, widthScale, widthPer, heightPer, totalSize } from "../Utils/index"
import axios from "axios";
import { ScrollView } from 'react-native-gesture-handler';
// import ModalDropdown from 'react-native-modal-dropdown';
import Toast from 'react-native-simple-toast';
import MapView, { Marker } from 'react-native-maps';
import {requestMultiple, PERMISSIONS} from 'react-native-permissions';
import GetLocation from 'react-native-get-location';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
// import MapViewDirections from 'react-native-maps-directions';
import {Loader} from "../Component/Loader"

class MapViewScreen extends Component {
    state = {
        // User: { "address": null, "city": null, "dob": null, "gender": null, "landmark": null, "name": null, "pincode": null, "so": null, "state": null },
        // selectedValue: "Loan Number XXXX",
        // edit: false
        region:null,
        error:null,
        loading:true
    }
    componentDidMount() {
        requestMultiple([PERMISSIONS.ANDROID.READ_CONTACTS,PERMISSIONS.ANDROID.READ_PHONE_STATE,PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION, PERMISSIONS.ANDROID.READ_CALL_LOG]).then(
            (statuses) => {
              console.log("CONTACT : ",statuses[PERMISSIONS.ANDROID.READ_CONTACTS]);
              console.log("PHONE : ",statuses[PERMISSIONS.ANDROID.READ_PHONE_STATE]);
              console.log("LOCATION : ",statuses[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION]);
              console.log("CORS LOCATION : ",statuses[PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION]);
              if(statuses[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION]=="granted"&&statuses[PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION]=="granted"){
                RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({interval: 10000, fastInterval: 5000})
                .then(data => {
                    console.log("PERMISSION HAIN LOCATION LAO")
                    this.getGeolocation(true)
                }).catch(err => {
                    this.setState({
                        error:"Please Enable Location To Use Map"
                    })
          });
              }
              
            },
          );
        if (this.props.loan_detail.currentLoan) {
            console.log("REDUX PROPS DATA : : ::", this.props.loan_detail.currentLoan)
            var formdata = new FormData();
            formdata.append("cid", this.props.loan_detail.currentLoan);
            this.setState({
                selectedValue: this.props.loan_detail.currentLoan
            })
            formdata.append("t", "5");
            console.log(formdata)
            axios.post("http://mahavirafinlease.com/app/data.php", formdata, {
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(res => {
                console.warn("RES : :profile",res.data.data1);
                if(res.data.status){
                    this.setState({
                        User: {
                            ...res.data.data[0]
                        },
                        identity:res.data.data1
                    })
                }else{
                 Toast.show(res.data.msg);
                }
                

            }).catch(err => {
                console.log("Err", err)
            })
        }


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
            region:{
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              },
              loading:false
          })

      })
      .catch(error => {
          const { code, message } = error;
    
          // console.warn(code, message);
          this.setState({
            error:"Unable to Fetch Location"
          })
      })
      }

    // getInitialState() {
    //     return {
    //       region: {
    //         latitude: 37.78825,
    //         longitude: -122.4324,
    //         latitudeDelta: 0.0922,
    //         longitudeDelta: 0.0421,
    //       },
    //     };
    //   }
      
    //   onRegionChange=(region)=>{
    //     this.setState({ region });
    //   }
      
      render() {
        return (
            <SafeAreaView style={{flex:1}}>
                    
                {this.state.loading?<><View style={{width:"100%",
                // backgroundColor:'red'
                }}>
                    <ImageBackground source={images.Banner} style={{width:widthPer(100),height:widthScale(70),justifyContent:'center'}} resizeMode="cover">
                        <View style={{paddingLeft:40,height:widthScale(70),justifyContent:'center'}}>
            <Text style={{color:"#fff", fontSize:20}}>Nearby Office</Text>
                            {/* <View style={{flexDirection:"row",paddingTop:10}}><Image source={images.Phone} style={{width:20,height:20}}/><Text style={{color:"#fff",marginLeft:5}}>9717074214</Text></View> */}
                        </View>
                    </ImageBackground>
                </View>
                <View style={{flex:1,justifyContent:'center',alignItems:'center',height:"100%"}}>
                <ActivityIndicator size="large" color="#0000ff" />
                    </View></>
                :<>
                <View style={{flex:1,width:"100%",
                // backgroundColor:'red'
                }}>
                    <ImageBackground source={images.Banner} style={{width:widthPer(100),height:widthScale(70),justifyContent:'center'}} resizeMode="cover">
                        <View style={{paddingLeft:40,height:widthScale(70),justifyContent:'center'}}>
            <Text style={{color:"#fff", fontSize:20}}>Nearby Office</Text>
                            {/* <View style={{flexDirection:"row",paddingTop:10}}><Image source={images.Phone} style={{width:20,height:20}}/><Text style={{color:"#fff",marginLeft:5}}>9717074214</Text></View> */}
                        </View>
                    </ImageBackground>
                </View>
            <MapView
            // provider={PROVIDER_GOOGLE}
            region={this.state.region}
            onRegionChange={this.onRegionChange}
            style={{height:'90%'}}
            // customMapStyle={{flex:1}}
          >
              <Marker.Animated
        ref={marker => { this.marker = marker }}
        coordinate={{latitude: 28.703085,
        longitude: 77.271793}}
      />
      <Marker.Animated
        ref={marker => { this.marker = marker }}
        coordinate={{latitude: 28.5919326,
        longitude: 77.3754643}}
      />
      {/* <MapViewDirection></MapViewDirection> */}
      {/* <MapViewDirections
    origin={{latitude: 28.703085,
        longitude: 77.271793}}
    destination={{latitude: 28.5919326,
        longitude: 77.3754643}}
    apikey={"AIzaSyB
    // https://maps.googleapis.com/maps/api/directions/json?origin=28.703085,77.271793&destination=28.5919326,77.3754643&key=AIzaSyA3IMien-zilWLY-TFHhawkntHYRnhPvDo"}
  /> */}
  <MapView.Polyline
    coordinates={[
        {latitude: 28.703085,
            longitude: 77.271793},
            {latitude: 28.5819316,
                longitude: 77.3454623},
            {latitude: 28.5919326,
                longitude: 77.3754643}
    ]}
    strokeWidth={4}
/>
          </MapView></>}
                
            </SafeAreaView>
          
        );
      }
}
const mapStateToProps = state => ({
    auth: {...state.auth},
    loan_detail: { ...state.loan }
});

const ActionCreators = Object.assign(
    { logOut }
);
const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(MapViewScreen)