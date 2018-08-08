import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Header } from 'react-native-elements';
import Audiogram from './src/components/Audiogram'

const dataModule = require('./src/utils/data');
const getGraph = dataModule.getGraph;
const saveGraph = dataModule.saveGraph;
const deleteGraph = dataModule.deleteGraph;

export default class Graph extends React.Component {
  static navigationOptions = {
    title: 'Audiogram',
    headerTintColor: '#fff',
    headerStyle: {
      backgroundColor: 'rgb(94, 188, 241)',
    },
  }
  // Component successfully loaded (TEST)
  /*
  componentDidMount() {
    saveGraph('test', [0, 1, 2]);
    getGraph('test');
    deleteGraph('test');
  }
  */
  render() {
    // TEMP data for audiogram
    const pointsACLeft = [
      {
        Hz: 250,
        dB: 10
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
