import React from 'react';
import { View } from 'react-native';
import { Svg } from 'react-native-svg';
import Grid from './audiogram_parts/Grid';
import Points from './audiogram_parts/Points';

class AudiogramPreview extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    pointsACRight: this.props.graph[0].points[0],
    pointsACLeft: this.props.graph[0].points[1],
    pointsBCRight: this.props.graph[0].points[2],
    pointsBCLeft: this.props.graph[0].points[3]
  }

  render() {
    // Reference values for vertical gridlines (frequencies)
    const yGridLines = [ '5%', '14.28%', '28.13%', '41.98%', '55.83%',
      '69.68%', '83.53%', '97.38%' ];

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

    return (
      <View>
        <Svg
          height="209.6"
          width="170"
        >
          <Grid
            xGridLines={ xGridLines }
            yGridLines={ yGridLines }
            dBsMain={ dBsMain }
            dBsMinor={ dBsMinor }
            frequencies={ frequenciesGrid }
            parent={ this }
            isPreview={ true }
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
      </View>
    );
  }
}

export default AudiogramPreview;
