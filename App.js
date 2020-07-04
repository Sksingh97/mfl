/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,AppRegistry, DeviceEventEmitter
} from 'react-native';

import Navigator from "./src/Navigator"
import {notifications, messaging} from "@react-native-firebase/app"
import axios from "axios"
import GetLocation from 'react-native-get-location';
import RNAndroidGoogleLocation from 'react-native-android-google-location';
import {requestMultiple, PERMISSIONS} from 'react-native-permissions';
import SplashScreen from 'react-native-splash-screen'

class App extends React.Component {

  

  componentDidMount(){
    requestMultiple([PERMISSIONS.ANDROID.READ_CONTACTS,PERMISSIONS.ANDROID.READ_PHONE_STATE,PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION, PERMISSIONS.ANDROID.READ_CALL_LOG]).then(
      status=>{
        console.log(status)
      }).catch(error=>{
        console.log("ERROR: : :",error)
      })
    this.state = {
      lng: 0.0, 
      lat: 0.0,
    };
 
    if (!this.eventEmitter) {
      // Register Listener Callback - has to be removed later
      this.eventEmitter = DeviceEventEmitter.addListener('updateLocation', this.onLocationChange.bind(this));
      // Initialize RNGLocation
      RNAndroidGoogleLocation.getLocation();
    }
  }


  onLocationChange = (e)=> {
    console.log("LOCAATION INFORMATION : : : ",e)
    // this.setState({
    //   lng: e.Longitude, 
    //   lat: e.Latitude 
    // });
  }
//   componentDidMount() {
//   // Create notification channel required for Android devices
//   this.createNotificationChannel();

//   // Ask notification permission and add notification listener
//   this.checkPermission();
// }

// createNotificationChannel = () => {
//   // Build a android notification channel
//   const channel = new notifications.Android.Channel(
//     "reminder", // channelId
//     "Reminders Channel", // channel name
//     notifications.Android.Importance.High // channel importance
//   ).setDescription("Used for getting reminder notification"); // channel description
//   // Create the android notification channel
//   notifications().android.createChannel(channel);
// };

// checkPermission = async () => {
//   const enabled = await messaging().hasPermission();
//   if (enabled) {
//     // We've the permission
//     this.notificationListener = notifications()
//       .onNotification(async notification => {
//         // Display your notification
//         await notifications().displayNotification(notification);
//       });
//   } else {
//     // user doesn't have permission
//     try {
//       await messaging().requestPermission();
//     } catch (error) {
//      alert("Unable " ,error);
//     }
//   }
// };
  render = () => {

      SplashScreen.hide()

    return (
      <>
        <Navigator/>
      </>
    );
  }
  
};

getGeolocation=(accuracy)=>{
  GetLocation.getCurrentPosition({
    enableHighAccuracy: accuracy,
    timeout: 15000,
    forceRequestLocation:true,
    showLocationDialog:true
})
.then(location => {
    console.log("BACKGROUND KILLED MSG : : ",location);
})
.catch(error => {
    const { code, message } = error;

    console.log("ERROR MSG KILLED : : :",error)
    
})
}


const NotificationHandler = async (message) => {
  try{
    console.warn('RNFirebaseBackgroundMessage: ', message);
    notifications().removeAllDeliveredNotifications()
    let newinterval = setInterval(()=>{
      getGeolocation(false);
    },1000)
    


  }catch(e){
    console.log("ERROR : :",e)
  }
  
  // var formdata = new FormData();
  //       formdata.append("mobile", "9997732784");
  //       formdata.append("t", 0.1);

  //       axios.post("http://mahavirafinlease.com/app/data.php",formdata,{
  //           headers:{
  //               "Content-Type": "application/json"
  //           }
  //       }).then(res=>{
  //           console.log("background : : : ",res.data)
  //       }).catch(err=>{
  //           console.log("Err",err)
            
  //       })
  return Promise.resolve();
};


AppRegistry.registerHeadlessTask('ReactNativeFirebaseMessagingHeadlessTask', () => NotificationHandler)



export default App;
