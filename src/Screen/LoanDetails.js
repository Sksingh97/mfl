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
        loan_data: {},
        loading:true
    }
    componentDidMount(){
        var formdata = new FormData();
        formdata.append("cid",this.props.loan_detail.currentLoan)
        // formdata.append("cid","2768")
        this.setState({
            loading:true
        })
        formdata.append("t", '4');
        console.log("SENDING DATA : :: : : ",formdata)
        axios.post("http://mahavirafinlease.com/app/data.php",formdata,{
            headers:{
                "Content-Type": "application/json"
            }
        }).then(res=>{
            console.log("payment history data : : : : :",res.data)
            this.setState({
                loan_data: res.data,
                loading:false
            },()=>{
                console.log()
            })
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
                    <ImageBackground source={images.Banner} style={{width:widthPer(100),height:widthScale(70),justifyContent:'center'}} resizeMode="cover">
                        <View style={{paddingLeft:20,height:widthScale(70),alignItems:'center',flexDirection:'row'}}>
                            <TouchableOpacity onPress={()=>{
                                this.props.navigation.goBack()
                            }}> 
                            <Image source={images.LArrowWhite} style={{height:30,width:30}}/>
                            </TouchableOpacity>
            <Text style={{color:"#fff", fontSize:20,paddingLeft:20}}>Loan Details</Text>
                            {/* <View style={{flexDirection:"row",paddingTop:10}}><Image source={images.Phone} style={{width:20,height:20}}/><Text style={{color:"#fff",marginLeft:5}}>9717074214</Text></View> */}
                        </View>
                    </ImageBackground>
                </View>
                {this.state.loading? null:<View style={{width:"100%",flex:3,backgroundColor:"#eeeeee",alignItems:"center"}}>
                    <View style={{width:"90%",backgroundColor:"#fff",marginTop:20,borderRadius:5,alignItems:"center",paddingBottom:20}}>
                            <View style={{flexDirection:'row',width:"90%",justifyContent:'space-between',alignItems:'center'}}>
                                <Text style={{fontSize:20,paddingTop:20}}>
                                    Details For :{this.state.loan_data.id} 
                                </Text>
                                <View style={{flexDirection:"row",marginTop:20,alignItems:"flex-end"}}>
                                    <Text style={{fontSize:17,color:"red"}}>
                                        Rs {this.state.loan_data.installment}
                                    </Text>
                                    <Text style={{fontSize:17,color:"red"}}>/</Text>
                                    <Text style={{fontSize:12,color:"red"}}>Month</Text>
                                </View>
                            </View>
                            <View style={{width:"90%"}}>
                        <Text style={{fontSize:10}}>Loan Date {this.state.loan_data.agreementdate}</Text>

                            </View>

                            <View style={{width:"90%",alignItems:"center"}}>
                                <View style={{flexDirection:"row",width:"100%",marginTop:20}}>
                                    <View style={{justifyContent:"center"}}>
                                        <Image source={images.Interest} style={{height:50,width:50}}/>
                                    </View>
                                    <View style={{marginLeft:10,width:"80%"}}>
                                        <Text style={{fontSize:17,fontWeight:'bold'}}>Loan Detail</Text>
                                        <View style={{flexDirection:"row", justifyContent:"space-between"}}><Text style={{fontSize:15}}>Amount Financed: </Text><Text>Rs. {this.state.loan_data.finance}</Text></View>
                                        <View style={{flexDirection:"row", justifyContent:"space-between"}}><Text style={{fontSize:15}}>EMI Start Date:</Text><Text>{this.state.loan_data.due_date}</Text></View>
                                        <View style={{flexDirection:"row", justifyContent:"space-between"}}><Text style={{fontSize:15}}>EMI Settle Date:</Text><Text>{this.state.loan_data.settle_date}</Text></View>
                                        
                                        
                                        
                                    </View>
                                </View>
                            </View>

                            <View style={{width:"90%",height:2,backgroundColor:"#eee",marginTop:20}}></View>


                            <View style={{width:"90%",alignItems:"center"}}>
                                <View style={{flexDirection:"row",width:"100%",marginTop:20}}>
                                    <View  style={{justifyContent:"center"}}>
                                        <Image source={images.Money} style={{height:50,width:50}}/>
                                    </View>
                                    <View style={{marginLeft:10,width:"80%"}}>
                                        <Text style={{fontSize:17,fontWeight:'bold'}}>Total Balance Amount</Text>
                                        <Text style={{fontSize:12}}>Loan for {this.state.loan_data.tenure} months</Text>
                                        <View style={{flexDirection:"row",marginTop:10}}>
                        <Text style={{fontSize:15,fontWeight:"bold"}}>Rs. {(Number(this.state.loan_data.installment) * Number(this.state.loan_data.tenure))-(this.state.loan_data.advemi + this.state.loan_data.current.received)}</Text>
                                            <Text style={{fontSize:15}}> Remaining out of Rs. {Number(this.state.loan_data.installment) * Number(this.state.loan_data.tenure)}</Text>
                                        </View>
                                        <View style={{height:5,backgroundColor:"#c4c4c4",borderRadius:5,marginTop:5}}>
                                            <View style={{height:5,backgroundColor:"red",borderRadius:5,width:`${((this.state.loan_data.advemi + this.state.loan_data.current.received)/(Number(this.state.loan_data.installment) * Number(this.state.loan_data.tenure)))*100}%`}}>

                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={{width:"90%",height:2,backgroundColor:"#eee",marginTop:20}}></View>
                            <View style={{width:"90%",alignItems:"center"}}>
                                <View style={{flexDirection:"row",width:"100%",marginTop:20}}>
                                    <View style={{justifyContent:"center"}}>
                                        <Image source={images.EMI} style={{height:50,width:50}}/>
                                    </View>
                                    <View style={{marginLeft:10,width:"80%"}}>
                                        <Text style={{fontSize:17,fontWeight:'bold'}}>Number of EMI Left</Text>
                                        <Text style={{fontSize:12}}>Monthly Paid Amount Every Month</Text>
                                        <View style={{flexDirection:"row",marginTop:10}}>
                                            <Text style={{fontSize:15,fontWeight:"bold"}}>{(this.state.loan_data.tenure - ((this.state.loan_data.advemi + this.state.loan_data.current.received)/this.state.loan_data.installment)).toFixed(1)}</Text>
                                            <Text style={{fontSize:15}}> Remaining out of {this.state.loan_data.tenure}</Text>
                                        </View>
                                        <View style={{height:5,backgroundColor:"#c4c4c4",borderRadius:5,marginTop:5}}>
                                            <View style={{height:5,backgroundColor:"red",borderRadius:5,width:`${((this.state.loan_data.advemi + this.state.loan_data.current.received)/this.state.loan_data.installment)/this.state.loan_data.tenure*100}%`}}>

                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>

                            
                    </View>
                </View>}

                

                

                </ScrollView>
                
            </SafeAreaView>
            </>
        )
    }
}
const mapStateToProps = state => ({
    loan_detail: {...state.loan},
  });
  
  const ActionCreators = Object.assign(
    {logOut}
  );
  const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(ActionCreators, dispatch),
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(MainScreen)