import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { ButtonGroup, Button, Icon } from 'react-native-elements';
import styles from '../styles/TextStyles';

class AddPoints extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.title,
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: 'rgb(94, 188, 241)'
      }
    };
  }

  state = {
    selectedIndexEar: 2,
    selectedIndexCon: 2,
    frequency: 125,
    hearingLevel: 0,
    loading: false,
    submitText: 'SUBMIT',
    submitTextColor: '#fff',
    earErr: '',
    conErr: '',
    timeout1: '',
    timeout2: ''
  };

  constructor(props) {
    super()
    this.addPoint = this.addPoint.bind(this);
    this.updateIndexEar = this.updateIndexEar.bind(this);
    this.updateIndexCon = this.updateIndexCon.bind(this);
    this.increaseFreq = this.increaseFreq.bind(this);
    this.decreaseFreq = this.decreaseFreq.bind(this);
    this.increaseHear = this.increaseHear.bind(this);
    this.decreaseHear = this.decreaseHear.bind(this);
  }

  componentWillMount() {
    let navParams = this.props.navigation.state.params;
    if (navParams.editing) {
      if (navParams.point.ear === 'right') {
        this.setState({
          selectedIndexEar: 0
        })
      } else {
        this.setState({
          selectedIndexEar: 1
        })
      }
    }
    if (navParams.point.conduction === 'air') {
      this.setState({
        selectedIndexCon: 0
      })
    } else {
      this.setState({
        selectedIndexEar: 1
      })
    }
    this.setState({
      frequency: navParams.point.Hz,
      hearingLevel: navParams.point.dB
    })
  }

  /*
   * Clear any pending pending timeouts when component is closed.
   */
  componentWillUnmount() {
    clearTimeout(this.state.timeout1);
    clearTimeout(this.state.timeout2);
  }

  /*
   * Add point to suitable array.
   */
  addPoint() {
    if (!this.state.loading) {
      let navParams = this.props.navigation.state.params;
      if (navParams.editing) {
        navParams.parent.removePoint(
          navParams.point.Hz,
          navParams.point.conduction,
          navParams.point.ear,
          navParams.point.masked
        );
      }
      let missing = false;
      if (this.state.selectedIndexEar === 2) {
        this.setState({ earErr: 'Please select a test ear' });
        missing = true;
      }
      if (this.state.selectedIndexCon === 2) {
        this.setState({ conErr: 'Please select a conduction type' })
        missing = true;
      }
      if (missing) {
        return;
      }
      // Button response part 1: spinning wheel
      this.setState({ loading: true, submitText: '' });
      let point = {
        Hz: this.state.frequency,
        dB: this.state.hearingLevel
      };
      if (this.state.selectedIndexEar === 0) { // Right ear
        if (this.state.selectedIndexCon === 0) { // Right ear -> air conduction
          navParams.addPointACRight(point);
        } else { // Right ear -> bone conduction
          navParams.addPointBCRight(point);
        }
      } else { // Left ear
        if (this.state.selectedIndexCon === 0) { // Left ear -> air conduction
          navParams.addPointACLeft(point);
        } else { // Left ear -> bone conduction
          navParams.addPointBCLeft(point);
        }
      }
      let that = this;
      // Button response part 2: POINT ADDED text
      let timer1 =
        setTimeout( function() {
          that.setState({
            loading: false,
            submitText: 'POINT ADDED',
            submitTextColor: 'rgb(99, 255, 138)'
          })
          if (navParams.editing) {
            that.props.navigation.pop(1);
          }
        }, 500 );
      // Button response part 3: reset
      let timer2 =
        setTimeout( function() {
          that.setState({ submitText: 'SUBMIT', submitTextColor: '#fff' })
        }, 1500 );
      that.setState({ timeout1: timer1, timeout2: timer2 });
    }
  }

  /*
   * Change index of button for ear choice button group.
   */
  updateIndexEar(selectedIndexEar) {
    this.setState({
      selectedIndexEar,
      earErr: ''
    });
  }

  /*
   * Change index of button for conduction type button group.
   */
  updateIndexCon(selectedIndexCon) {
    this.setState({
      selectedIndexCon,
      conErr: ''
    });
  }

  /*
   * Increase frequency input.
   */
  increaseFreq() {
    let newFreq = 0;
    if (this.state.frequency < 8000) {
        newFreq = this.state.frequency * 2;
    } else {
        newFreq = 8000;
    }
    this.setState({ frequency: newFreq });
  }

  /*
   * Decrease frequency input.
   */
  decreaseFreq() {
    let newFreq = 0;
    if (this.state.frequency > 125) {
        newFreq = this.state.frequency - this.state.frequency / 2;
    } else {
        newFreq = 125;
    }
    this.setState({ frequency: newFreq });
  }

  /*
   * Increase hearing level input.
   */
  increaseHear() {
    let newHear = this.state.hearingLevel + 5;
    if (newHear <= 120) {
      this.setState({ hearingLevel: newHear });
    }
  }

  /*
   * Decrease hearing level input.
   */
  decreaseHear() {
    let newHear = this.state.hearingLevel - 5;
    if (newHear >= -10) {
      this.setState({ hearingLevel: newHear });
    }
  }

  render() {
    // Selector for ear choice
    const buttonsEar = [ 'Right', 'Left' ];
    const { selectedIndexEar } = this.state;

    // Selector for conduction choice
    const buttonsConduction = [ 'Air', 'Bone' ];
    const { selectedIndexCon } = this.state;

    return (
      <ScrollView>
        <View style={{ flexDirection: 'row' }}>
          <Text style={ styles.heading }>Test ear </Text>
          <Text style={ styles.error }>{ this.state.earErr }</Text>
        </View>
        <ButtonGroup
          onPress={ this.updateIndexEar }
          selectedIndex={ selectedIndexEar }
          buttons={ buttonsEar }
          containerStyle={{ height: '12.5%' }}
          selectedTextStyle={{ fontWeight: 'bold' }}
          textStyle={{ fontSize: 23 }}
        />
        <View style={{ flexDirection: 'row' }}>
          <Text style={ styles.heading }>Conduction </Text>
          <Text style={ styles.error }>{ this.state.conErr }</Text>
        </View>
        <ButtonGroup
          onPress={ this.updateIndexCon }
          selectedIndex={ selectedIndexCon }
          buttons={ buttonsConduction }
          containerStyle={{ height: '12.5%' }}
          selectedTextStyle={{ fontWeight: 'bold' }}
          textStyle={{ fontSize: 23 }}
        />
        <Text style={ styles.heading }>Frequency</Text>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <View style={{ flexDirection: 'row' }}>
            {this.state.frequency > 125 &&
              <Icon
                size={ 35 }
                name="remove"
                color="rgb(140, 140, 140)"
                reverse
                reverseColor="#fff"
                onPress={ this.decreaseFreq }
                component={ TouchableOpacity }
              />
            }
            {this.state.frequency === 125 &&
              <Icon
                size={ 35 }
                name="remove"
                color="rgb(230, 230, 230)"
                reverse
                reverseColor="#fff"
              />
            }
            <View style={{ width: 125, justifyContent: 'center' }}>
              <Text
                style={{
                  fontSize: 28,
                  alignSelf: 'center',
                  color: 'rgb(60, 60, 60)'
                }}
              >
                { this.state.frequency }Hz
              </Text>
            </View>
              {this.state.frequency < 8000 &&
                <Icon
                  size={ 35 }
                  name="add"
                  color="rgb(140, 140, 140)"
                  reverse
                  reverseColor="#fff"
                  onPress={ this.increaseFreq }
                  component={ TouchableOpacity }
                />
              }
              {this.state.frequency === 8000 &&
                <Icon
                  size={ 35 }
                  name="add"
                  color="rgb(230, 230, 230)"
                  reverse
                  reverseColor="#fff"
                />
              }
          </View>
        </View>
        <Text style={ styles.heading }>Hearing level</Text>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <View style={{ flexDirection: 'row' }}>
            {this.state.hearingLevel > -10 &&
              <Icon
                size={ 35 }
                name="remove"
                color="rgb(140, 140, 140)"
                reverse
                reverseColor="#fff"
                onPress={ this.decreaseHear }
                component={ TouchableOpacity }
              />
            }
            {this.state.hearingLevel === -10 &&
              <Icon
                size={ 35 }
                name="remove"
                color="rgb(230, 230, 230)"
                reverse
                reverseColor="#fff"
              />
            }
            <View style={{ width: 125, justifyContent: 'center' }}>
              <Text
                style={{
                  fontSize: 28,
                  alignSelf: 'center',
                  color: 'rgb(60, 60, 60)'
                }}
              >
                { this.state.hearingLevel }dB
              </Text>
            </View>
            {this.state.hearingLevel < 120 &&
              <Icon
                size={ 35 }
                name="add"
                color="rgb(140, 140, 140)"
                reverse
                reverseColor="#fff"
                onPress={ this.increaseHear }
                component={ TouchableOpacity }
              />
            }
            {this.state.hearingLevel === 120 &&
              <Icon
                size={ 35 }
                name="add"
                color="rgb(230, 230, 230)"
                reverse
                reverseColor="#fff"
              />
            }
          </View>
        </View>
        <View style={{ height: 130, marginTop: 15 }}>
          <Button
            buttonStyle={{ height: 50 }}
            textStyle={{ color: this.state.submitTextColor }}
            loading={ this.state.loading }
            raised
            title={ this.state.submitText }
            backgroundColor="rgb(94, 188, 241)"
            onPress={ this.addPoint }
          />
        </View>
      </ScrollView>
    );
  }
}

export default AddPoints;
