import React, {Component} from 'react';
import {View,Text,TouchableOpacity} from "react-native";
import { connect } from 'react-redux';
import { logOut } from '../Action/authAction';
import { bindActionCreators } from 'redux';


class SettingScreen extends Component{
    render = () => {
        return(
            <>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity onPress={this.props.actions.logOut}>
                    <Text>Logout</Text>
                </TouchableOpacity>
            </View>
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
  
  export default connect(mapStateToProps, mapDispatchToProps)(SettingScreen)