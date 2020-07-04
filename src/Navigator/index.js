import * as React from 'react';
import { Text, View, Button,StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
// import ToggleSwitch from 'toggle-switch-react-native'
import { connect } from 'react-redux';
import { loginSuccess } from '../Action/authAction';
import { toggleColor } from '../Action/darkModeAction'
import { bindActionCreators } from 'redux';
import { color } from "../Constants/color";
import { LoginScreen, SettingScreen, HomeScreen, SignUpScreen, MainScreen, MyAccount, LoanDetails, ProfileDetail, PaymentHistory, MapView } from "../Screen"
import { ReloadInstructions } from 'react-native/Libraries/NewAppScreen';
import loginScreen from '../Screen/loginScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import myAccount from '../Screen/myAccount';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


class App extends React.Component {
  componentDidMount() {
    console.log("CURRENT STATE :", this.props.darkMode.colorSchem);
  }

  renderTab = (lable, component) => {
    return (
      <Tab.Screen name={lable} component={component} options={{
        headerTitle: props => <Text>lable</Text>,
        // headerRight: () => (
          // <ToggleSwitch
          //   isOn={this.props.darkMode.colorSchem == "Dark" ? true : false}
          //   onColor="green"
          //   offColor="red"
          //   label=""
          //   labelStyle={{ color: color[this.props.darkMode.colorSchem].TOGGLE_LABLE, fontWeight: "400" }}
          //   size="small"
          //   onToggle={isOn => this.props.actions.toggleColor(isOn ? "Dark" : "Light")}
          // />
        // ),
        headerStyle: {
          backgroundColor: color[this.props.darkMode.colorSchem].HEADER_BACKGROUND,
          color: color[this.props.darkMode.colorSchem].HEADER_TEXT,
          elevation: 0,
          shadow: "none"
        }
      }} />
    )
  }

  renderStack = (lable, component) => {
    return (
      <Stack.Screen name={lable} component={component} options={{
        headerTitle: props => <Text style={{
          color: color[this.props.darkMode.colorSchem].HEADER_TEXT
        }}>{lable}</Text>,
        headerStyle: {
          backgroundColor: color[this.props.darkMode.colorSchem].HEADER_BACKGROUND,
          color: color[this.props.darkMode.colorSchem].HEADER_TEXT,
          elevation: 0,
          shadow: "none",
        }
      }} />
    )
  }

  renderMyAccountStack = () => {
    return <>
    <Stack.Navigator
          screenOptions={{
            headerShown: false
          }}
          >
              {this.renderStack("My Account", MyAccount)}
              {this.renderStack("Loan Details", LoanDetails)}
              {this.renderStack("Profile Details", ProfileDetail)}

            </Stack.Navigator>
            </>
    
  }

  render = () => {
    return (
      <>
        <StatusBar color={color[this.props.darkMode.colorSchem].STATUS_BAR} backgroundColor={color[this.props.darkMode.colorSchem].STATUS_BAR} barStyle={color[this.props.darkMode.colorSchem].STATUS_BAR_CONTENT}/>
        <NavigationContainer>
          {this.props.auth.AuthStatus ? <Tab.Navigator screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
                ? 'md-home'
                : 'md-home';
            } else if (route.name === 'My Account') {
              iconName = focused ? 'md-contact' : 'md-contact';
            } else if(route.name === 'Payment History'){
              iconName = focused ? 'md-analytics' : 'md-analytics';
            } else if(route.name == 'Data'){
              iconName = focused ? 'md-filing' : 'md-filing';

            }else if(route.name == 'More'){
              iconName = focused ? 'md-menu' : 'md-menu';

            }else if (route.name == 'Reach Us'){
              iconName = focused ? 'md-pin' : 'md-pin';
              
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          backgroundColor:color[this.props.darkMode.colorSchem].HEADER_BACKGROUND,
          color: color[this.props.darkMode.colorSchem].HEADER_TEXT,
          elevation: 0,
          shadow: "none",
          activeTintColor: 'tomato',
          inactiveTintColor: '#1B7DCA',
          
        }}>
            {this.renderTab("Home", MainScreen)}
            {this.renderTab("Payment History", PaymentHistory)}
            {/* {this.renderTab("Data", HomeScreen)} */}
            {/* {this.renderTab("More", SettingScreen)} */}
            {this.renderTab("My Account", this.renderMyAccountStack)}
            {this.renderTab("Reach Us", MapView)}

            
          </Tab.Navigator> : <Stack.Navigator
          screenOptions={{
            headerShown: false
          }}
          >
              {/* {this.renderStack("Loan Details", ProfileDetail)} */}
              {this.renderStack("Login", LoginScreen)}
              {this.renderStack("SignUp", SignUpScreen)}
            </Stack.Navigator>}
        </NavigationContainer>
      </>
    );
  }
}
const mapStateToProps = state => ({
  auth: { ...state.auth },
  darkMode: { ...state.DarkMode }
});

const ActionCreators = Object.assign(
  { loginSuccess, toggleColor }
);
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(App)