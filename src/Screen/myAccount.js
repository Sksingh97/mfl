import React, {Component} from 'react';
import {View,Text,TouchableOpacity, SafeAreaView,Image, ImageBackground} from "react-native";
import { connect } from 'react-redux';
import { logOut } from '../Action/authAction';
import { bindActionCreators } from 'redux';
import {images} from "../Constants";
import {heightScale,widthScale,widthPer,heightPer, totalSize} from "../Utils/index"
import axios from "axios";
import { ScrollView } from 'react-native-gesture-handler';

 
class MainScreen extends Component{
    state={
        User:{}
    }
    componentDidMount(){

        }
    render = () => {
        return(
            <>
            <SafeAreaView style={{ flex: 1}}>
                <ScrollView style={{height:"90%"}}>
<View style={{flex:1,width:"100%",
                // backgroundColor:'red'
                }}>
                    <ImageBackground source={images.Banner} style={{width:widthPer(100),height:widthScale(70),justifyContent:'center'}} resizeMode="cover">
                        <View style={{paddingLeft:40,height:widthScale(70),justifyContent:'center'}}>
            <Text style={{color:"#fff", fontSize:20}}>My Account</Text>
                            {/* <View style={{flexDirection:"row",paddingTop:10}}><Image source={images.Phone} style={{width:20,height:20}}/><Text style={{color:"#fff",marginLeft:5}}>9717074214</Text></View> */}
                        </View>
                    </ImageBackground>
                </View>
                <View style={{width:"100%",flex:3,backgroundColor:"#eeeeee",alignItems:"center"}}>
                    <TouchableOpacity onPress={()=>{
                        this.props.navigation.navigate('Loan Details')
                    }} hitSlop={{top: 300, bottom: 0, left: 0, right: 0}} style={{width:"90%",height:90,backgroundColor:"#fff",borderRadius:5,shadowColor:"#777777",shadowOffset:{height:5,width:5},elevation:5,marginTop:widthScale(10),marginBottom:10,alignItems:"center",backgroundColor:'#ffffff'}}>
                        <View style={{width:"90%",height:"100%",alignItems:"center",justifyContent:'space-between',flexDirection:'row'}}>
                            <View style={{marginLeft:20,width:"80%"}}>
                                <Text style={{fontSize:18,fontWeight:'800'}}>Loan Details</Text>
                                <Text style={{fontSize:16,fontStyle:'italic',color:'#777'}}>Complete Loan Details</Text>
                            </View>
                            <Image source={images.RArrow} style={{height:30,width:30}}/>
                        </View>
                    </TouchableOpacity>

                    {/* <TouchableOpacity style={{width:"90%",height:90,backgroundColor:"#fff",borderRadius:5,shadowColor:"#777777",shadowOffset:{height:5,width:5},elevation:5,marginTop:widthScale(10),marginBottom:10,alignItems:"center",backgroundColor:'#ffffff'}}>
                        <View style={{width:"90%",height:"100%",alignItems:"center",justifyContent:'space-between',flexDirection:'row'}}>
                            <View style={{marginLeft:20,width:"80%"}}>
                                <Text style={{fontSize:18,fontWeight:'800'}}>Promise To Pay</Text>
                                <Text style={{fontSize:16,fontStyle:'italic',color:'#777'}}>Restore Your Service With Payment Commitment</Text>
                            </View>
                            <Image source={images.RArrow} style={{height:30,width:30}}/>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={{width:"90%",height:90,backgroundColor:"#fff",borderRadius:5,shadowColor:"#777777",shadowOffset:{height:5,width:5},elevation:5,marginTop:widthScale(10),marginBottom:10,alignItems:"center",backgroundColor:'#ffffff'}}>
                        <View style={{width:"90%",height:"100%",alignItems:"center",justifyContent:'space-between',flexDirection:'row'}}>
                            <View style={{marginLeft:20,width:"80%"}}>
                                <Text style={{fontSize:18,fontWeight:'800'}}>Update Contact Details</Text>
                                <Text style={{fontSize:16,fontStyle:'italic',color:'#777'}}>Update Profile Phone/Email</Text>
                            </View>
                            <Image source={images.RArrow} style={{height:30,width:30}}/>
                        </View>
                    </TouchableOpacity> */}

                    <TouchableOpacity onPress={()=>{
                        this.props.navigation.navigate('Profile Details')
                    }} style={{width:"90%",height:90,backgroundColor:"#fff",borderRadius:5,shadowColor:"#777777",shadowOffset:{height:5,width:5},elevation:5,marginTop:widthScale(10),marginBottom:10,alignItems:"center",backgroundColor:'#ffffff'}}>
                        <View style={{width:"90%",height:"100%",alignItems:"center",justifyContent:'space-between',flexDirection:'row'}}>
                            <View style={{marginLeft:20,width:"80%"}}>
                                <Text style={{fontSize:18,fontWeight:'800'}}>My Personal Details</Text>
                                <Text style={{fontSize:16,fontStyle:'italic',color:'#777'}}>Preview Your Profile</Text>
                            </View>
                            <Image source={images.RArrow} style={{height:30,width:30}}/>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=>{
                        this.props.navigation.navigate('Profile Details')
                    }} style={{width:"90%",height:90,backgroundColor:"#fff",borderRadius:5,shadowColor:"#777777",shadowOffset:{height:5,width:5},elevation:5,marginTop:widthScale(10),marginBottom:10,alignItems:"center",backgroundColor:'#ffffff'}}>
                        <View style={{width:"90%",height:"100%",alignItems:"center",justifyContent:'space-between',flexDirection:'row'}}>
                            <View style={{marginLeft:20,width:"80%"}}>
                                <Text style={{fontSize:18,fontWeight:'800'}}>Terms And Condition</Text>
                                <Text style={{fontSize:16,fontStyle:'italic',color:'#777'}}>Terms Of User</Text>
                            </View>
                            <Image source={images.RArrow} style={{height:30,width:30}}/>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=>{
                        this.props.navigation.navigate('Profile Details')
                    }} style={{width:"90%",height:90,backgroundColor:"#fff",borderRadius:5,shadowColor:"#777777",shadowOffset:{height:5,width:5},elevation:5,marginTop:widthScale(10),marginBottom:10,alignItems:"center",backgroundColor:'#ffffff'}}>
                        <View style={{width:"90%",height:"100%",alignItems:"center",justifyContent:'space-between',flexDirection:'row'}}>
                            <View style={{marginLeft:20,width:"80%"}}>
                                <Text style={{fontSize:18,fontWeight:'800'}}>Logout</Text>
                                <Text style={{fontSize:16,fontStyle:'italic',color:'#777'}}>Signout from the app</Text>
                            </View>
                            <Image source={images.RArrow} style={{height:30,width:30}}/>
                        </View>
                    </TouchableOpacity>
                </View>

                

                

                </ScrollView>
                
            </SafeAreaView>
            </>
        )
    }
}
const mapStateToProps = state => ({
    auth: {...state.auth},
  });
  
  const ActionCreators = Object.assign(
    {logOut}
  );
  const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(ActionCreators, dispatch),
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(MainScreen)