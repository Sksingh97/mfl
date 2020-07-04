import React, {Component} from 'react';
import {View,Text,TouchableOpacity, SafeAreaView,Image, ImageBackground,Picker, Settings, AsyncStorage} from "react-native";
import { connect } from 'react-redux';
import { logOut } from '../Action/authAction';
import {setSelectedLoan, setCustomerList} from '../Action/loanAction'
import { bindActionCreators } from 'redux';
import {images} from "../Constants";
import {heightScale,widthScale,widthPer,heightPer, totalSize} from "../Utils/index"
import axios from "axios";
import { ScrollView } from 'react-native-gesture-handler';
// import ModalDropdown from 'react-native-modal-dropdown';
import messaging, { AuthorizationStatus } from '@react-native-firebase/messaging';
import {requestNotifications} from 'react-native-permissions';



class MainScreen extends Component{
    state={
        User:{},
        selectedValue:"Loan Number XXXX"
    }
    requestUserPermission= async()=> {
        requestNotifications(['alert', 'sound']).then(({status, settings}) => {
            // …
            console.log("STATUS : ",status,"SETTING : ",Settings)
          });
          
      }
    
    componentDidMount = async ()=>{
        console.log("CURRENT PROPE : : :",this.props.loan_detail)
        this.requestUserPermission();
        let msg = await messaging().registerDeviceForRemoteMessages();
        console.log("MESSAGE : : : ",msg)
        let fcmToken = await AsyncStorage.getItem('fcmToken');
        if (!fcmToken) {
            fcmToken = await messaging().getToken();
            if (fcmToken) {
                // user has a device token
                await AsyncStorage.setItem('fcmToken', fcmToken);
            }
        }
        console.log("TOKEN : : ",fcmToken)
        messaging().onMessage(async remoteMessage => {
            console.log("NOTIFICATION AAYA :  : : ",remoteMessage)
          });
        
          messaging().setBackgroundMessageHandler(async data=>{
              console.log("background: : : ",data);
          })
      
        if(this.props.loan_detail.coustomerList){
            console.log("REDUX PROPS DATA : : ::",this.props.auth.AuthStatus.email)
            var formdata = new FormData();
            formdata.append("phone", this.props.loan_detail.coustomerList[0].cid);
            this.setState({
                selectedValue:this.props.loan_detail.coustomerList[0].cid
            })
            formdata.append("t", "1");
            console.log(formdata)
            axios.post("http://mahavirafinlease.com/app/data.php",formdata,{
                headers:{
                    "Content-Type": "application/json"
                }
            }).then(res=>{
                // console.warn("RES : ::2 :",res.data,typeof res.data);
                this.setState({
                    User:res.data,
                    currentLoan:this.props.loan_detail.coustomerList[0].cid
                })
                this.props.actions.setSelectedLoan(this.props.loan_detail.coustomerList[0].cid)

            }).catch(err=>{
                console.log("Err",err)
            })
        }
       
        
        }
    getLoanData = (cid) => {
        console.log("REDUX PROPS DATA : : ::",this.props.auth.AuthStatus.email)
        var formdata = new FormData();
        formdata.append("phone", cid);
        formdata.append("t", "1");
        console.log(formdata)
        axios.post("http://mahavirafinlease.com/app/data.php",formdata,{
            headers:{
                "Content-Type": "application/json"
            }
        }).then(res=>{
            // console.warn("RES : ::2 :",res.data,typeof res.data);
            console.log("NAME:: : ",res.data.name)
            this.setState({
                User:res.data,
                currentLoan:cid
            })
            this.props.actions.setSelectedLoan(cid)

        }).catch(err=>{
            console.log("Err",err)
        })
    }
    render = () => {
        return(
            <>
            <SafeAreaView style={{ flex: 1}}>
                <ScrollView style={{height:"90%"}}>
<View style={{flex:1,width:"100%",
                // backgroundColor:'red'
                }}>
                    <ImageBackground source={images.Banner} style={{width:widthPer(100),height:widthScale(200),justifyContent:'center'}} resizeMode="cover">
                        <View style={{paddingLeft:40,height:widthScale(100)}}>
            <Text style={{color:"#fff", fontSize:20}}>{this.state.User.name?this.state.User.name:""}</Text>
                            <View style={{flexDirection:"row",paddingTop:10}}><Image source={images.Phone} style={{width:20,height:20}}/><Text style={{color:"#fff",marginLeft:5}}>{this.props.auth&&this.props.auth.Phone?this.props.auth.Phone:""}</Text></View>
                            {/* <ModalDropdown options={['option 1', 'option 2']}/> */}
                            <View style={{flexDirection:"row",alignItems:"center"}}>
                            <Picker
                            selectedValue={this.state.selectedValue}
                            style={{ height: 40, width: 210,color:"#fff"}}
                            onValueChange={(itemValue, itemIndex) => {
                                this.setState({
                                    selectedValue:itemValue
                                },()=>{
                                    console.log("CHANGING TO THIS VALUE,",itemValue)
                                this.getLoanData(itemValue)
                                });
                                
                            }}
                            >
                                {this.props&&this.props.loan_detail&&this.props.loan_detail.coustomerList?this.props.loan_detail.coustomerList.map(item=><Picker.Item label={"Loan Number "+item.loan} value={item.cid} />):<></>
            //                     <TouchableOpacity onPress={()=>{
            //     this.getLoanData(item.cid)
            // }} style={{padding:5,backgroundColor:this.state.currentLoan==item.cid?"#00A4FF":"#c4c4c4",borderRadius:5,marginLeft:5}}><Text>{item.loan}</Text></TouchableOpacity>):<></>
            }
                            </Picker>
                            <Image source={images.Down} style={{height:15,width:15,marginLeft:-50}}/>
                            </View>
                            

            {/* <View style={{flexDirection:"row",paddingTop:10}}>
                
            </View> */}
                        </View>
                        
                        
                    </ImageBackground>
                </View>
                {this.state&&this.state.User&&this.state.User.status?<View style={{width:"100%",flex:3,backgroundColor:"#eeeeee",alignItems:"center"}}>
                    <View style={{width:"90%",height:190,backgroundColor:"#fff",borderRadius:5,shadowColor:"#777777",shadowOffset:{height:5,width:5},elevation:5,marginTop:widthScale(-50),marginBottom:10,alignItems:"center"}}>
                        <View style={{
                            height:40,
                            width:"100%",
                            // backgroundColor:'red',
                            flexDirection:'row',
                            // justifyContent:"",
                            alignItems:"center"
                        }}>
                            <Text style={{marginLeft:20}}>Current Month Due Amount</Text>
                        </View>
                        
                        <View style={{width:"95%",backgroundColor:"#c4c4c4",height:1}}></View>
                        <View style={{
                            width:'80%',
                            marginTop:20
                        }}>
                            <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
                                <Text style={{fontSize:20}}>Rs. {this.state.User.currentpending||this.state.User.currentpending==0?this.state.User.currentpending:""} /-</Text>
                                <View style={{flexDirection:'row'}}>
                                    <Text style={{color:"#777777"}}>Due Date: </Text>
                                    <Text style={{color:"#777777",fontWeight:"700"}}>{this.state.User.currentdue?this.state.User.currentdue:""}</Text>
                                </View>
                            </View>
                    <Text style={{marginTop:10,color:'#777777'}}>Loan Number: {this.state.User&&this.state.User.loan?this.state.User.loan:'----'}</Text>
                        </View>
                        <View style={{width:"95%",backgroundColor:"#c4c4c4",height:1,marginTop:20}}></View>
                        <View style={{flexDirection:'row',alignItems:'center',height:40,justifyContent:"space-between",width:"80%"}}>
                            <Text style={{color:"#777777",fontSize:15}}>Total Remainig</Text>
                    <Text style={{color:"#777777",fontSize:16,fontWeight:'900'}}>Rs {this.state.User&&this.state.User.currentpending&&parseInt(this.state.User.currentpending)?parseInt(this.state.User.currentpending):0+this.state.User&&this.state.User.previousamount&&parseInt(this.state.User.previousamount)?parseInt(this.state.User.previousamount):0} /-</Text>
                        </View>
                    </View>
                </View>:null}

                <View style={{width:"100%",flex:3,backgroundColor:"#eeeeee",alignItems:"center"}}>
                    <View style={{width:"90%",height:190,backgroundColor:"#fff",borderRadius:5,shadowColor:"#777777",shadowOffset:{height:5,width:5},elevation:5,marginTop:widthScale(this.state&&this.state.User&&this.state.User.status?10:-50),marginBottom:widthScale(10),alignItems:"center"}}>
                        <View style={{
                            height:40,
                            width:"100%",
                            // backgroundColor:'red',
                            flexDirection:'row',
                            // justifyContent:"",
                            alignItems:"center"
                        }}>
                            <Text style={{marginLeft:20}}>Current Balance</Text>
                        </View>
                        <View style={{width:"95%",backgroundColor:"#c4c4c4",height:1}}></View>
                        <View style={{
                            width:'80%',
                            marginTop:20
                        }}>
                            <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
                                <Text style={{fontSize:20}}>Rs. {this.state.User.currentbalance?this.state.User.currentbalance:0} /-</Text>
                                <View style={{flexDirection:'row'}}>
                                    <Text style={{color:"#777777"}}>Due Date: </Text>
                                    <Text style={{color:"#777777",fontWeight:"700"}}>{this.state.User.loandate?this.state.User.loandate:""}</Text>
                                </View>
                            </View>
                            <Text style={{marginTop:10,color:'#777777'}}>Loan Number: {this.state.User&&this.state.User.loan?this.state.User.loan:'----'}</Text>
                        </View>
                        <View style={{width:"95%",backgroundColor:"#c4c4c4",height:1,marginTop:20}}></View>
                        <View style={{flexDirection:'row',alignItems:'center',height:40,justifyContent:"space-between",width:"80%"}}>
                            <Text style={{color:"#777777",fontSize:15}}>Total Remainig</Text>
                            <Text style={{color:"#777777",fontSize:16,fontWeight:'900'}}>Rs {this.state.User.currentbalance?this.state.User.currentbalance:0} /-</Text>
                        </View>
                    </View>
                </View>

                <View style={{width:"100%",flex:3,backgroundColor:"#eeeeee",alignItems:"center"}}>
                    <View style={{width:"90%",height:190,backgroundColor:"#fff",borderRadius:5,shadowColor:"#777777",shadowOffset:{height:5,width:5},elevation:5,marginTop:widthScale(10),marginBottom:widthScale(10),alignItems:"center"}}>
                        <View style={{
                            height:40,
                            width:"100%",
                            // backgroundColor:'red',
                            flexDirection:'row',
                            // justifyContent:"",
                            alignItems:"center"
                        }}>
                            <Text style={{marginLeft:20}}>EMI Pending</Text>
                        </View>
                        <View style={{width:"95%",backgroundColor:"#c4c4c4",height:1}}></View>
                        <View style={{
                            width:'80%',
                            marginTop:20
                        }}>
                            <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
                                <Text style={{fontSize:20}}>Rs. {this.state.User.previousamount?this.state.User.previousamount:0} /-</Text>
                                <View style={{flexDirection:'row'}}>
                                    <Text style={{color:"#777777"}}>Due Date: </Text>
                                    <Text style={{color:"#777777",fontWeight:"700"}}>{this.state.User.previousdate?this.state.User.previousdate:""}</Text>
                                </View>
                            </View>
                            <Text style={{marginTop:10,color:'#777777'}}>Loan Number: {this.state.User&&this.state.User.loan?this.state.User.loan:'----'}</Text>
                        </View>
                        <View style={{width:"95%",backgroundColor:"#c4c4c4",height:1,marginTop:20}}></View>
                        <View style={{flexDirection:'row',alignItems:'center',height:40,justifyContent:"space-between",width:"80%"}}>
                            <Text style={{color:"#777777",fontSize:15}}>Total Remainig</Text>
                            <Text style={{color:"#777777",fontSize:16,fontWeight:'900'}}>Rs {this.state.User.previousamount?this.state.User.previousamount:0} /-</Text>
                        </View>
                    </View>
                </View>

                </ScrollView>
                
            </SafeAreaView>
            </>
        )
    }
}
const mapStateToProps = state => ({
    auth: {...state.auth},
    loan_detail: {...state.loan}
  });
  
  const ActionCreators = Object.assign(
    {logOut,setSelectedLoan}
  );
  const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(ActionCreators, dispatch),

  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(MainScreen)