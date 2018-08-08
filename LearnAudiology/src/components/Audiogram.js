import React from 'react';
import { View, ScrollView, Text, TouchableHighlight } from 'react-native';
import  { XAxis, YAxis } from 'react-native-svg-charts';
import { Svg } from 'react-native-svg';
import { Button, Icon, Badge } from 'react-native-elements';
import Grid from './audiogram_parts/Grid';
import Points from './audiogram_parts/Points';
import Symbols from './audiogram_parts/Symbols';

/*
 * Props:
 * - pointsACRight
 * - pointsACLeft
 * - TODO pointsBCRight [icon: 'https://i.imgur.com/kv5twnR.png']
 * - TODO pointsBCLeft [icon: 'https://i.imgur.com/2q2Nglb.png']
 * - TODO pointsACRightMask [icon: 'https://i.imgur.com/PFXczIl.png']
 * - TODO pointsACLeftMask [icon: 'https://i.imgur.com/6KrOAuH.png']
 * - TODO pointsBCRightMask [icon: 'https://i.imgur.com/u4Zfi3I.png?1']
 * - TODO pointsBCLeftMask [icon: 'https://i.imgur.com/PO8NtHf.png?1']
 * - TODO pointsNRRight [icon: 'https://i.imgur.com/Wmg6zem.png']
 * - TODO pointsNRLeft [icon: 'https://i.imgur.com/N4NDGBm.png']
 */
class Audiogram extends React.Component {
  state = {
    symbolsVisible: false
  };

  constructor(props) {
    super(props);
  }

  /*
   * Set symbols modal visibility (true/false).
   */
  setSymbolsVisible(visible) {
    this.setState({ symbolsVisible: visible });
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
    if (this.props.pointsACRight != null) {
      if (conduction === 'air' && ear === 'left' && masked === false) {
        for (var i=0; i<this.props.pointsACRight.length; i++) {
          if (this.props.pointsACRight[i].Hz === frequency) {
            var index = this.props.pointsACRight.indexOf(
              this.props.pointsACRight[i]
            );
            if (index > -1) {
              this.props.pointsACRight.splice(index, 1);
              return;
            }
          }
        }
      }
    }
    if (this.props.pointsACLeft != null) {
      if (conduction === 'air' && ear === 'left' && masked === false) {
        for (var i=0; i<this.props.pointsACLeft.length; i++) {
          if (this.props.pointsACLeft[i].Hz === frequency) {
            var index = this.props.pointsACLeft.indexOf(
              this.props.pointsACLeft[i]
            );
            if (index > -1) {
              this.props.pointsACLeft.splice(index, 1);
              return;
            }
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
    if (this.props.pointsACRight != null) {
      if (conduction === 'air' && ear === 'right' && masked === false) {
        for (var i=0; i<this.props.pointsACRight.length; i++) {
          if (this.props.pointsACRight[i].Hz === frequency) {
            this.props.pointsACRight[i].dB = newLevel;
          }
        }
      }
    }
    if (this.props.pointsACLeft != null) {
      if (conduction === 'air' && ear === 'left' && masked === false) {
        for (var i=0; i<this.props.pointsACLeft.length; i++) {
          if (this.props.pointsACLeft[i].Hz === frequency) {
            this.props.pointsACLeft[i].dB = newLevel;
          }
        }
      }
    }
  }

  render() {
    if (this.props.pointsACRight != null) {
      // Add necessary information to each air conduction, right ear point
      for (var i=0; i<this.props.pointsACRight.length; i++) {
        this.props.pointsACRight[i]['colour'] = 'rgb(255, 6, 0)';
        this.props.pointsACRight[i]['conduction'] = 'air';
        this.props.pointsACRight[i]['ear'] = 'right';
        this.props.pointsACRight[i]['image'] =
          'https://i.imgur.com/BtWXB20.png'
        this.props.pointsACRight[i]['masked'] = false;
      }
      // Sort array of points
      this.props.pointsACRight.sort(this.comparePoints);
    }

    if (this.props.pointsACLeft != null) {
      // Add necessary information to each air conduction, left ear point
      for (var i=0; i<this.props.pointsACLeft.length; i++) {
        this.props.pointsACLeft[i]['colour'] = 'rgb(0, 26, 255)';
        this.props.pointsACLeft[i]['conduction'] = 'air';
        this.props.pointsACLeft[i]['ear'] = 'left;'
        this.props.pointsACLeft[i]['image'] =
          'https://i.imgur.com/VqJdazw.png';
        this.props.pointsACLeft[i]['masked'] = false;
      }
      // Sort array of points
      this.props.pointsACLeft.sort(this.comparePoints);
    }

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
      <View>
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
        <Symbols visible={ this.state.symbolsVisible } parent={ this } />
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
              />
              {this.props.pointsACRight != null &&
                this.props.pointsACRight.length > 0 &&
                <Points
                  data={ this.props.pointsACRight }
                  xGridLines={ xGridLines }
                  yGridLines={ yGridLines }
                />
              }
              {this.props.pointsACLeft != null &&
                this.props.pointsACLeft.length > 0 &&
                <Points
                  data={ this.props.pointsACLeft }
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
        <View>
          <Button
            raised
            icon={{name: 'timeline'}}
            title="ADD POINTS"
            backgroundColor="rgb(94, 188, 241)"
          />
        </View>
      </View>
    )
  }
}

export default Audiogram;
