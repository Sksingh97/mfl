import React, { Component } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, Image, ImageBackground, Picker, TextInput } from "react-native";
import { connect } from 'react-redux';
import { logOut } from '../Action/authAction';
import { bindActionCreators } from 'redux';
import { images } from "../Constants";
import { heightScale, widthScale, widthPer, heightPer, totalSize } from "../Utils/index"
import axios from "axios";
import { ScrollView } from 'react-native-gesture-handler';
// import ModalDropdown from 'react-native-modal-dropdown';
import Toast from 'react-native-simple-toast';


class MainScreen extends Component {
    state = {
        User: { "address": null, "city": null, "dob": null, "gender": null, "landmark": null, "name": null, "pincode": null, "so": null, "state": null },
        selectedValue: "Loan Number XXXX",
        edit: false
    }
    componentDidMount() {
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

    render = () => {
        return (
            <>
                <SafeAreaView style={{ flex: 1 }}>
                    <ScrollView style={{ height: "90%" }}>
                        <View style={{
                            flex: 1, width: "100%",
                            // backgroundColor:'red'
                        }}>
                            <ImageBackground source={images.Banner} style={{ width: widthPer(100), height: widthScale(180), justifyContent: 'center' }} resizeMode="cover">
                                <View style={{ paddingLeft: 20, height: widthScale(70), alignItems: 'center', flexDirection: 'row' }}>
                                    <TouchableOpacity onPress={() => {
                                        this.props.navigation.goBack()
                                    }}>
                                        <Image source={images.LArrowWhite} style={{ height: 30, width: 30, marginLeft: 10 }} />
                                    </TouchableOpacity>
                                    <Text style={{ color: "#fff", fontSize: 20, paddingLeft: 10, fontWeight: '100' }}>Profile Details</Text>
                                    {/* <View style={{flexDirection:"row",paddingTop:10}}><Image source={images.Phone} style={{width:20,height:20}}/><Text style={{color:"#fff",marginLeft:5}}>9717074214</Text></View> */}
                                </View>
                                <View style={{ paddingLeft: 40, height: widthScale(100) }}>
                                    <Text style={{ color: "#fff", fontSize: 20, fontWeight: '400' }}>{this.state.User.name ? this.state.User.name : ""}</Text>
                                    <View style={{ flexDirection: "row", paddingTop: 10 }}><Image source={images.Phone} style={{ width: 20, height: 20 }} /><Text style={{ color: "#fff", marginLeft: 5 }}>{this.props.auth && this.props.auth.Phone ? this.props.auth.Phone : "9717074214"}</Text></View>
                                    {/* <ModalDropdown options={['option 1', 'option 2']}/> */}



                                    {/* <View style={{flexDirection:"row",paddingTop:10}}>
                
            </View> */}
                                </View>


                            </ImageBackground>
                        </View>

                        <View style={{ width: "100%", flex: 3, backgroundColor: "#eeeeee", alignItems: "center" }}>
                            <View style={{ width: "90%", backgroundColor: "#fff", borderRadius: 5, shadowColor: "#777777", shadowOffset: { height: 5, width: 5 }, elevation: 5, marginTop: widthScale(this.state && this.state.User && this.state.User.status ? 10 : -30), marginBottom: widthScale(10), alignItems: "center" }}>
                                <View style={{height:40, backgroundColor:"#E8E8E8", width:"100%",justifyContent:"center",alignItems:"center",borderTopLeftRadius:5,borderTopRightRadius:5}}>
                                    <Text style={{fontSize:17, fontWeight:"bold"}}>Basic Details</Text>
                                </View>
                                <View style={{
                                    // height:50,
                                    marginTop: 20,
                                    width: "80%",
                                    // backgroundColor:'red',
                                    flexDirection: 'row',
                                    // justifyContent:"",
                                    alignItems: "center",
                                    justifyContent: "space-between"
                                }}>
                                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Name</Text>
                                    {/* <TouchableOpacity onPress={() => { */}
                                        {/* this.setState({
                                            edit: !this.state.edit
                                        })
                                    }}> */}
                                        {/* <Text style={{ fontStyle: "italic", color: "#0000FF", textDecorationLine: 'underline' }}>Edit</Text> */}
                                    {/* </TouchableOpacity> */}

                                </View>
                                <View style={{
                                    width: "80%",
                                    // backgroundColor:'red',
                                    flexDirection: 'row',
                                    // justifyContent:"",
                                    alignItems: "center",
                                    justifyContent: "space-between"
                                }}>
                                    {this.state.edit ? <TextInput
                                        style={{
                                            width: '90%',
                                            height: 40,
                                            borderColor: "#c4c4c4",
                                            borderWidth: 1,
                                            borderRadius: 5,
                                            // color: color[this.props.darkMode.colorSchem].TEXT_COLOR,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            paddingLeft: 15,

                                        }}
                                        value={this.state.User.nick_name}
                                        placeholder="Nick Name"
                                        placeholderTextColor="#c2c2c2"
                                        // keyboardType="phone-pad"
                                        onChangeText={val => { this.setCreds(val, "nick_name") }}
                                    /> : <Text>{this.state.User.name}</Text>}
                                </View>
                                <View style={{
                                    // height:50,
                                    marginTop: 20,
                                    width: "80%",
                                    // backgroundColor:'red',
                                    flexDirection: 'row',
                                    // justifyContent:"",
                                    alignItems: "center",
                                    justifyContent: "space-between"
                                }}>
                                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>S/O</Text>
                                </View>
                                <View style={{
                                    width: "80%",
                                    // backgroundColor:'red',
                                    flexDirection: 'row',
                                    // justifyContent:"",
                                    alignItems: "center",
                                    justifyContent: "space-between"
                                }}>
                                    {this.state.edit ? <TextInput
                                        style={{
                                            width: '90%',
                                            height: 40,
                                            borderColor: "#c4c4c4",
                                            borderWidth: 1,
                                            borderRadius: 5,
                                            // color: color[this.props.darkMode.colorSchem].TEXT_COLOR,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            paddingLeft: 15,

                                        }}
                                        value={this.state.User.email}
                                        placeholder="Nick Name"
                                        placeholderTextColor="#c2c2c2"
                                        keyboardType="email-address"
                                        onChangeText={val => { this.setCreds(val, "email") }}
                                    /> : <Text>{this.state.User.so}</Text>}
                                </View>
                                <View style={{
                                    // height:50,
                                    marginTop: 20,
                                    width: "80%",
                                    // backgroundColor:'red',
                                    flexDirection: 'row',
                                    // justifyContent:"",
                                    alignItems: "center",
                                    justifyContent: "space-between"
                                }}>
                                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Date Of Birth</Text>
                                </View>
                                <View style={{
                                    width: "80%",
                                    // backgroundColor:'red',
                                    flexDirection: 'row',
                                    // justifyContent:"",
                                    alignItems: "center",
                                    justifyContent: "space-between"
                                }}>
                                    {this.state.edit ? <TextInput
                                        style={{
                                            width: '90%',
                                            height: 40,
                                            borderColor: "#c4c4c4",
                                            borderWidth: 1,
                                            borderRadius: 5,
                                            // color: color[this.props.darkMode.colorSchem].TEXT_COLOR,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            paddingLeft: 15,

                                        }}
                                        value={this.state.User.area}
                                        placeholder="Nick Name"
                                        placeholderTextColor="#c2c2c2"
                                        // keyboardType="email-address"
                                        onChangeText={val => { this.setCreds(val, "area") }}
                                    /> : <Text>{this.state.User.dob}</Text>}
                                </View>
                                <View style={{
                                    // height:50,
                                    marginTop: 20,
                                    width: "80%",
                                    // backgroundColor:'red',
                                    flexDirection: 'row',
                                    // justifyContent:"",
                                    alignItems: "center",
                                    justifyContent: "space-between"
                                }}>
                                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Gender</Text>
                                </View>
                                <View style={{
                                    width: "80%",
                                    // backgroundColor:'red',
                                    flexDirection: 'row',
                                    // justifyContent:"",
                                    alignItems: "center",
                                    justifyContent: "space-between"
                                }}>
                                    {this.state.edit ? <TextInput
                                        style={{
                                            width: '90%',
                                            height: 40,
                                            borderColor: "#c4c4c4",
                                            borderWidth: 1,
                                            borderRadius: 5,
                                            // color: color[this.props.darkMode.colorSchem].TEXT_COLOR,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            paddingLeft: 15,

                                        }}
                                        value={this.state.User.alternate_number}
                                        placeholder="Nick Name"
                                        placeholderTextColor="#c2c2c2"
                                        keyboardType="number-pad"
                                        onChangeText={val => { this.setCreds(val, "alternate_number") }}
                                    /> : <Text>{this.state.User.gender}</Text>}
                                </View>
                                
                                <View style={{
                                    // height:50,
                                    marginTop: 20,
                                    width: "80%",
                                    // backgroundColor:'red',
                                    flexDirection: 'row',
                                    // justifyContent:"",
                                    alignItems: "center",
                                    justifyContent: "space-between"
                                }}>
                                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Address</Text>
                                </View>
                                <View style={{
                                    width: "80%",
                                    // marginBottom: this.state.edit ? 0 : 40,
                                    // backgroundColor:'red',
                                    flexDirection: 'row',
                                    // justifyContent:"",
                                    alignItems: "center",
                                    justifyContent: "space-between"
                                }}>
                                    {this.state.edit ? <TextInput
                                        style={{
                                            width: '90%',
                                            height: 40,
                                            borderColor: "#c4c4c4",
                                            borderWidth: 1,
                                            borderRadius: 5,
                                            // color: color[this.props.darkMode.colorSchem].TEXT_COLOR,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            paddingLeft: 15,
                                            // backgroundColor:"#eee"

                                        }}
                                        value={this.state.User.address}
                                        placeholder="Nick Name"
                                        placeholderTextColor="#c2c2c2"
                                        // keyboardType=""
                                        // editable={false}
                                        onChangeText={val => { this.setCreds(val, "address") }}
                                    /> : <Text>{this.state.User.address}</Text>}
                                </View>
                                {this.state.User.landmark!=''?<><View style={{
                                    // height:50,
                                    marginTop: 20,
                                    width: "80%",
                                    // backgroundColor:'red',
                                    flexDirection: 'row',
                                    // justifyContent:"",
                                    alignItems: "center",
                                    justifyContent: "space-between"
                                }}>
                                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Land Mark</Text>
                                </View>
                                <View style={{
                                    width: "80%",
                                    // backgroundColor:'red',
                                    flexDirection: 'row',
                                    // justifyContent:"",
                                    alignItems: "center",
                                    justifyContent: "space-between"
                                }}>
                                    {this.state.edit ? <TextInput
                                        style={{
                                            width: '90%',
                                            height: 40,
                                            borderColor: "#c4c4c4",
                                            borderWidth: 1,
                                            borderRadius: 5,
                                            // color: color[this.props.darkMode.colorSchem].TEXT_COLOR,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            paddingLeft: 15,
                                            backgroundColor: "#eee"

                                        }}
                                        value={this.state.User.loan_date}
                                        placeholder="Nick Name"
                                        placeholderTextColor="#c2c2c2"
                                        // keyboardType=""
                                        editable={false}
                                        onChangeText={val => { this.setCreds(val, "loan_date") }}
                                    /> : <Text>{this.state.User.landmark}</Text>}
                                </View></>:null}
                                
                                <View style={{
                                   // height:50,
                                   marginTop: 20,
                                   width: "80%",
                                   // backgroundColor:'red',
                                   flexDirection: 'row',
                                   // justifyContent:"",
                                   alignItems: "center",
                                   justifyContent: "space-between"
                                }}>
                                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>State</Text>
                                </View>
                                <View style={{
                                    width: "80%",
                                    // marginBottom: this.state.edit ? 0 : 40,
                                    // backgroundColor:'red',
                                    flexDirection: 'row',
                                    // justifyContent:"",
                                    alignItems: "center",
                                    justifyContent: "space-between"
                                }}>
                                    {this.state.edit ? <TextInput
                                        style={{
                                            width: '90%',
                                            height: 40,
                                            borderColor: "#c4c4c4",
                                            borderWidth: 1,
                                            borderRadius: 5,
                                            // color: color[this.props.darkMode.colorSchem].TEXT_COLOR,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            paddingLeft: 15,
                                            // backgroundColor:"#eee"

                                        }}
                                        value={this.state.User.address}
                                        placeholder="Nick Name"
                                        placeholderTextColor="#c2c2c2"
                                        // keyboardType=""
                                        // editable={false}
                                        onChangeText={val => { this.setCreds(val, "address") }}
                                    /> : <Text>{this.state.User.state}</Text>}
                                </View>

                                <View style={{
                                   // height:50,
                                   marginTop: 20,
                                   width: "80%",
                                   // backgroundColor:'red',
                                   flexDirection: 'row',
                                   // justifyContent:"",
                                   alignItems: "center",
                                   justifyContent: "space-between"
                                }}>
                                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Pincode</Text>
                                </View>
                                <View style={{
                                    width: "80%",
                                    marginBottom: 20,
                                    // backgroundColor:'red',
                                    flexDirection: 'row',
                                    // justifyContent:"",
                                    alignItems: "center",
                                    justifyContent: "space-between"
                                }}>
                                    {this.state.edit ? <TextInput
                                        style={{
                                            width: '90%',
                                            height: 40,
                                            borderColor: "#c4c4c4",
                                            borderWidth: 1,
                                            borderRadius: 5,
                                            // color: color[this.props.darkMode.colorSchem].TEXT_COLOR,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            paddingLeft: 15,
                                            // backgroundColor:"#eee"

                                        }}
                                        value={this.state.User.address}
                                        placeholder="Nick Name"
                                        placeholderTextColor="#c2c2c2"
                                        // keyboardType=""
                                        // editable={false}
                                        onChangeText={val => { this.setCreds(val, "address") }}
                                    /> : <Text>{this.state.User.pincode}</Text>}
                                </View>
                                {this.state.identity&&this.state.identity.length&&<View style={{height:40, backgroundColor:"#E8E8E8", width:"100%",justifyContent:"center",alignItems:"center"}}>
                                    <Text style={{fontSize:17, fontWeight:"bold"}}>Your Identities</Text>
                                </View>}
                                
                                {this.state.identity&&this.state.identity.map((item,index)=>(
                                <>
                                <View style={{
                                    // height:50,
                                    marginTop: 20,
                                    width: "80%",
                                    // backgroundColor:'red',
                                    flexDirection: 'row',
                                    // justifyContent:"",
                                    alignItems: "center",
                                    justifyContent: "space-between"
                                 }}>
                                     <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{item.type}</Text>
                                 </View>
                                 <View style={{
                                     width: "80%",
                                     marginBottom: (this.state.identity.length-1)==index?20:0,
                                     // backgroundColor:'red',
                                     flexDirection: 'row',
                                     // justifyContent:"",
                                     alignItems: "center",
                                     justifyContent: "space-between"
                                 }}>
                                     {this.state.edit ? <TextInput
                                         style={{
                                             width: '90%',
                                             height: 40,
                                             borderColor: "#c4c4c4",
                                             borderWidth: 1,
                                             borderRadius: 5,
                                             // color: color[this.props.darkMode.colorSchem].TEXT_COLOR,
                                             alignItems: 'center',
                                             justifyContent: 'center',
                                             paddingLeft: 15,
                                             // backgroundColor:"#eee"
 
                                         }}
                                         value={this.state.User.address}
                                         placeholder="Nick Name"
                                         placeholderTextColor="#c2c2c2"
                                         // keyboardType=""
                                         // editable={false}
                                         onChangeText={val => { this.setCreds(val, "address") }}
                                     /> : <Text>{item.value}</Text>}
                                 </View>
                                 </>
                                ))}
                                {this.state.edit && <View style={{
                                    width: "80%",
                                    marginTop: 20,
                                    marginBottom: 40,
                                    // backgroundColor:'red',
                                    flexDirection: 'row',
                                    // justifyContent:"",
                                    alignItems: "center",
                                    justifyContent: "flex-end"
                                }}>
                                    <TouchableOpacity style={{
                                        width: 100,
                                        height: 40,
                                        backgroundColor: "#0000FF",
                                        borderRadius: 5,
                                        alignItems: "center",
                                        justifyContent: "center"
                                    }} onPress={() => {
                                        this.setState({
                                            edit: false
                                        })
                                    }}><Text style={{ color: "#fff" }}>Save</Text></TouchableOpacity>

                                </View>}
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
    loan_detail: { ...state.loan }
});

const ActionCreators = Object.assign(
    { logOut }
);
const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen)