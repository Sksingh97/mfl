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
    
    state = {
        payment_history:[]
    }
    componentDidMount = async ()=>{
        
        console.log("REQUESTING DATA FOR THIS : : : ", this.props.loan_detail.currentLoan)
                
                var formdata = new FormData();
                formdata.append("cid",this.props.loan_detail.currentLoan)
                // formdata.append("cid","2768")
            
                formdata.append("t", '3');
                console.log("SENDING DATA : :: : : ",formdata)
                axios.post("http://mahavirafinlease.com/app/data.php",formdata,{
                    headers:{
                        "Content-Type": "application/json"
                    }
                }).then(res=>{
                    console.log("payment history data : : : : :",res.data)
                    this.setState({
                        payment_history: res.data
                    })
                }).catch(err=>{
                    console.log("Err",err)
                    
                }) 
         
            // var formdata = new FormData();
            // formdata.append("cid",this.props.loan_detail.currentLoan)
            // // formdata.append("cid","2768")
        
            // formdata.append("t", '3');
            // console.log("SENDING DATA : :: : : ",formdata)
            // axios.post("http://mahavirafinlease.com/app/data.php",formdata,{
            //     headers:{
            //         "Content-Type": "application/json"
            //     }
            // }).then(res=>{
            //     console.log("payment history data : : : : :",res.data)
            //     this.setState({
            //         payment_history: res.data
            //     })
            // }).catch(err=>{
            //     console.log("Err",err)
                
            // })
        }
    
    // componentWillReceiveProps = async () => {
        // console.log("REQUESTING DATA FOR THIS : : : ", this.props.loan_detail.currentLoan)
        // var formdata = new FormData();
        //     formdata.append("cid",this.props.loan_detail.currentLoan)
        //     // formdata.append("cid","2768")
        
        //     formdata.append("t", '3');
        //     console.log("SENDING DATA : :: : : ",formdata)
        //     axios.post("http://mahavirafinlease.com/app/data.php",formdata,{
        //         headers:{
        //             "Content-Type": "application/json"
        //         }
        //     }).then(res=>{
        //         console.log("payment history data : : : : :",res.data)
        //         this.setState({
        //             payment_history: res.data
        //         })
        //     }).catch(err=>{
        //         console.log("Err",err)
                
        //     })
    // }
    
    render = () => {
        return(
            <>
            <SafeAreaView style={{ flex: 1}}>
                <ScrollView style={{height:"90%"}}>
<View style={{flex:1,width:"100%",
                // backgroundColor:'red'
                }}>
                    <ImageBackground source={images.Banner} style={{width:widthPer(100),height:widthScale(150),justifyContent:'center'}} resizeMode="cover">
                        <View style={{paddingLeft:40,height:widthScale(70)}}>
            <Text style={{color:"#fff", fontSize:20}}>{"Payment History"}</Text>
                            {/* <View style={{flexDirection:"row",paddingTop:10}}><Image source={images.Phone} style={{width:20,height:20}}/><Text style={{color:"#fff",marginLeft:5}}>{this.props.auth&&this.props.auth.Phone?this.props.auth.Phone:""}</Text></View> */}
                            {/* <ModalDropdown options={['option 1', 'option 2']}/> */}
                            <View style={{flexDirection:"row",alignItems:"center"}}>
                            {/* <Image source={images.Down} style={{height:15,width:15,marginLeft:-50}}/> */}
                            </View>
                            

            {/* <View style={{flexDirection:"row",paddingTop:10}}>
                
            </View> */}
                        </View>
                        
                        
                    </ImageBackground>
                </View>
                <View style={{width:"100%", justifyContent:"center",alignItems:"center"}}>
                {this.state.payment_history?this.state.payment_history.map((item,index)=>(
                    <View style={{width:"90%",backgroundColor:"#fff",borderRadius:5,shadowColor:"#777777",shadowOffset:{height:5,width:5},elevation:5,marginTop:widthScale(index==0?-50:20),marginBottom:10,alignItems:"center"}}>
                    <View style={{
                        height:40,
                        width:"100%",
                        // backgroundColor:'red',
                        flexDirection:'row',
                        justifyContent:"space-between",
                        alignItems:"center"
                    }}>
                        <Text style={{marginLeft:20}}>Date : {item.date}</Text>
                        {item.mode=='Cash'?(<View style={{flexDirection:'row'}}><Text >Mode : {item.mode}</Text><Text style={{fontSize: 15, lineHeight: 18, marginRight:20}}>*</Text></View>):(<Text style={{marginRight:20}} >Mode : {item.mode}</Text>)}
                    </View>
                    
                    <View style={{width:"95%",backgroundColor:"#c4c4c4",height:1}}></View>
                    <View style={{
                        width:'80%',
                        marginTop:20
                    }}>
                        <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
                            <Text style={{fontSize:20}}>Rs. {item.amount} /-</Text>
                            <View style={{alignItems:"center"}}>
                            <View style={{flexDirection:'row'}}>
                                <Text style={{color:"#777777",fontWeight:"700"}}> {item.type}</Text>
                            </View>
                            <View style={{flexDirection:'row'}}>
                                {item.mode=='Cheque'?<Text style={{color:"#777777"}}>Cheque No: </Text>:<Text style={{color:"#777777"}}>Reciept No:  </Text>}
                                <Text style={{color:"#777777",fontWeight:"700"}}> {item.mode=='Cheque'?item.chqn:item.rid}</Text>
                            </View>
                            
                            </View>
                            
                        </View>
                {/* <Text style={{marginTop:10,color:'#777777'}}>Loan Number: {'----'}</Text> */}
                    </View>
                    <View style={{width:"100%",backgroundColor:"#c4c4c4",height:1,marginTop:20}}></View>
                    <View style={{flexDirection:'row',alignItems:'center',height:40,justifyContent:"space-between",width:"90%"}}>
                        <Text style={{color:"#777777",fontSize:15}}>{item.mode=='Cheque'?item.bank:item.note?item.note:"N/A"}</Text>
                {/* <Text style={{color:"#777777",fontSize:16,fontWeight:'900'}}>Rs {0} /-</Text> */}
                    </View>
                </View>
                )):null}
                </View>
                


                </ScrollView>
                
            </SafeAreaView>
            </>
        )
    }
}
const mapStateToProps = state => ({
    loan_detail: {...state.loan}
  });
  
  const ActionCreators = Object.assign(
    {logOut,setSelectedLoan}
  );
  const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(ActionCreators, dispatch),

  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(MainScreen)