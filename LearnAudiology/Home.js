import React from 'react';
import { StyleSheet, Text, View, Button} from 'react-native';

export default class Home extends React.Component {
  static navigationOptions = {
    title: 'LearnAudiology',
    headerTintColor: '#fff',
    headerStyle: {
      backgroundColor: 'rgb(94, 188, 241)',
    },
  }
  render() {
    const { navigate } = this.props.navigation;
    return ([
      <Text textAlign='center'>Press a Button</Text>,
      <Button onPress={() => navigate('Graph')} title='Audiogram'/>,
      <Button onPress={() => navigate('Test')} title='Saved Graphs'/>,
      <Button onPress={() => navigate('Test')} title='Test Yourself'/>,
      <Button onPress={() => navigate('Test')} title='Settings'/>,
    ]);
  }
}
