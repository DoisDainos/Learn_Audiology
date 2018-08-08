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

/**
export default class App extends React.Component {
  // Component successfully loaded (TEST)
  /*
  componentDidMount() {
    saveGraph('test', [0, 1, 2]);
    getGraph('test');
    deleteGraph('test');
  }
  /
  render() {
    // TEMP data for audiogram
    const pointsACLeft = [
      {
        Hz: 125,
        dB: 20
      },
      {
        Hz: 500,
        dB: 0
      },
      {
        Hz: 1000,
        dB: 10
      },
      {
        Hz: 2000,
        dB: 30
      },
      {
        Hz: 8000,
        dB: -10
      },
      {
        Hz: 4000,
        dB: 50
      }
    ];
    const pointsACRight = [
      {
        Hz: 125,
        dB: -5
      },
      {
        Hz: 250,
        dB: 0
      },
      {
        Hz: 500,
        dB: 5
      },
      {
        Hz: 1000,
        dB: 10
      },
      {
        Hz: 2000,
        dB: 15
      },
      {
        Hz: 4000,
        dB: 20
      },
      {
        Hz: 8000,
        dB: 25
      }
    ];
    return ([

      <Header
        key={0}
        outerContainerStyles={{ backgroundColor: 'rgb(94, 188, 241)' }}
        centerComponent={{ text: 'Learn Audiology', style: {
            color: '#fff',
            fontSize: 17
        } }}
      />,
      <View key={1} style={styles.container}>
        <Text key={2}>Learn Audiology - Team Tam :)</Text>
      </View>,
      <View key={3} style={ { height: 500 } }>
        <Audiogram
          key={4}
          pointsACRight={ pointsACRight }
          pointsACLeft={ pointsACLeft }
        />
      </View>
    ]);
  }
}
*/
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
