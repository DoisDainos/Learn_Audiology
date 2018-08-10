import React from 'react';
import { G, Line, Rect } from 'react-native-svg';

/*
 * Grid lines for audiogram that aign to both frequencies and hearing levels.
 */
const Grid = (props) => {
  var xIndex1 = -2;
  var xIndex2 = -1;
  var yIndex = 0;
  // Positions for pressable overlay on grid lines
  const yPressableLines = [ '11%', '25%', '39%', '52%', '66%', '80%',
    '94%', '100%' ];

  return (
    <G>
      {
        // Horizontal grid lines for major dBs
        props.dBsMain.map(() => (
          <Line
            key={ xIndex1 }
            x1={ '5%' }
            x2={ '97.38%' }
            y1={ props.xGridLines[xIndex1 += 2] }
            y2={ props.xGridLines[xIndex1] }
            stroke={ 'rgba(0,0,0,0.2)' }
          />
        ))
      }
      {
        // Horizontal grid lines for minor dBs
        props.dBsMinor.map(() => (
          <Line
            key={ xIndex2 }
            x1={ '5%' }
            x2={ '97.38%' }
            y1={ props.xGridLines[xIndex2 += 2] }
            y2={ props.xGridLines[xIndex2] }
            stroke={ 'rgba(0,0,0,0.07)' }
          />
        ))
      }
      {
        // Vertical grid lines for frequencies, can press them
        props.frequencies.map((freq, index) => ([
          <Line
            key={ yIndex }
            x1={ props.yGridLines[yIndex] }
            x2={ props.yGridLines[yIndex] }
            y1={ '4.25%' }
            y2={ '98.5%' }
            stroke={ 'rgba(0,0,0,0.2)' }
          />,
          <Rect
            key={ yIndex * 10 + 1 }
            x={ yPressableLines[yIndex++] }
            y={ '0' }
            height="400"
            width="20"
            stroke="none"
            fill="none"
            onPress={() => {
              props.parent.displayPointsModal(props.parent.getPointsAtFreq(props.frequencies[index + 1]));
            }}
          />
        ]))
      }
    </G>
  );
};

export default Grid;
