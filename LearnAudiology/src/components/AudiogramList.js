import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Icon, Divider } from 'react-native-elements';
import store from '../utils/data';
import styles from '../styles/TextStyles';

// Define modules for data functions
const dataModule = require('../utils/data');
const getGraph = dataModule.getGraph;
const deleteGraph = dataModule.deleteGraph;
const getGraphTitles = dataModule.getGraphTitles;
const clearTitles = dataModule.clearTitles;

class AudiogramList extends React.Component {
  static navigationOptions = {
    title: 'Audiograms',
    headerTintColor: '#fff',
    headerStyle: {
      backgroundColor: 'rgb(94, 188, 241)',
    }
  }

  state = {
    titles: [],
    graphs: []
  }

  constructor(props) {
    super(props);
    this.newGraphPress = this.newGraphPress.bind(this);
    this.chosenGraphPress = this.chosenGraphPress.bind(this);
  }

  componentWillMount() {
    let that = this;
    getGraphTitles()
    .then(titles => {
      if (!titles) {
        return;
      }
      that.setState({
        titles: titles
      })
    })
    .then(() => {
      if (that.state.titles == null) {
        return;
      }
      for (let i=0; i<that.state.titles.length; i++) {
        getGraph(that.state.titles[i])
        .then(graph => {
          that.setState({
            graphs: that.state.graphs.concat([graph])
          })
        })
      }
    })
  }

  chosenGraphPress(index) {
    this.props.navigation.navigate(
      'Graph',
      {
        graph: this.state.graphs[index],
        title: this.state.titles[index]
      }
    )
  }

  /*
   * Handle press of new graph icon.
   */
  newGraphPress() {
    this.props.navigation.navigate(
      'Graph',
      {
        title: 'New Audiogram'
      }
    );
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
            raised
          />
          {
            this.state.titles != null && this.state.graphs != null &&
            this.state.graphs.map((graph, index) => (
              <View
                key={ index * 1000 }
                style={{ marginTop: 15 }}
              >
                <Text
                  style={ styles.heading }
                >
                  Title: { this.state.titles[index] }
                </Text>
                <Text
                  style={ styles.paragraph }
                >
                  Created: { graph[0].date } { graph[0].time }
                </Text>
                <Icon
                  containerStyle={{ position: 'absolute', right: 10 }}
                  component={ TouchableOpacity }
                  name="navigate-next"
                  reverse
                  raised
                  reverseColor="#fff"
                  color="rgb(94, 188, 241)"
                  onPress={ () => this.chosenGraphPress(index) }
                />
                <Divider style={{ marginTop: 15 }} />
              </View>
            ))
          }
        </View>
      </ScrollView>
    )
  }
}

export default AudiogramList;
