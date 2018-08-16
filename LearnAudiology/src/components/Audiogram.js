import React from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableHighlight,
  TouchableOpacity
} from 'react-native';
import  { XAxis, YAxis } from 'react-native-svg-charts';
import { Svg } from 'react-native-svg';
import { Button, Icon, Badge } from 'react-native-elements';
import Grid from './audiogram_parts/Grid';
import Points from './audiogram_parts/Points';
import SymbolsModal from './audiogram_parts/SymbolsModal';
import PointsModal from './audiogram_parts/PointsModal';
import SaveFormModal from './audiogram_parts/SaveFormModal';

// Define modules for data functions
const dataModule = require('../utils/data');
const getGraph = dataModule.getGraph;
const saveGraph = dataModule.saveGraph;
const deleteGraph = dataModule.deleteGraph;
const clearTitles = dataModule.clearTitles;
const deleteTitle = dataModule.deleteTitle;

/*
 * Props:
 * - title: appears at top of screen
 * - pointsACRight
 * - pointsACLeft
 * - pointsBCRight
 * - pointsBCLeft
 * - TODO pointsACRightMask [icon: 'https://i.imgur.com/PFXczIl.png']
 * - TODO pointsACLeftMask [icon: 'https://i.imgur.com/6KrOAuH.png']
 * - TODO pointsBCRightMask [icon: 'https://i.imgur.com/u4Zfi3I.png?1']
 * - TODO pointsBCLeftMask [icon: 'https://i.imgur.com/PO8NtHf.png?1']
 * - TODO pointsNRRight [icon: 'https://i.imgur.com/Wmg6zem.png']
 * - TODO pointsNRLeft [icon: 'https://i.imgur.com/N4NDGBm.png']
 */
