import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, SafeAreaView, TextInput, StyleSheet } from "react-native";
import { connect } from 'react-redux';
import { loginSuccess } from '../Action/authAction';
import {setSelectedLoan, setCustomerList} from '../Action/loanAction'

import { bindActionCreators } from 'redux';
import { Navigation } from 'react'
import { color } from "../Constants/color";
import { images } from "../Constants";
// import {AxiosRequest} from '../Utils'
import axios from "axios";
import Toast from 'react-native-simple-toast';


let styles = StyleSheet.create({
    fullScreen: { flex: 1 },
    input: {
        width: 47,
        height: 47,
        fontSize: 20,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        // fontFamily:'Gill Sans',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "#c4c4c4"
    },
    navbarContainer: {
        paddingTop: 10,
        paddingBottom: 10


    },
    inputContainer: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%',
        // backgroundColor:'red'
    },
    buttonContainer: {
        marginTop: 44,
        alignItems: 'center'
    },
    forgetText: {
        fontSize: 14,
        // color: colors.BLUE,
        marginRight: 28
    },
    textContainer: {
        marginTop: 11,
        width: '90%',
        marginHorizontal: 20,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    text: {
        fontSize: 22,
        fontFamily: 'Gill Sans',
    },
    notRecievedContainer: {
        marginTop: 42,
        alignItems: 'center',
        justifyContent: 'center'
    },
    notRecText: {
        // color: colors.INPUT_LABEL,
        fontSize: 16,
        fontFamily: 'Gill Sans',
    },

    resendContainer: {
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    resend: {
        // color: colors.BLUE,
        fontSize: 16,
        fontFamily: 'Gill Sans',
    },
    number: {
        fontSize: 16,
        // color: colors.BLUE
    }
})

class LoginScreen extends Component {
    state = {
        // email: "9350065663",
        email:"9899924172",
        password: "",
        otp: ["1", "2", "3", "4"],
        current: 0,
        otpsend: false
    }

    setCreds = (val, prop) => {
        this.setState({
            [prop]: val
        }, () => {
            console.log("DATA : : :", this.state)
        })
    }
    otpChangeHandler = (index, text) => {
        if (text === "" || text === " ") {
            if (this.state.current >= 0) {
                let newOtp = this.state.otp.map((item, loc) => {
                    if (loc === index) {
                        return "";
                    } else {
                        return item;
                    }
                })
                this.setState({
                    otp: newOtp,
                    current: (this.state.current === 0) ? this.state.current : this.state.current - 1,
                }, () => {
                    this.focusNextField(this.state.current)
                })
            }
        } else {
            let newOtp = this.state.otp.map((item, loc) => {
                if (loc === index) {
                    return text;
                } else {
                    return item;
                }
            })
            this.setState({
                otp: newOtp,
                current: (this.state.current < this.state.otp.length - 1) ? this.state.current + 1 : this.state.current,
            }, () => {
                this.focusNextField(this.state.current)
            })
        }

    }
    focusNextField(nextField) {
        this.refs[nextField].focus();
    }

    sendOtpForLogin=()=>{
        var formdata = new FormData();
        formdata.append("mob", this.state.email);
        formdata.append("t", 0);

        axios.post("http://mahavirafinlease.com/app/data.php",formdata,{
            headers:{
                "Content-Type": "application/json"
            }
        }).then(res=>{
            console.log("OTP : : : ",res.data)
            if(res.data.status){
                this.setState({
                    otpsend:true,
                    client_id: res.data.data
                })
                Toast.show(res.data.msg);
            }else{
                Toast.show(res.data.msg);
            }
            // this.props.actions.setCustomerList(res.data)
       
        }).catch(err=>{
            console.log("Err",err)
            
        })
    }

    getDataFromPhoneNumber=()=>{
        var formdata = new FormData();
        formdata.append("cid", this.state.client_id);
        formdata.append("otp", this.state.otp.join(""));
        formdata.append("mob", this.state.email);
        formdata.append("t", 0.2);

        axios.post("http://mahavirafinlease.com/app/data.php",formdata,{
            headers:{
                "Content-Type": "application/json"
            }
        }).then(res=>{
            console.log("RESP : : : ",res.data)
            if(res.data.status == 1){
                console.log("success",JSON.parse(res.data.data))
                res.data.data = JSON.parse(res.data.data)
                Toast.show(res.data.msg)
                console.log("success",res.data.data.length)
                this.props.actions.setCustomerList(res.data.data)
                this.props.actions.loginSuccess({email:this.state.email})
            }else{
                Toast.show(res.data.msg)
            }
        }).catch(err=>{
            console.log("Err",err)
            
        })
    }

    render = () => {
        return (
            <>
                <SafeAreaView style={{ flex: 1, backgroundColor: color[this.props.darkMode.colorSchem].SCREEN_BACKGROUND }}>
                    <View style={{
                        justifyContent: "space-between", flex: 1
                    }}>
                        <View>
                            <View style={{ marginTop: 50, alignItems: "center" }}>
                                <Image source={this.props.darkMode.colorSchem == "Light" ? images.LogoLight : images.LogoDark} />
                            </View>
                            {/* <View style={{marginTop:50,alignItems:"center"}}>
                                <Text style={{color:color[this.props.darkMode.colorSchem].TEXT_COLOR, fontSize:17, fontWeight:"900"}}>Sign in with Social</Text>
                            </View> */}
                            {/* <View style={{marginTop:25,alignItems:"center",flexDirection:'row',justifyContent:'space-evenly'}}>
                                <TouchableOpacity style={{width:'40%',height:40,backgroundColor:color[this.props.darkMode.colorSchem].SCREEN_BACKGROUND,borderWidth:1,borderColor:color[this.props.darkMode.colorSchem].TEXT_COLOR,alignItems:"center",justifyContent:"center",borderRadius:5,shadowOffset:{width:8,height:8 },shadowColor:"#000",shadowOpacity:0.1,elevation:5,flexDirection:'row',}}>
                                    <Image source={this.props.darkMode.colorSchem=="Light"?images.FbLight:images.FbDark} style={{width:20,height:20}}/>
                                    <Text style={{color:color[this.props.darkMode.colorSchem].TEXT_COLOR,marginLeft:10}}>Facebook</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{width:'40%',height:40,backgroundColor:color[this.props.darkMode.colorSchem].SCREEN_BACKGROUND,borderWidth:1,borderColor:color[this.props.darkMode.colorSchem].TEXT_COLOR,alignItems:"center",justifyContent:"center",borderRadius:5,shadowOffset:{width:8,height:8 },shadowColor:"#000",shadowOpacity:0.1,elevation:5,flexDirection:'row'}}>
                                    <Image source={this.props.darkMode.colorSchem=="Light"?images.GLight:images.GDark} style={{width:20,height:20}}/>
                                    <Text style={{color:color[this.props.darkMode.colorSchem].TEXT_COLOR,marginLeft:10}}>Google</Text>
                                </TouchableOpacity>
                            </View> */}
                            <View style={{ marginTop: 50, alignItems: "center", flexDirection: 'row', justifyContent: 'center' }}>
                                <View style={{ width: '12%', height: 2, backgroundColor: color[this.props.darkMode.colorSchem].TEXT_COLOR }} />
                                <Text style={{ color: color[this.props.darkMode.colorSchem].TEXT_COLOR, fontSize: 17, fontWeight: "900" }}> Login </Text>
                                <View style={{ width: '12%', height: 2, backgroundColor: color[this.props.darkMode.colorSchem].TEXT_COLOR }} />
                            </View>
                            <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 50 }}>
                                <TextInput
                                    style={{
                                        width: '90%',
                                        height: 60,
                                        borderColor: "#c4c4c4",
                                        borderWidth: 1,
                                        borderRadius: 5,
                                        color: color[this.props.darkMode.colorSchem].TEXT_COLOR,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        paddingLeft: 15,
                                        
                                    }}
                                    value={this.state.email}
                                    placeholder="Phone number"
                                    placeholderTextColor="#c2c2c2"
                                    keyboardType="phone-pad"
                                    onChangeText={val => { this.setCreds(val, "email") }}
                                />
                            </View>
                            <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
                                {this.state.otpsend && <View style={styles.inputContainer}>
                                    {this.state.otp.map((item, index) => {
                                        console.log(index == this.state.current);
                                        return (<TextInput ref={index} value={item} maxLength={1} autoFocus={index == this.state.current} style={styles.input} onChangeText={this.otpChangeHandler.bind(this, index)} keyboardType={'phone-pad'} />);
                                    })}
                                </View>}
                            </View>
                            {/* <View style={{alignItems:'flex-end', justifyContent:'flex-end',marginTop:15}}>
                                <TouchableOpacity style={{
                                    marginRight:20
                                }}>
                                    <Text style={{color:color[this.props.darkMode.colorSchem].TEXT_COLOR}}>Forget Your Password ?</Text>
                                </TouchableOpacity>
                            </View> */}
                            <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 25 }}>
                                <TouchableOpacity style={{
                                    width: '90%',
                                    height: 45,
                                    backgroundColor: color[this.props.darkMode.colorSchem].SIGN_IN_BG,
                                    // backgroundColor:'yellow',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                // }} onPress={this.state.otpsend?()=>{}:()=>{this.getDataFromPhoneNumber()} }>
                                }} onPress={this.state.otpsend?()=>{this.getDataFromPhoneNumber()}:()=>{this.sendOtpForLogin()}}>
                                    {this.state.otpsend ? <Text>Sign In</Text> : <Text>Send OTP</Text>}
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 20,
                            flexDirection: 'row'
                        }}
                        onPress={()=>{
                            this.sendOtpForLogin()
                        }}
                        >
                            <Text style={{ color: color[this.props.darkMode.colorSchem].BLUE_TEXT }}>Resend OTP</Text>
                        </TouchableOpacity>
                        </View>
                        <TouchableOpacity style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginBottom: 15,
                            flexDirection: 'row'
                        }}>
                            <Text style={{ color: color[this.props.darkMode.colorSchem].TEXT_COLOR }}>Don't have an account ? </Text><Text style={{ color: color[this.props.darkMode.colorSchem].BLUE_TEXT }}>Apply For Loan</Text>
                        </TouchableOpacity>
                    </View>

                    {/* <TouchableOpacity onPress={this.props.actions.loginSuccess}>
                        <Text style={{
          color: color[this.props.darkMode.colorSchem].HEADER_TEXT
        }}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('SignUp')}>
                        <Text style={{
          color: color[this.props.darkMode.colorSchem].HEADER_TEXT
        }}>Signup</Text>
                    </TouchableOpacity> */}
                </SafeAreaView>
            </>
        )
    }
}
const mapStateToProps = state => ({
    auth: { ...state.auth },
    darkMode: { ...state.DarkMode },
    loan: {...state.loan}
});

const ActionCreators = Object.assign(
    { loginSuccess,setCustomerList }
);
const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(ActionCreators, dispatch),
});


export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)