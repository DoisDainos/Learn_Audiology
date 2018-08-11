import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';
import store from '../utils/data';

// Define modules for data functions
const dataModule = require('../utils/data');
const getGraph = dataModule.getGraph;
const deleteGraph = dataModule.deleteGraph;
const getGraphTitles = dataModule.getGraphTitles;

class AudiogramList extends React.Component {
  static navigationOptions = {
    title: 'Audiograms',
    headerTintColor: '#fff',
    headerStyle: {
      backgroundColor: 'rgb(94, 188, 241)',
    }
  }

  state = {
    titles: []
  }

  constructor(props) {
    super(props);
    this.newGraphPress = this.newGraphPress.bind(this);
  }

  componentWillMount() {
    let that = this;
    getGraphTitles()
    .then(titles => {
      that.setState({
        titles: titles
      })
    });
  }

  componentDidMount() {
    console.log('TITLES AFTER', this.state.titles, 'HMMM');
  }

  /*
   * Handle press of new graph icon.
   */
  newGraphPress() {
    this.props.navigation.navigate('Graph');
  }

  render() {
    return (
      <ScrollView
        style={{ height: '100%' }}
        contentContainerStyle={{ flex: 1 }}
      >
        <View style={{ flex: 1 }}>
          <Icon
            containerStyle={{
              position: 'absolute',
              bottom: 10,
              right: 10
            }}
            size={ 30 }
            name="add"
            component={ TouchableOpacity }
            onPress={ this.newGraphPress }
            reverse
            color="rgb(0, 210, 27)"
            reverseColor="#fff"
          />
          {
            this.state.titles.map((title, index) => (
              <Text key={ index * 1000 }>{ title }</Text>
            ))
          }
        </View>
      </ScrollView>
    )
  }
}

export default AudiogramList;
