

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  FlatList,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';



const Loader=() => (<View style={[{
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    opacity: 0.9,
  }]}>
  </View>)


export {Loader}