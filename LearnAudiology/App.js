import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Button
} from 'react-native';
import { Header } from 'react-native-elements';
import Audiogram from './src/components/Audiogram';
import { createStackNavigator } from 'react-navigation';

/** Put other loadable screens here **/
import Home from './src/components/Home';
import Test from './src/components/TestPage';
import Graph from './src/components/Audiogram';

/** Stack based navigater**/
const LearnAudiology = createStackNavigator({
  //don't forget commas
  Home: {screen: Home},
  Graph: {screen: Graph},
  Test: {screen: Test}
}, {
  cardStyle: { backgroundColor: '#fff' }
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