class Audiogram extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.title,
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: 'rgb(94, 188, 241)',
      }
    };
  };

  state = {
    symbolsVisible: false,
    pointsVisible: false,
    saveFormVisible: false,
    pointsToModal: [],
    pointsACRight: [],
    pointsACLeft: [],
    pointsBCRight: [],
    pointsBCLeft: [],
    title: 'New Audiogram'
  };

  constructor(props) {
    super(props);
    this.addPointsPress = this.addPointsPress.bind(this);
    this.savePress = this.savePress.bind(this);
    this.editPress = this.editPress.bind(this);
  }

  /*
   * Before loading component, takes any points passed as props in navigation.
   */
  componentWillMount() {
    if (this.props.navigation.state.params.graph != null) {
      let graph = this.props.navigation.state.params.graph[0];
      this.setState({
        title: this.props.navigation.state.params.title,
        pointsACRight: graph.points[0],
        pointsACLeft: graph.points[1],
        pointsBCRight: graph.points[2],
        pointsBCLeft: graph.points[3]
      })
    }
  }

  /*
   * Handle pressing save icon.
   */
  savePress() {
    this.setState({
      saveFormVisible: true
    })
  }

  setTitle(title) {
    this.setState({
      title: title
    })
  }

  /*
   * Handle pressing of add points button.
   */
  addPointsPress() {
    this.props.navigation.navigate(
      'AddPoints',
      {
        title: 'Add points',
        editing: false,
        addPointACRight: this.addPointACRight.bind(this),
        addPointACLeft: this.addPointACLeft.bind(this),
        addPointBCRight: this.addPointBCRight.bind(this),
        addPointBCLeft: this.addPointBCLeft.bind(this)
      }
    );
  }

  /*
   * Add to air conduction right ear unmasked point array.
   */
  addPointACRight(point) {
    let points = this.state.pointsACRight;
    for (let i=0; i<points.length; i++) {
      if (points[i].Hz === point.Hz) {
        points[i] = point;
        this.setState({
          pointsACRight: points
        })
        return;
      }
    }
    this.setState({
      pointsACRight: points.concat([point])
    });
  }

  /*
   * Add to air conduction left ear unmasked point array.
   */
  addPointACLeft(point) {
    let points = this.state.pointsACLeft;
    for (let i=0; i<points.length; i++) {
      if (points[i].Hz === point.Hz) {
        points[i] = point;
        this.setState({
          pointsACLeft: points
        })
        return;
      }
    }
    this.setState({
      pointsACLeft: this.state.pointsACLeft.concat([point])
    });
  }

  /*
   * Add to bone conduction right ear unmasked point array.
   */
  addPointBCRight(point) {
    let points = this.state.pointsBCRight;
    for (let i=0; i<points.length; i++) {
      if (points[i].Hz === point.Hz) {
        points[i] = point;
        this.setState({
          pointsBCRight: points
        })
        return;
      }
    }
    this.setState({
      pointsBCRight: this.state.pointsBCRight.concat([point])
    });
  }

  /*
   * Add to bone conduction left ear unmasked point array.
   */
  addPointBCLeft(point) {
    let points = this.state.pointsBCLeft;
    for (let i=0; i<points.length; i++) {
      if (points[i].Hz === point.Hz) {
        points[i] = point;
        this.setState({
          pointsBCLeft: points
        })
        return;
      }
    }
    this.setState({
      pointsBCLeft: this.state.pointsBCLeft.concat([point])
    });
  }

  /*
   * Set save form modal visibility (true/false).
   */
  setSaveFormVisible(visible) {
    this.setState({ saveFormVisible: visible });
  }

  /*
   * Set symbols modal visibility (true/false).
   */
  setSymbolsVisible(visible) {
    this.setState({ symbolsVisible: visible });
  }

  /*
   * Set symbols modal visibility (true/false).
   */
  setPointsVisible(visible) {
    this.setState({ pointsVisible: visible });
  }

  /*
   * Compare two points, point with smaller frequency Hz will be first.
   */
  comparePoints(a, b) {
    if (a.Hz < b.Hz) return -1;
    if (a.Hz > b.Hz) return 1;
    return 0;
  }

  /*
   * Remove a point given its description.
   * Params:
   * - frequncy: integer value for Hz
   * - conduction: 'air' or 'bone'
   * - ear: 'left' or 'right'
   * - masked: is point masked boolean value
   */
  removePoint(frequency, conduction, ear, masked) {
    if (conduction === 'air' && ear === 'right' && masked === false) {
      for (var i=0; i<this.state.pointsACRight.length; i++) {
        if (this.state.pointsACRight[i].Hz === frequency) {
          var index = this.state.pointsACRight.indexOf(
            this.state.pointsACRight[i]
          );
          this.setState({
            pointsACRight: this.state.pointsACRight.filter((_, j) => j !== index)
          })
          return;
        }
      }
    }
    if (conduction === 'air' && ear === 'left' && masked === false) {
      for (var i=0; i<this.state.pointsACLeft.length; i++) {
        if (this.state.pointsACLeft[i].Hz === frequency) {
          var index = this.state.pointsACLeft.indexOf(
            this.state.pointsACLeft[i]
          );
          this.setState({
            pointsACLeft: this.state.pointsACLeft.filter((_, j) => j !== index)
          })
          return;
        }
      }
    }
    if (conduction === 'bone' && ear === 'right' && masked === false) {
      for (var i=0; i<this.state.pointsBCRight.length; i++) {
        if (this.state.pointsBCRight[i].Hz === frequency) {
          var index = this.state.pointsBCRight.indexOf(
            this.state.pointsBCRight[i]
          );
          this.setState({
            pointsBCRight: this.state.pointsBCRight.filter((_, j) => j !== index)
          })
          return;
        }
      }
    }
    if (conduction === 'bone' && ear === 'left' && masked === false) {
      for (var i=0; i<this.state.pointsBCLeft.length; i++) {
        if (this.state.pointsBCLeft[i].Hz === frequency) {
          var index = this.state.pointsBCLeft.indexOf(
            this.state.pointsBCLeft[i]
          );
          this.setState({
            pointsBCLeft: this.state.pointsBCLeft.filter((_, j) => j !== index)
          })
          return;
        }
      }
    }
  }

  /*
   * Replace a point given its description, provide new hearing level.
   * Params:
   * - frequency: integer value for Hz
   * - conduction: 'air' or 'bone'
   * - ear: 'left' or 'right'
   * - masked: is point masked boolean value
   * - newLevel: new dB hearing level for the point
   */
  replacePoint(frequency, conduction, ear, masked, newLevel) {
    if (conduction === 'air' && ear === 'right' && masked === false) {
      for (var i=0; i<this.state.pointsACRight.length; i++) {
        if (this.state.pointsACRight[i].Hz === frequency) {
          this.state.pointsACRight[i].dB = newLevel;
        }
      }
    }
    if (conduction === 'air' && ear === 'left' && masked === false) {
      for (var i=0; i<this.state.pointsACLeft.length; i++) {
        if (this.state.pointsACLeft[i].Hz === frequency) {
          this.state.pointsACLeft[i].dB = newLevel;
        }
      }
    }
    if (conduction === 'bone' && ear === 'right' && masked === false) {
      for (var i=0; i<this.state.pointsBCRight.length; i++) {
        if (this.state.pointsBCRight[i].Hz === frequency) {
          this.state.pointsBCRight[i].dB = newLevel;
        }
      }
    }
    if (conduction === 'bone' && ear === 'left' && masked === false) {
      for (var i=0; i<this.state.pointsBCLeft.length; i++) {
        if (this.state.pointsBCLeft[i].Hz === frequency) {
          this.state.pointsBCLeft[i].dB = newLevel;
        }
      }
    }
  }

  /*
   * Return array of all points with a particular frequency.
   */
  getPointsAtFreq(frequency) {
    points = [];
    for (var i=0; i<this.state.pointsACRight.length; i++) {
      if (this.state.pointsACRight[i].Hz === frequency) {
        points.push(this.state.pointsACRight[i]);
      }
    }
    for (var i=0; i<this.state.pointsACLeft.length; i++) {
      if (this.state.pointsACLeft[i].Hz === frequency) {
        points.push(this.state.pointsACLeft[i]);
      }
    }
    for (var i=0; i<this.state.pointsBCRight.length; i++) {
      if (this.state.pointsBCRight[i].Hz === frequency) {
        points.push(this.state.pointsBCRight[i]);
      }
    }
    for (var i=0; i<this.state.pointsBCLeft.length; i++) {
      if (this.state.pointsBCLeft[i].Hz === frequency) {
        points.push(this.state.pointsBCLeft[i]);
      }
    }
    return points;
  }

  /*
   * Display the modal showing points at a selected frequency.
   */
  displayPointsModal(points) {
    this.setState({
      pointsVisible: !this.state.pointsVisible,
      pointsToModal: points
    });
  }

  editPress(point) {
    this.setState({
      pointsVisible: false
    })
    this.props.navigation.navigate(
      'AddPoints',
      {
        title: 'Edit point',
        editing: true,
        parent: this,
        point: point,
        addPointACRight: this.addPointACRight.bind(this),
        addPointACLeft: this.addPointACLeft.bind(this),
        addPointBCRight: this.addPointBCRight.bind(this),
        addPointBCLeft: this.addPointBCLeft.bind(this)
      }
    );
  }

  render() {
    // Add necessary information to each air conduction, right ear point
    for (var i=0; i<this.state.pointsACRight.length; i++) {
      this.state.pointsACRight[i]['colour'] = 'rgb(255, 6, 0)';
      this.state.pointsACRight[i]['image'] =
        'https://i.imgur.com/BtWXB20.png';
      this.state.pointsACRight[i]['conduction'] = 'air';
      this.state.pointsACRight[i]['ear'] = 'right';
      this.state.pointsACRight[i]['masked'] = false;
    }
    // Sort array of points
    this.state.pointsACRight.sort(this.comparePoints);

    // Add necessary information to each air conduction, left ear point
    for (var i=0; i<this.state.pointsACLeft.length; i++) {
      this.state.pointsACLeft[i]['colour'] = 'rgb(0, 26, 255)';
      this.state.pointsACLeft[i]['image'] =
        'https://i.imgur.com/VqJdazw.png';
      this.state.pointsACLeft[i]['conduction'] = 'air';
      this.state.pointsACLeft[i]['ear'] = 'left';
      this.state.pointsACLeft[i]['masked'] = false;
    }
    // Sort array of points
    this.state.pointsACLeft.sort(this.comparePoints);

    // Add necessary information to each bone conduction, right ear point
    for (var i=0; i<this.state.pointsBCRight.length; i++) {
      this.state.pointsBCRight[i]['colour'] = 'rgb(255, 6, 0)';
      this.state.pointsBCRight[i]['image'] =
        'https://i.imgur.com/kv5twnR.png';
      this.state.pointsBCRight[i]['conduction'] = 'bone';
      this.state.pointsBCRight[i]['ear'] = 'right';
      this.state.pointsBCRight[i]['masked'] = false;
    }
    // Sort array of points
    this.state.pointsBCRight.sort(this.comparePoints);

    // Add necessary information to each bone conduction, left ear point
    for (var i=0; i<this.state.pointsBCLeft.length; i++) {
      this.state.pointsBCLeft[i]['colour'] = 'rgb(0, 26, 255)';
      this.state.pointsBCLeft[i]['image'] =
        'https://i.imgur.com/2q2Nglb.png';
      this.state.pointsBCLeft[i]['conduction'] = 'bone';
      this.state.pointsBCLeft[i]['ear'] = 'left';
      this.state.pointsBCLeft[i]['masked'] = false;
    }
    // Sort array of points
    this.state.pointsBCLeft.sort(this.comparePoints);

    // Reference values for vertical gridlines (frequencies)
    const yGridLines = [ '5%', '14.28%', '28.13%', '41.98%', '55.83%',
      '69.68%', '83.53%', '97.38%' ];

    const dBsMain = [ -10, 0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110,
      120 ];
    /* Values for hearing levels used for labels, fixes issue where negative
     * value would affect style */
    const dBsLabels = [ ' -10', ' 0', ' 10', ' 20', ' 30', ' 40', ' 50', ' 60',
      ' 70', ' 80', ' 90', '100', '110', '120']
    // Minor values for hearing levels, used for grid lines
    const dBsMinor = [ -5, 5, 15, 25, 35, 45, 55, 65, 75, 85, 95, 105, 115 ];

    // Create reference values for x grid lines
    let n = 4.35;
    var toPush = '';
    toPush += n.toString() + '%';
    var xGridLines = [];
    xGridLines.push(toPush);
    for (let i=0; i<dBsMinor.length + dBsMain.length; i++) {
      n += 3.617;
      toPush = n.toString() + '%';
      xGridLines.push(toPush);
    }

    // Frequencies for points
    const frequencies = [ 125, 250, 500, 1000, 2000, 4000, 8000 ];
    // Frequencies for grid lines, contains 0 for initial vertical grid line
    const frequenciesGrid = [ 0, 125, 250, 500, 1000, 2000, 4000, 8000 ];

    // Indexes for reverse hearing levels
    const indexes = [ 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0 ];

    return (
      <ScrollView>
        <View style={{
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          position: 'absolute',
          marginLeft: 20
        }}>
          <Icon
            name="save"
            reverse
            color="rgb(94, 188, 241)"
            reverseColor="#fff"
            size={ 20 }
            raised
            component={ TouchableOpacity }
            onPress={ this.savePress }
          />
        </View>
        <View style={{
          flexDirection: 'row',
          alignItems: 'flex-end',
          justifyContent: 'flex-end',
          height: 50,
          marginRight: 20
        }}>
          <Badge
            containerStyle={{
              borderColor: 'rgb(94, 188, 241)',
              borderWidth: 2,
              backgroundColor: '#fff',
              flexDirection: 'row'
            }}
            onPress={() => this.setSymbolsVisible(!this.state.symbolsVisible) }
          >
            <Icon
              name="adjust"
              color="rgb(94, 188, 241)"
            />
            <Text style={{ color: 'rgb(94, 188, 241)' }}> SYMBOLS</Text>
          </Badge>
        </View>
        <SaveFormModal
          visible={ this.state.saveFormVisible }
          parent={ this }
        />
        <SymbolsModal visible={ this.state.symbolsVisible } parent={ this } />
        <PointsModal
          visible={ this.state.pointsVisible }
          points={ this.state.pointsToModal }
          parent={ this }
        />
        <View style={{ flexDirection: 'row' }}>
          <View style={{ position: 'absolute', paddingLeft: 10, paddingTop: 8,
          paddingBottom: 5, height: 440, flexDirection: 'row' }}>
            <YAxis
              data={ dBsMain }
              style={{ marginBottom: 30 }}
              formatLabel={ (value, index) => dBsLabels[indexes[index]] }
              contentInset={{ top: 10, bottom: 10 }}
              svg={{ fontSize: 8, fill: 'grey' }}
            />
          </View>
          <View style={{ paddingRight: 20, paddingLeft: 15, flex: 1 }}>
            <Svg
              height="400"
              width="100%"
            >
              <Grid
                xGridLines={ xGridLines }
                yGridLines={ yGridLines }
                dBsMain={ dBsMain }
                dBsMinor={ dBsMinor }
                frequencies={ frequenciesGrid }
                parent={ this }
              />
              {this.state.pointsACRight.length > 0 &&
                <Points
                  data={ this.state.pointsACRight }
                  xGridLines={ xGridLines }
                  yGridLines={ yGridLines }
                />
              }
              {this.state.pointsACLeft.length > 0 &&
                <Points
                  data={ this.state.pointsACLeft }
                  xGridLines={ xGridLines }
                  yGridLines={ yGridLines }
                />
              }
              {this.state.pointsBCRight.length > 0 &&
                <Points
                  data={ this.state.pointsBCRight }
                  xGridLines={ xGridLines }
                  yGridLines={ yGridLines }
                />
              }
              {this.state.pointsBCLeft.length > 0 &&
                <Points
                  data={ this.state.pointsBCLeft }
                  xGridLines={ xGridLines }
                  yGridLines={ yGridLines }
                />
              }
            </Svg>
            <XAxis
              style={{ marginHorizontal: -10, height: 30, paddingTop: 3,
                paddingLeft: 45, paddingRight: 10 }}
              data={ frequencies }
              formatLabel={ (value, index) => frequencies[index] }
              contentInset={{ left: 10, right: 10 }}
              svg={{ fontSize: 8, fill: 'grey' }}
            />
          </View>
        </View>
        <View style={{
          justifyContent: 'center',
          flexDirection: 'row',
          alignItems: 'center'
        }}>
          <View
            style={{
              justifyContent: 'center',
              height: 70
            }}
          >
            <Button
              raised
              icon={{ name: 'timeline' }}
              title="ADD POINTS"
              backgroundColor="rgb(94, 188, 241)"
              onPress={ this.addPointsPress }
            />
          </View>
          <View style={{ right: 0, position: 'absolute', marginRight: 20 }}>
            <Badge
              containerStyle={{
                borderColor: 'rgb(94, 188, 241)',
                borderWidth: 2,
                backgroundColor: '#fff'
              }}
              onPress={() => {
                console.log('pressed mask');
              }}
            >
              <Icon
                name="pulse"
                type="material-community"
                size={ 15 }
                color="rgb(94, 188, 241)"
              />
              <Text style={{ fontSize: 12, color: 'rgb(94, 188, 241)' }}>
                MASK
              </Text>
            </Badge>
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default Audiogram;
