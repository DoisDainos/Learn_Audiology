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
import AddPoints from './src/components/AddPoints';
import AudiogramList from './src/components/AudiogramList'

/** Stack based navigator**/
const LearnAudiology = createStackNavigator({
  //don't forget commas
  Home: { screen: Home },
  Graph: { screen: Graph },
  Test: { screen: Test },
  AddPoints: { screen: AddPoints },
  AudiogramList: { screen: AudiogramList }
}, {
  cardStyle: { backgroundColor: '#fff' }
});

export default LearnAudiology;
