import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Icon, Divider } from 'react-native-elements';
import store from '../utils/data';
import styles from '../styles/TextStyles';
import AudiogramPreview from './AudiogramPreview';

// Define modules for data functions
const dataModule = require('../utils/data');
const getGraph = dataModule.getGraph;
const deleteGraph = dataModule.deleteGraph;
const getGraphTitles = dataModule.getGraphTitles;
const clearTitles = dataModule.clearTitles;
const deleteTitle = dataModule.deleteTitle;

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
    this.handleDeletePress = this.handleDeletePress.bind(this);
  }

  /*
   * Before loading component, get all saved audiograms.
   */
  componentWillMount() {
    let that = this;
    // Find all save audiogram titles
    getGraphTitles()
    .then(titles => {
      if (!titles) {
        return;
      }
      that.setState({
        titles: titles
      })
    })
    // Find each audiogram that corresponds to a found name
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

  /*
   * Handle pressing delete button on a graph preview.
   */
  handleDeletePress(title, graph) {
    let index1 = this.state.titles.indexOf(title);
    let index2 = this.state.graphs.indexOf(graph);
    this.setState({
      titles: this.state.titles.filter((_, i) => i !== index1),
      graphs: this.state.graphs.filter((_, i) => i !== index2)
    })
    let that = this;
    return deleteGraph(title)
    .then(result => {
      if (!result) {
        console.log('Failed to delete graph');
        return;
      }
      return deleteTitle(title)
      .then(result => {
        return result;
      })
    })
  }

  /*
   * Navigate to chosen graph.
   */
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
      <View style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <View style={{ flex: 1 }}>
            {
              this.state.titles.length === 0 &&
              <Text style={ styles.heading }>
                No audiograms saved.
              </Text>
            }
            {
              this.state.titles != null && this.state.graphs != null &&
              this.state.graphs.map((graph, index) => (
                <TouchableOpacity
                  key={ index * 1000 }
                  onPress={ () => this.chosenGraphPress(index) }
                >
                  <View
                    style={{ marginTop: 15 }}
                  >
                    <View style={{ flexDirection: 'row' }}>
                      <Text
                        style={ styles.heading }
                      >
                        Title: { this.state.titles[index] }
                      </Text>
                    </View>
                    <View
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}
                    >
                      <AudiogramPreview
                        graph={ this.state.graphs[index] }
                      />
                    </View>
                    <Icon
                      containerStyle={{ position: 'absolute', right: 10 }}
                      component={ TouchableOpacity }
                      reverse
                      reverseColor="rgb(80, 80, 80)"
                      color="#fff"
                      name="delete"
                    />
                    <Text
                      style={ styles.paragraph }
                    >
                      Created: { graph[0].date }, { graph[0].time }
                    </Text>
                    <Icon
                      containerStyle={{ position: 'absolute', right: 10 }}
                      component={ TouchableOpacity }
                      reverse
                      reverseColor="rgb(80, 80, 80)"
                      color="#fff"
                      name="delete"
                      onPress={ () =>
                        this.handleDeletePress(this.state.titles[index], graph)
                      }
                    />
                    <Divider style={{ marginTop: 15 }} />
                  </View>
                </TouchableOpacity>
              ))
            }
          </View>
          <View style={{ height: 150 }}>
          </View>
        </ScrollView>
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
      </View>
    )
  }
}

export default AudiogramList;
