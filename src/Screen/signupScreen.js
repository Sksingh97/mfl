import React, {Component} from 'react';
import {View,Text,TouchableOpacity} from "react-native";
import { connect } from 'react-redux';
import { loginSuccess } from '../Action/authAction';
import { bindActionCreators } from 'redux';


class SignUpScreen extends Component{
    render = () => {
        return(
            <>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity onPress={this.props.actions.loginSuccess}>
                    <Text>Login</Text>
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
    {loginSuccess}
  );
  const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(ActionCreators, dispatch),
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(SignUpScreen)