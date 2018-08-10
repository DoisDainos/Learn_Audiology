import React from 'react';
import { StyleSheet, Text, View, Button} from 'react-native';
import { createStackNavigator } from 'react-navigation';

/** Put other loadable screens here **/
import Home from './Home';
import Test from './TestPage';
import Graph from './Audiogram';

/** Stack based navigater**/
const LearnAudiology = createStackNavigator({
  //don't forget commas
  Home: {screen: Home},
  Graph: {screen: Graph},
  Test: {screen: Test}
});

export default LearnAudiology;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
