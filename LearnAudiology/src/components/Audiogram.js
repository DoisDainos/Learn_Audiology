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

// Define modules for data functions
const dataModule = require('../utils/data');
const getGraph = dataModule.getGraph;
const saveGraph = dataModule.saveGraph;
const deleteGraph = dataModule.deleteGraph;

/*
 * Props:
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
  static navigationOptions = {
    title: 'New Audiogram',
    headerTintColor: '#fff',
    headerStyle: {
      backgroundColor: 'rgb(94, 188, 241)',
    }
  }

  state = {
    symbolsVisible: false,
    pointsVisible: false,
    pointsToModal: [],
    pointsACRight: [],
    pointsACLeft: [],
    pointsBCRight: [],
    pointsBCLeft: []
  };

  constructor(props) {
    super(props);
    this.addPointsPress = this.addPointsPress.bind(this);
    this.savePress = this.savePress.bind(this);
  }

  /*
   * Handle pressing save icon.
   */
  savePress() {
    console.log('Pressed save');
    let points = [];
    points.push(this.state.pointsACRight);
    points.push(this.state.pointsACLeft);
    points.push(this.state.pointsBCRight);
    points.push(this.state.pointsBCLeft);
    console.log(points);
  }

  /*
   * Handle pressing of add points button.
   */
  addPointsPress() {
    this.props.navigation.navigate(
      'AddPoints',
      {
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
    this.setState({
      pointsACRight: this.state.pointsACRight.concat([point])
    });
  }

  /*
   * Add to air conduction left ear unmasked point array.
   */
  addPointACLeft(point) {
    this.setState({
      pointsACLeft: this.state.pointsACLeft.concat([point])
    });
  }

  /*
   * Add to bone conduction right ear unmasked point array.
   */
  addPointBCRight(point) {
    this.setState({
      pointsBCRight: this.state.pointsBCRight.concat([point])
    });
  }

  /*
   * Add to bone conduction left ear unmasked point array.
   */
  addPointBCLeft(point) {
    this.setState({
      pointsBCLeft: this.state.pointsBCLeft.concat([point])
    });
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
    if (conduction === 'air' && ear === 'left' && masked === false) {
      for (var i=0; i<this.state.pointsACRight.length; i++) {
        if (this.state.pointsACRight[i].Hz === frequency) {
          var index = this.state.pointsACRight.indexOf(
            this.state.pointsACRight[i]
          );
          if (index > -1) {
            this.state.pointsACRight.splice(index, 1);
            return;
          }
        }
      }
    }
    if (conduction === 'air' && ear === 'left' && masked === false) {
      for (var i=0; i<this.state.pointsACLeft.length; i++) {
        if (this.state.pointsACLeft[i].Hz === frequency) {
          var index = this.state.pointsACLeft.indexOf(
            this.state.pointsACLeft[i]
          );
          if (index > -1) {
            this.state.pointsACLeft.splice(index, 1);
            return;
          }
        }
      }
    }
    if (conduction === 'bone' && ear === 'right' && masked === false) {
      for (var i=0; i<this.state.pointsBCRight.length; i++) {
        if (this.state.pointsBCRight[i].Hz === frequency) {
          var index = this.state.pointsBCRight.indexOf(
            this.state.pointsBCRight[i]
          );
          if (index > -1) {
            this.state.pointsBCRight.splice(index, 1);
            return;
          }
        }
      }
    }
    if (conduction === 'bone' && ear === 'left' && masked === false) {
      for (var i=0; i<this.state.pointsBCLeft.length; i++) {
        if (this.state.pointsBCLeft[i].Hz === frequency) {
          var index = this.state.pointsBCLeft.indexOf(
            this.state.pointsBCLeft[i]
          );
          if (index > -1) {
            this.state.pointsBCLeft.splice(index, 1);
            return;
          }
        }
      }
    }
  }

  /*
   * Replace a point given its description, provide new hearing level.
   * Params:
   * - frequncy: integer value for Hz
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

  displayPointsModal(points) {
    this.setState({
      pointsVisible: !this.state.pointsVisible,
      pointsToModal: points
    });
  }

  render() {
    // Add necessary information to each air conduction, right ear point
    for (var i=0; i<this.state.pointsACRight.length; i++) {
      this.state.pointsACRight[i]['colour'] = 'rgb(255, 6, 0)';
      this.state.pointsACRight[i]['image'] =
        'https://i.imgur.com/BtWXB20.png'
      this.state.pointsACRight[i]['masked'] = false;
    }
    // Sort array of points
    this.state.pointsACRight.sort(this.comparePoints);

    // Add necessary information to each air conduction, left ear point
    for (var i=0; i<this.state.pointsACLeft.length; i++) {
      this.state.pointsACLeft[i]['colour'] = 'rgb(0, 26, 255)';
      this.state.pointsACLeft[i]['image'] =
        'https://i.imgur.com/VqJdazw.png';
      this.state.pointsACLeft[i]['masked'] = false;
    }
    // Sort array of points
    this.state.pointsACLeft.sort(this.comparePoints);

    // Add necessary information to each bone conduction, right ear point
    for (var i=0; i<this.state.pointsBCRight.length; i++) {
      this.state.pointsBCRight[i]['colour'] = 'rgb(255, 6, 0)';
      this.state.pointsBCRight[i]['image'] =
        'https://i.imgur.com/kv5twnR.png'
      this.state.pointsBCRight[i]['masked'] = false;
    }
    // Sort array of points
    this.state.pointsBCRight.sort(this.comparePoints);

    // Add necessary information to each bone conduction, left ear point
    for (var i=0; i<this.state.pointsBCLeft.length; i++) {
      this.state.pointsBCLeft[i]['colour'] = 'rgb(0, 26, 255)';
      this.state.pointsBCLeft[i]['image'] =
        'https://i.imgur.com/2q2Nglb.png'
      this.state.pointsBCLeft[i]['masked'] = false;
    }
    // Sort array of points
    this.state.pointsBCLeft.sort(this.comparePoints);

    // Reference values for vertical gridlines (frequencies)
    const yGridLines = [ '5%', '14.28%', '28.13%', '41.98%', '55.83%',
      '69.68%', '83.53%', '97.38%' ];
    // Reference values for horizontal gridlines (hearing level)
    const xGridLines = [ 17, 31.5, 46, 60.5, 75, 89.5, 104, 118.5, 133, 147.5,
      162, 176.5, 191, 205.5, 220, 234.5, 249, 263.5, 278, 292.5, 307, 321.5,
      336, 350.5, 365, 379.5, 394, 408.5, 423, 437.5, 452, 466.5, 481 ];

    // Major values for hearing levels, used for grid lines
    const dBsMain = [ -10, 0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110,
      120 ];
    /* Values for hearing levels used for labels, fixes issue where negative
     * value would affect style */
    const dBsLabels = [ ' -10', ' 0', ' 10', ' 20', ' 30', ' 40', ' 50', ' 60',
      ' 70', ' 80', ' 90', '100', '110', '120']
    // Minor values for hearing levels, used for grid lines
    const dBsMinor = [ -5, 5, 15, 25, 35, 45, 55, 65, 75, 85, 95, 105, 115 ];

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
