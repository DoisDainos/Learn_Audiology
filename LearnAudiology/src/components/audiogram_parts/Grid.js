import React from 'react';
import { G, Line, Rect } from 'react-native-svg';

/*
 * Grid lines for audiogram that aign to both frequencies and hearing levels.
 */
class Grid extends React.Component {
  constructor(props) {
    super(props);
    this.handleGridPress = this.handleGridPress.bind(this);
  }

  handleGridPress(index) {
    if (
      this.props.parent.getPointsAtFreq(
        this.props.frequencies[index + 1]
      ).length > 0) {
      this.props.parent.displayPointsModal(
        this.props.parent.getPointsAtFreq(this.props.frequencies[index + 1])
      );
    }
  }

  render() {
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
          this.props.dBsMain != null &&
          this.props.dBsMain.map(() => (
            <Line
              key={ xIndex1 }
              x1={ '5%' }
              x2={ '97.38%' }
              y1={ this.props.xGridLines[xIndex1 += 2] }
              y2={ this.props.xGridLines[xIndex1] }
              stroke={ 'rgba(0,0,0,0.2)' }
            />
          ))
        }
        {
          // Horizontal grid lines for minor dBs
          this.props.dBsMinor != null &&
          this.props.dBsMinor.map(() => (
            <Line
              key={ xIndex2 }
              x1={ '5%' }
              x2={ '97.38%' }
              y1={ this.props.xGridLines[xIndex2 += 2] }
              y2={ this.props.xGridLines[xIndex2] }
              stroke={ 'rgba(0,0,0,0.07)' }
            />
          ))
        }
        {
          // Vertical grid lines for frequencies, can press them
          this.props.frequencies != null &&
          this.props.frequencies.map((freq, index) => ([
            <Line
              key={ yIndex }
              x1={ this.props.yGridLines[yIndex] }
              x2={ this.props.yGridLines[yIndex] }
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
              onPress={ () => this.handleGridPress(index) }
            />
          ]))
        }
      </G>
    );
  }
}

export default Grid;
