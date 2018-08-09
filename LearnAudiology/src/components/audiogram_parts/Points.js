import React from 'react';
import { G, Line, Image } from 'react-native-svg';

/*
 * The data points for the audiogram, and the lines that connect them.
 */
const Points = (props) => {
  // Define coordinates for points on graph
  const yPoints = [ '-1.2%', '10.7%', '24.5%', '38.4%', '52.2%', '66.1%',
    '79.9%', '93.8%' ]
  const xPoints = [ 2.4, 16.8, 31.2, 45.6, 60, 74.4, 88.8, 103.2, 117.8, 132.4,
    146.8, 161.2, 175.7, 190.4, 204.8, 219.3, 233.8, 248.6, 262.8, 277.4,
    291.8, 306.4, 321, 335.5, 350.1, 364.5, 378.5, 391.6, 406, 420.4, 434.8,
    449.2, 463.6 ];

  // Map frequency values to graph index
  const freqMap = {
    0: 0,
    125: 1,
    250: 2,
    500: 3,
    1000: 4,
    2000: 5,
    4000: 6,
    8000: 7
  }

  // Map hearing level values to graph index
  const dBsMap = {'-10': 0, '-5': 1, 0: 2, 5: 3, 10: 4, 15: 5, 20: 6, 25: 7,
    30: 8, 35: 9, 40: 10, 45: 11, 50: 12, 55: 13, 60: 14, 65: 15, 70: 16, 75:
    17, 80: 18, 85: 19, 90: 20, 95: 21, 100: 22, 105: 23, 110: 24, 115: 25,
    120: 26
  }

  var pointIndex = 0;
  var pointLineIndex = 0;

  return (
    <G>
      {
        // Point icon for data
        props.data.map((point) => (
          <Image
            key={ pointIndex++ }
            x={ yPoints[freqMap[point.Hz]] }
            y={ xPoints[dBsMap[point.dB]] }
            width="7%"
            height="7%"
            href={{ uri: point.image }}
          />
        ))
      }
      {pointLineIndex = 0}
      {
        // Connecting lines for points, excludes first point
        props.data.slice(1).map((point) => (
          <Line
            key={ pointIndex++ }
            x1={ props.yGridLines[freqMap[props.data[pointLineIndex].Hz]] }
            x2={ props.yGridLines[freqMap[point.Hz]] }
            y1={ props.xGridLines[dBsMap[props.data[pointLineIndex++].dB]] }
            y2={ props.xGridLines[dBsMap[point.dB]] }
            stroke={ point.colour }
            strokeWidth={ 2 }
          />
        ))
      }
    </G>
  );
};

export default Points;
