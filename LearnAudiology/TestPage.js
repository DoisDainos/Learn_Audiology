import React from 'react';
import { StyleSheet, Text, View, Button} from 'react-native';

export default class Test extends React.Component {
  static navigationOptions = {
    title: 'Test Page',
    headerTintColor: '#fff',
    headerStyle: {
      backgroundColor: 'rgb(94, 188, 241)',
    },
  }
  render() {
    const { navigate } = this.props.navigation;
    return ([
      /** rendered page **/
      <Text>This is a test page</Text>
    ]);
  }
}
